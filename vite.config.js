import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mirroredSlugs } from './src/data/mirroredModels.js'

const INVITATION_DIR = 'invitacion'

/**
 * Las subpáginas replicadas son documentos HTML autónomos living en
 * public/invitacion/<slug>/index.html. Sin esto, /invitacion/<slug> caería en
 * el fallback SPA de React y se mostraría la plantilla genérica.
 *
 * - dev / preview: redirigimos la petición al index.html del directorio.
 * - build: emitimos además invitacion/<slug>.html para los hosting que
 *   resuelven por extensión (así /invitacion/perla funciona sin barra final).
 */
function mirroredInvitations() {
  const resolve = (url) => {
    const [pathname, query] = url.split('?')
    const match = /^\/invitacion\/([a-z0-9-]+)\/?$/.exec(pathname)
    if (!match || !mirroredSlugs.includes(match[1])) return null
    return `/invitacion/${match[1]}/index.html${query ? `?${query}` : ''}`
  }

  const middleware = (req, _res, next) => {
    const target = resolve(req.url || '')
    if (target) req.url = target
    next()
  }

  return {
    name: 'mirrored-invitations',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
    generateBundle() {
      for (const slug of mirroredSlugs) {
        const file = path.join('public', INVITATION_DIR, slug, 'index.html')
        if (!fs.existsSync(file)) continue
        this.emitFile({
          type: 'asset',
          fileName: `${INVITATION_DIR}/${slug}.html`,
          source: fs.readFileSync(file),
        })
      }
    },
  }
}

/**
 * Los documentos replicados y sus CSS son archivos estáticos que Vite copia
 * tal cual, así que NO les aplica el `base` automáticamente. Sus rutas
 * absolutas (/invitacion/..., /images/...) quedarían colgando si el sitio se
 * publica bajo un subpath, de modo que las reescribimos sobre dist al
 * construir.
 *
 * En Cloudflare Pages el sitio suele vivir en la raíz (BASE_PATH vacío), en
 * cuyo caso no hay nada que reescribir y esto es un no-op.
 */
function basePathForMirrors() {
  let base = '/'
  return {
    name: 'base-path-mirrors',
    apply: 'build',
    configResolved(config) {
      base = config.base.endsWith('/') ? config.base : `${config.base}/`
    },
    closeBundle() {
      const outDir = path.resolve('dist')
      if (!fs.existsSync(outDir)) return

      let touched = 0
      const walk = (dir) => {
        for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, item.name)
          if (item.isDirectory()) {
            walk(full)
          } else if (/\.html$/.test(item.name)) {
            const before = fs.readFileSync(full, 'utf8')
            // Rutas absolutas en atributos y en url() dentro de <style> inline.
            // El negative lookahead evita romper https:// y data:.
            const after = before
              .replace(/(href|src|poster)="\/(?!\/)/g, `$1="${base}`)
              .replace(/url\((["']?)\/(?!\/)/g, `url($1${base}`)
            if (after !== before) {
              fs.writeFileSync(full, after, 'utf8')
              touched++
            }
          } else if (/\.css$/.test(item.name)) {
            const before = fs.readFileSync(full, 'utf8')
            fs.writeFileSync(full, before.replace(/url\((["']?)\/(?!\/)/g, `url($1${base}`), 'utf8')
          }
        }
      }
      walk(outDir)
      if (base === '/') {
        console.log('  base raíz: sin reescritura de rutas necesaria')
      } else {
        console.log(`  base ${base} aplicado a ${touched} documentos`)
      }
    },
  }
}

/**
 * Cloudflare Pages sirve 404.html cuando no encuentra un fichero, así que este
 * es el salvavidas para rutas de la SPA (/mis-15, /eventos,
 * /invitacion/rosa-pastel). Basta una copia del index: React Router ya lee la
 * ruta real de location y monta lo que corresponda.
 *
 * Ojo: NO se redirige a "/" porque eso perdería el query (?nombre=...) y
 * dejaría al router en la página inicial.
 */
function spaFallbackForPages() {
  return {
    name: 'pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve('dist')
      const index = path.join(outDir, 'index.html')
      if (!fs.existsSync(index)) return
      fs.copyFileSync(index, path.join(outDir, '404.html'))
      console.log('  404.html generado (fallback SPA)')
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.BASE_PATH || '/' : '/',
  plugins: [react(), mirroredInvitations(), basePathForMirrors(), spaFallbackForPages()],
}))

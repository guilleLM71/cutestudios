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
 * tal cual, así que NO les aplica el `base` automáticamente. En un sitio de
 * proyecto de GitHub Pages (usuario.github.io/REPO) todas sus rutas absolutas
 * (/invitacion/..., /images/...) quedarían colgando y se romperían, de modo que
 * las reescribimos sobre dist una vez construido.
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
      if (base === '/') return
      const outDir = path.resolve('dist')
      if (!fs.existsSync(outDir)) return

      // HTML replicado: href="/..." y src="/..."
      const html = (t) => t.replace(/(href|src)="\/(?!\/)/g, `$1="${base}`)
      // CSS: url(/...) sin comillas y url("/...")
      const css = (t) => t.replace(/url\((["']?)\/(?!\/)/g, `url($1${base}`)

      let touched = 0
      const walk = (dir) => {
        for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, item.name)
          if (item.isDirectory()) {
            walk(full)
          } else if (/\.html$/.test(item.name)) {
            fs.writeFileSync(full, html(fs.readFileSync(full, 'utf8')), 'utf8')
            touched++
          } else if (/\.css$/.test(item.name)) {
            fs.writeFileSync(full, css(fs.readFileSync(full, 'utf8')), 'utf8')
          }
        }
      }
      walk(outDir)
      console.log(`  base ${base} aplicado a ${touched} documentos`)
    },
  }
}

/**
 * GitHub Pages no hace fallback de SPA: una ruta como /mis-15 o
 * /invitacion/rosa-pastel daría 404. Publicamos 404.html, que es el index con
 * un pequeño script que redirige a la ruta real conservando el query.
 */
function spaFallbackForPages() {
  return {
    name: 'pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve('dist')
      const index = path.join(outDir, 'index.html')
      if (!fs.existsSync(index)) return
      const html = fs.readFileSync(index, 'utf8')
      const redirect = `<script>
        // GitHub Pages sirve este documento para rutas sin fichero propio.
        var p = location.pathname.replace(/\\/index\\.html$/, '');
        var base = document.querySelector('script[src]')?.src.split('/').slice(0, -1).join('/') || '/';
        sessionStorage.setItem('pages:redirect', p + location.search);
        location.replace(base + '/');
      </script>`
      fs.writeFileSync(path.join(outDir, '404.html'), html.replace('</body>', `${redirect}</body>`), 'utf8')
      console.log('  404.html generado para el fallback de Pages')
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.BASE_PATH || '/' : '/',
  plugins: [react(), mirroredInvitations(), basePathForMirrors(), spaFallbackForPages()],
}))

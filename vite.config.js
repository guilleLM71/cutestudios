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

export default defineConfig({
  plugins: [react(), mirroredInvitations()],
})

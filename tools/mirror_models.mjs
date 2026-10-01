/**
 * Replica fiel de las subpáginas de invitación de bodas de vogastudios.com.
 *
 * Para cada modelo:
 *   1. Descarga el HTML real (plantilla Elementor canvas).
 *   2. Descarga sus CSS/JS/fuentes/imágenes, reescribe las URLs internas de los
 *      CSS y lo apunta todo a rutas locales.
 *   3. Escribe un documento autocontenido en public/invitacion/<slug>/index.html
 *      con todas las animaciones, Transitions, Motion FX, Swiper y Countdown
 *      originales intactos.
 *
 * Uso: node tools/mirror_models.mjs [slug ...]
 */
import fs from 'node:fs'
import path from 'node:path'

const ORIGIN = 'https://vogastudios.com'
const ROOT = process.cwd()
const OUT_BASE = 'invitacion'

/** slug local => ruta en el sitio original */
const MODELS = {
  perla: '/perla/',
  marmol: '/marmol/',
  terra: '/terra/',
  sobre: '/sobre-real/',
  carmesi: '/carmesi/',
  gerbera: '/gerbera/',
  carta: '/carta/',
  pasaporte: '/pasaporte/',
}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

/* ---------------------------------------------------------------- utilidades */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const isImageUrl = (u) => /\.(png|jpe?g|gif|webp|svg|avif|ico)$/i.test(u)

/**
 * Referencias relativas a la raiz que WordPress emite en los CSS de Elementor
 * (fondos de seccion, texturas): `/wp-content/uploads/...`. El inventario
 * principal solo recoge URLs absolutas, asi que se escanean aparte.
 */
const ROOT_RELATIVE = /["'( ](\/(?:wp-content|wp-includes)\/[^"')]+)/g
const isTextUrl = (u) => /\.(css|woff2?|ttf|otf|eot)$/i.test(u)

/**
 * Nombre local determinista. Para imágenes se mantiene el criterio histórico
 * (último segmento del path) para reutilizar lo ya descargado en
 * public/images/models/<slug>/; para el resto de assets se usa la ruta
 * completa, porque Elementor y Elementor-Pro sirven homónimos con el mismo
 * nombre (p. ej. frontend.min.js) y colisionarían.
 */
function localName(clean) {
  if (isImageUrl(clean)) {
    return clean.split('/').pop().toLowerCase().replace(/[^a-z0-9._-]/g, '-')
  }
  const rel = clean.replace(ORIGIN + '/', '').replace(/^wp-content\//, '').replace(/^wp-includes\//, 'wpinc/')
  return rel.replace(/[^a-zA-Z0-9._-]+/g, '_')
}

const toLocalPath = (p) => path.join(ROOT, 'public', p.replace(/^\//, '').replace(/\//g, path.sep))

/** Estados que el origen devuelve de forma transitoria al estrangular ráfagas. */
const TRANSIENT = new Set([404, 408, 425, 429, 500, 502, 503, 504, 520, 521, 522, 524])

const jitter = () => 300 + Math.random() * 700

/**
 * El origen (Cloudflare delante) responde 404/500 de forma intermitente cuando
 * se encadenan decenas de peticiones seguidas. Reintentamos con backoff
 * exponencial y reordenamos el orden de los assets para no repetir el patrón.
 */
async function fetchBuf(url, attempts = 6) {
  let lastErr = 'error'
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: {
          'User-Agent': UA,
          Referer: ORIGIN + '/',
          Accept: '*/*',
          'Accept-Language': 'es-BO,es;q=0.9',
        },
      })
      if (res.ok) return Buffer.from(await res.arrayBuffer())
      lastErr = String(res.status)
      if (!TRANSIENT.has(res.status)) break
    } catch (e) {
      lastErr = e.message
    }
    // 1.5s, 3s, 6s, 12s, 24s... suficiente para que se libere el bucket.
    await sleep(1500 * 2 ** i + jitter())
  }
  throw new Error(lastErr)
}

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return 'skip'
  try {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    const buf = await fetchBuf(url)
    if (!buf.length) return 'empty'
    fs.writeFileSync(dest, buf)
    return 'ok'
  } catch (e) {
    // Un asset ausente no debe abortar el modelo: lo registramos y seguimos.
    return `fail:${e.message}`
  }
}

/* ---------------------------------------------------------------- limpieza */

const NOISE = [
  /<noscript><iframe src="https:\/\/www\.googletagmanager\.com[\s\S]*?<\/iframe><\/noscript>/gi,
  /<script>\(function\(w,d,s,l,i\)\{w\[l\]=w\[l\]\|\|\[\];w\[l\]\.push\(\{'gtm\.start'[\s\S]*?<\/script>/gi,
  /<script[^>]*src="https:\/\/static\.cloudflareinsights\.com[^"]*"[^>]*><\/script>/gi,
  /<link[^>]*rel=["']alternate["'][^>]*>/gi,
  /<link[^>]*rel=["']https:\/\/api\.w\.org\/["'][^>]*>/gi,
  /<link[^>]*rel=["']EditURI["'][^>]*>/gi,
  /<link[^>]*rel=["']shortlink["'][^>]*>/gi,
  /<link[^>]*rel=["']https:\/\/fonts\.gstatic\.com["'][^>]*>/gi,
  /<link[^>]*rel=["']dns-prefetch["'][^>]*>/gi,
  /<link[^>]*rel=["']preconnect["'][^>]*>/gi,
  /<link[^>]*gp-premium\/menu-plus[^>]*>/gi,
  /<script[^>]*src="[^"]*gp-premium\/menu-plus[^"]*"[^>]*><\/script>/gi,
  /<script[^>]*>var offSide = \{[\s\S]*?<\/script>/gi,
  /<script[^>]*>var generatepressMenu = \{[\s\S]*?<\/script>/gi,
  /<script[^>]*>\{"prefetch"[\s\S]*?<\/script>/gi,
  /<script[^>]*type=["']speculationrules["'][^>]*>[\s\S]*?<\/script>/gi,
]

/**
 * Enlaces que en el original apuntan al negocio del estudio. Se reconducen
 * al sitio local para que la réplica no devuelva al visitante al original.
 */
const SITE_REWRITES = [
  ['https://vogastudios.com/xv/', '/mis-15'],
  ['https://vogastudios.com/eventos/', '/eventos'],
  ['https://vogastudios.com/?nombre', '/?nombre'],
  ['https://vogastudios.com/', '/'],
  ['https://vogastudios.com', '/'],
  ['https://app.vogastudios.com', '#'],
  ['//app.vogastudios.com', '#'],
  // El CTA "¿te gustó este modelo?" debe llegar al WhatsApp del estudio local,
  // no al del original.
  ['https://wa.me/59177241359', 'https://wa.me/59178889375'],
  ['http://wa.me/59177241359', 'https://wa.me/59178889375'],
  ['wa.me/59177241359', 'https://wa.me/59178889375'],
]

/** Assets que Elementor inyecta EN EJECUCIÓN a partir de `urls.assets` de su
 * config, por lo que no aparecen en el HTML inicial y el inventario estático no
 * los ve. Sin estos, la réplica renderiza bien pero sigue pidiendo 10 ficheros
 * al sitio original en cada visita.
 *
 * La lista es la misma para todos los modelos: depende de la versión del
 * plugin (4.3.2 / 4.9.3), no del diseño.
 */
const RUNTIME_ASSETS = [
  'https://vogastudios.com/wp-content/plugins/elementor/assets/lib/dialog/dialog.min.js?ver=4.9.3',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/js/chunks/lightbox-lightbox.min.js?ver=4.3.2',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/css/conditionals/dialog.min.css?ver=4.3.2',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/lib/share-link/share-link.min.js?ver=4.3.2',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min.css?ver=8.4.5',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/css/conditionals/lightbox.min.css?ver=4.3.2',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/js/chunks/section-stretched-section.min.js?ver=4.3.2',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/js/chunks/background-slideshow.min.js?ver=4.3.2',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/js/chunks/background-video.min.js?ver=4.3.2',
  'https://vogastudios.com/wp-content/plugins/elementor/assets/js/chunks/text-editor.min.js?ver=4.3.2',
  // Placeholder de Lottie (solo se pide si un widget Lottie no trae src).
  'https://vogastudios.com/wp-content/plugins/elementor-pro/modules/lottie/assets/animations/default.json',
]

const stripNoise = (html) => NOISE.reduce((acc, re) => acc.replace(re, ''), html)

/**
 * El config inline de Elementor serializa sus URLs con barras escapadas
 * (`https:\/\/vogastudios.com\/...`), forma que NO cubre SITE_REWRITES. Aquí
 * reconducimos esas rutas: los assets a la copia local en `rt/`, y los
 * endpoints de administración (ajax, REST) a `#` porque la réplica no tiene
 * backend y no debe escribir en el WordPress original.
 *
 * Los patrones se construyen con String.raw porque en el fichero hay BARRAS
 * INVERTIDAS reales: en un regex eso se escribe `\\/` (literal `\` + `/`), y
 * `\\/` en un literal JS valido daría solo una barra.
 */
const ESC_ORIGIN = String.raw`https:\\/\\/vogastudios\.com\\/`

/** Sustituye la URL escapada de origen que empieza por `tail` por `repl`. */
const subEscaped = (text, tail, repl) => text.replace(new RegExp(ESC_ORIGIN + tail, "g"), repl)

const rewriteEscaped = (text, slug) => {
  const rt = `/invitacion/${slug}/rt/`
  let out = text
  out = subEscaped(out, String.raw`wp-content\\/plugins\\/elementor\\/assets\\/`, `${rt}wp-content/plugins/elementor/assets/`)
  out = subEscaped(out, String.raw`wp-content\\/plugins\\/elementor-pro\\/assets\\/`, `${rt}wp-content/plugins/elementor-pro/assets/`)
  out = subEscaped(out, String.raw`wp-admin\\/[^"'\\]*`, "#")
  out = subEscaped(out, String.raw`wp-json\\/?`, "#")
  out = subEscaped(out, String.raw`wp-content\\/uploads`, "/")
  // Lottie: el defaultAnimationUrl en config va al asset local.
  out = subEscaped(out, String.raw`wp-content\\/plugins\\/elementor-pro\\/modules\\/lottie\\/assets\\/animations\\/default\.json`, `${rt}wp-content/plugins/elementor-pro/modules/lottie/assets/animations/default.json`)
  return out
}

/** Assets que el origen no entregó, para reintentarlos al final del lote. */
const failedAssets = []

/* ------------------------------------------------------------------ mirror */

async function mirrorModel(slug, remotePath, { assets = true } = {}) {
  // La página es la petición más importante: le damos más margen de reintento.
  const raw = await fetchBuf(ORIGIN + remotePath, 8).then((b) => b.toString('utf8'))

  const bodyAttrs = raw.match(/<body([^>]*)>/i)[1]
  const body = stripNoise(raw.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1])
  const head = stripNoise(raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '')

  // Head: conservamos metadatos, favicons, hojas de estilo y TODOS los scripts
  // respetando el orden original. Ese orden es crítico: Elementor espera que
  // jQuery y sus módulos estén cargados antes de inicializarse.
  const headParts = []
  const tokens =
    head.match(
      /<meta[^>]*>|<link[^>]*>|<style[^>]*>[\s\S]*?<\/style>|<style[^>]*\/>|<script[^>]*>[\s\S]*?<\/script>/gi
    ) || []

  for (const tag of tokens) {
    if (/^<meta/i.test(tag)) {
      if (/\bname=["'](generator|google-site-verification)["']/i.test(tag)) continue
      if (/property=["']og:/i.test(tag) || /name=["']twitter:/i.test(tag)) continue
      headParts.push(tag)
    } else if (/^<link/i.test(tag)) {
      if (/rel=["'](?:stylesheet|icon|apple-touch-icon|msapplication-TileImage)["']/i.test(tag)) headParts.push(tag)
    } else {
      headParts.push(tag)
    }
  }

  // ---- Inventario de recursos: primero planificamos, luego descargamos ----
  const found = new Set()
  for (const chunk of [head, body]) {
    for (const m of chunk.match(/https:\/\/vogastudios\.com\/[^\s"'()<>\\&]+/g) || []) {
      const clean = m.replace(/&#038;/g, '&').split('?')[0].split('#')[0]
      if (/\/(wp-content|wp-includes)\//.test(clean)) found.add(clean)
    }
  }

  const makeEntry = (clean) => ({
    clean,
    local: isImageUrl(clean)
      ? `/images/models/${slug}/${localName(clean)}`
      : `/invitacion/${slug}/assets/${localName(clean)}`,
  })

  const entries = [...found].map(makeEntry)

  // Los assets en runtime conservan su estructura de carpetas bajo `rt/`, porque
  // Elementor los resuelve a partir de una URL base, no de un nombre suelto.
  const runtimeEntries = RUNTIME_ASSETS.map((url) => ({
    clean: url,
    local: `/invitacion/${slug}/rt/${url.replace(ORIGIN + '/', '').split('?')[0]}`,
    runtime: true,
  }))

  // Descarga (respeta lo ya existente). El ritmo es deliberadamente lento:
  // encadenar peticiones sin pausa es lo que provoca los 404/500 del origen.
  const downloadAll = async (list) => {
    for (const e of list) {
      const r = await download(e.clean, toLocalPath(e.local))
      if (r.startsWith('fail') || r === 'empty') {
        console.log(`\n    ! ${r} ${e.clean}`)
        failedAssets.push([e.clean, e.local])
      }
      await sleep(140 + Math.random() * 120)
    }
  }

  let all = entries.concat(runtimeEntries)
  if (assets) {
    await downloadAll(all)

    // Segunda pasada: los CSS de Elementor (los `uploads_elementor_css_post-*`)
    // declaran los fondos de sección con rutas relativas a la raiz
    // (`/wp-content/uploads/...`), que el inventario de URLs absolutas no ve.
    // Sin esto, los heroes y texturas salen rotos en la replica.
    const known = new Set(all.map((e) => e.clean))
    const extra = []
    for (const e of all) {
      if (!isTextUrl(e.clean)) continue
      const dest = toLocalPath(e.local)
      if (!fs.existsSync(dest)) continue
      for (const m of fs.readFileSync(dest, 'utf8').matchAll(ROOT_RELATIVE)) {
        const url = ORIGIN + m[1].split('?')[0].split('#')[0]
        if (known.has(url)) continue
        known.add(url)
        extra.push(makeEntry(url))
      }
    }
    if (extra.length) {
      console.log(`\n    + ${extra.length} assets referenciados desde el CSS`)
      all = all.concat(extra)
      await downloadAll(extra)
    }
  }

  // Reescritura global de URLs, del más largo al más corto para que las
  // coincidencias parciales no pisen a las definitivas.
  const map = all.slice().sort((a, b) => b.clean.length - a.clean.length)
  const applyMap = (text) => {
    let out = text
    for (const e of map) {
      out = out.split(e.clean).join(e.local)
      out = out.split(e.clean.replace(/\//g, '%2F')).join(e.local)
      // Mismo recurso en forma relativa a la raiz, tal como aparece dentro de
      // los CSS de Elementor.
      if (e.clean.startsWith(ORIGIN + '/')) {
        out = out.split(e.clean.slice(ORIGIN.length)).join(e.local)
      }
    }
    // Rewrites globales para no salir al sitio original
    for (const [src, dst] of SITE_REWRITES) {
      out = out.split(src).join(dst)
      out = out.split(src.replace(/https:/, 'http:')).join(dst)
      out = out.split(src.replace(/\/\//, '//').replace(/^https:/, '')).join(dst)
    }
    return out
  }

  // Los CSS descargados pueden apuntar a fuentes/imágenes: se reescriben en sitio.
  for (const e of all) {
    if (!isTextUrl(e.clean)) continue
    const dest = toLocalPath(e.local)
    if (!fs.existsSync(dest)) continue
    fs.writeFileSync(dest, applyMap(fs.readFileSync(dest, 'utf8')), 'utf8')
  }

  const finalHead = rewriteEscaped(
    applyMap(headParts.join('\n    ')).split(ORIGIN + '/wp-admin').join('#'),
    slug
  )
  const finalBody = rewriteEscaped(
    applyMap(body).split(ORIGIN + '/wp-admin').join('#'),
    slug
  )
  const title = (raw.match(/<title>([\s\S]*?)<\/title>/i) || [, slug])[1].trim()

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    ${finalHead}
  </head>
  <body${bodyAttrs}>
${finalBody}
  </body>
</html>
`

  const outDir = path.join(ROOT, 'public', OUT_BASE, slug)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8')

  return { assets: all.length, bytes: Buffer.byteLength(html) }
}

/* -------------------------------------------------------------------- main */

const requested = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const clean = process.argv.includes('--clean')
const list = requested.length ? requested : Object.keys(MODELS)

const run = async (slug) => {
  if (!MODELS[slug]) {
    console.log(`? modelo desconocido: ${slug}`)
    return true
  }
  if (clean) fs.rmSync(path.join(ROOT, 'public', OUT_BASE, slug), { recursive: true, force: true })
  process.stdout.write(`${slug.padEnd(10)} <- ${MODELS[slug].padEnd(14)}`)
  try {
    const r = await mirrorModel(slug, MODELS[slug])
    console.log(`ok  ${String(r.assets).padStart(3)} assets  ${(r.bytes / 1024).toFixed(0)} KB html`)
    return true
  } catch (e) {
    console.log(`ERROR ${e.message}`)
    return false
  }
}

// Pasada 1: todo el lote. El cooldown entre modelos deja respirar el bucket de
// Cloudflare, que es la causa real de los 404/500 intermitentes.
const failed = []
for (const slug of list) {
  if (!(await run(slug))) failed.push(slug)
  await sleep(3000)
}

// Pasada 2: reintento de los que fallaron, con los assets ya en caché, así que
// lo único que se vuelve a pedir es el HTML (una sola petición, muy espaciada).
if (failed.length) {
  console.log(`\nreintentando: ${failed.join(', ')}`)
  await sleep(15000)
  for (const slug of failed) {
    if (await run(slug)) {
      failed.splice(failed.indexOf(slug), 1)
    }
    await sleep(20000)
  }
}

// Pasada 3: assets que quedaron sin descargar. Una petición cada vez.
if (failedAssets.length) {
  console.log(`\nassets pendientes: ${failedAssets.length}`)
  for (const [url, local] of failedAssets) {
    const r = await download(url, toLocalPath(local))
    console.log(`  ${r} ${url}`)
    await sleep(1200)
  }
}

if (failed.length) {
  console.log(`\nSIN REPLICAR: ${failed.join(', ')}`)
} else {
  console.log('\nDONE')
}

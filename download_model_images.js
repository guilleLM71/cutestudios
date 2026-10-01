import fs from 'fs';
import path from 'path';
import https from 'https';
import os from 'os';

const TEMP = os.tmpdir();
const MODELS = {
  perla: 'voga-model-perla.html',
  marmol: 'voga-model-marmol.html',
  terra: 'voga-model-terra.html',
  sobre: 'voga-model-sobre.html',
  carmesi: 'voga-model-carmesi.html',
  gerbera: 'voga-model-gerbera.html',
  carta: 'voga-model-carta.html',
  pasaporte: 'voga-model-pasaporte.html',
};

// Archivos que no pertenecen al diseño del modelo (landing, marcas de terceros, etc.)
const EXCLUDE = [
  'favicon', 'logowhite', 'voga-logo', 'Qr.png', 'Qr-', 'testimonio', 'Mockup-',
  'icono-animado-cafe', 'facebook-icon', 'tiktok-icon', 'instagram-icon',
  'logo-multicenter', 'elementor/thumbs',
];

const RESIZED = /-\d+x\d+\.(png|jpg|jpeg|gif|webp)$/i;

function sanitize(url) {
  const clean = url.split('?')[0];
  const name = clean.split('/').pop().toLowerCase();
  return name.replace(/[^a-z0-9._-]/g, '-');
}

function collect(model) {
  const file = path.join(TEMP, MODELS[model]);
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, 'utf8');
  const urls = html.match(/https:\/\/vogastudios\.com\/wp-content\/uploads\/[^\s"')]+?\.(?:png|jpg|jpeg|gif|webp|svg|mp4|webm)/gi) || [];
  const unique = [...new Set(urls)];
  return unique.filter((u) => {
    const name = sanitize(u);
    if (RESIZED.test(name)) return false;
    return !EXCLUDE.some((ex) => name.includes(ex.toLowerCase()));
  });
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Referer': 'https://vogastudios.com/',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
};

function download(dest, url) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return resolve('skip');
    https.get(url, { headers }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return resolve('fail:' + res.statusCode); }
      const out = fs.createWriteStream(dest);
      res.pipe(out);
      out.on('finish', () => { out.close(); resolve('ok'); });
    }).on('error', (e) => resolve('err:' + e.message));
  });
}

const summary = {};
for (const model of Object.keys(MODELS)) {
  const dir = path.join(process.cwd(), 'public', 'images', 'models', model);
  fs.mkdirSync(dir, { recursive: true });
  const urls = collect(model);
  let ok = 0, fail = 0;
  for (const url of urls) {
    const r = await download(path.join(dir, sanitize(url)), url);
    if (r === 'ok' || r === 'skip') ok++; else { fail++; console.log(`  ${r} ${url}`); }
  }
  summary[model] = `${ok} ok / ${fail} fail (${urls.length} total)`;
  console.log(`${model}: ${summary[model]}`);
  await new Promise((r) => setTimeout(r, 800));
}
console.log('\nDONE');

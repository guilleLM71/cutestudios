import https from 'https';
import fs from 'fs';
import path from 'path';

const BASE = 'https://vogastudios.com/wp-content/uploads';

const images = {
  // --- Catálogo Bodas ---
  'mockup-perla-boda.png': `${BASE}/2026/05/Mockup-Perla-BODA.png`,
  'mockup-marmol-boda.png': `${BASE}/2026/05/Mockup-Marmol-BODA.png`,
  'mockup-terra-boda.png': `${BASE}/2026/05/Mockup-Terra-BODA.png`,
  'mockup-sobre-boda.png': `${BASE}/2026/05/Mockup-Sobre-BODA.png`,
  'mockup-carmesi-boda.png': `${BASE}/2026/05/Mockup-Carmesi-BODA.png`,
  'mockup-gerbera-boda.png': `${BASE}/2026/05/Mockup-Gerbera-BODA.png`,
  'mockup-carta-boda.png': `${BASE}/2026/05/Mockup-Carta-BODA.png`,
  'mockup-pasaporte-boda.png': `${BASE}/2026/05/Mockup-Pasaporte-BODA.png`,

  // --- Catálogo XV Años ---
  'mockup-rosa-pastel-xv.png': `${BASE}/2026/05/Mockup-Rosa-Pastel-XV.png`,
  'mockup-realeza-xv.png': `${BASE}/2026/05/Mockup-Realeza-XV.png`,
  'mockup-cinderella-xv.png': `${BASE}/2026/05/Mockup-Cinderella-XV.png`,
  'mockup-floral-terra-xv.png': `${BASE}/2026/05/Mockup-Floral-Terra-XV.png`,
  'mockup-paper-floral-xv.png': `${BASE}/2026/05/Mockup-Paper-Floral-XV.png`,
  'mockup-royal-flush-xv.png': `${BASE}/2026/05/Mockup-Royal-Flush-XV.png`,
  'mockup-floral-xv.png': `${BASE}/2026/05/Mockup-Floral-XV.png`,
  'mockup-fantasy-xv.png': `${BASE}/2026/05/Mockup-Fantasy-XV.png`,

  // --- Catálogo Otros Eventos ---
  'mockup-marine-graduacion.png': `${BASE}/2026/05/Mockup-Marine-GRADUACION.png`,
  'mockup-imperial-graduacion.png': `${BASE}/2026/05/Mockup-Imperial-GRADUACION.png`,
  'mockup-dorado-bautizo.png': `${BASE}/2026/05/Mockup-Dorado-BAUTIZO.png`,
  'mockup-nuda-rose-cumple.png': `${BASE}/2026/05/Mockup-Nuda-Rose-CUMPLE.png`,
  'mockup-festum-cumple.png': `${BASE}/2026/05/Mockup-Festum-CUMPLE.png`,
  'mockup-rubra-cumple.png': `${BASE}/2026/05/Mockup-Rubra-CUMPLE.png`,
  'mockup-prive-cumple.png': `${BASE}/2026/05/Mockup-Prive-CUMPLE.png`,
  'mockup-capicumple-infantil.png': `${BASE}/2026/05/Mockup-Capicumple-CUMPLEINFANTIL.png`,
  'mockup-kinder-infantil.png': `${BASE}/2026/05/Mockup-Kinder-CUMPLEINFANTIL.png`,
  'mockup-mikymini-infantil.png': `${BASE}/2026/05/Mockup-MikyMini-CUMPLEINFANTIL.png`,
  'mockup-misa-misa.png': `${BASE}/2026/05/Mockup-Misa-MISA.png`,

  // --- Iconos animados (Gestor / Pasos / Categorías) ---
  'icon-deslizar.gif': `${BASE}/2026/05/icono-animado-cafe-deslizar.gif`,
  'icon-ticket.gif': `${BASE}/2026/05/icono-animado-cafe-ticket.gif`,
  'icon-seguridad.gif': `${BASE}/2026/05/icono-animado-cafe-seguridad.gif`,
  'icon-lista.gif': `${BASE}/2026/05/icono-animado-cafe-lista.gif`,
  'icon-lupa.gif': `${BASE}/2026/05/icono-animado-cafe-lupa.gif`,
  'icon-whatsapp.gif': `${BASE}/2026/05/icono-animado-cafe-whatsapp.gif`,
  'icon-computadora.gif': `${BASE}/2026/05/icono-animado-cafe-computadora.gif`,
  'icon-compartir.gif': `${BASE}/2026/05/icono-animado-cafe-compartir.gif`,
  'icon-graduacion.gif': `${BASE}/2026/05/icono-animado-blanco-graduacion.gif`,
  'icon-paloma.gif': `${BASE}/2026/05/icono-animado-blanco-paloma.gif`,
  'icon-pastel.gif': `${BASE}/2026/05/icono-animado-blanco-pastel-de-cumple.gif`,
  'icon-confeti.gif': `${BASE}/2026/05/icono-animado-blanco-fiesta-confeti.gif`,
  'icon-misa.gif': `${BASE}/2026/05/icono-animado-blanco-papa-catolico.gif`,

  // --- Redes sociales ---
  'facebook-icon.png': `${BASE}/2025/10/facebook-icon.png`,
  'tiktok-icon.png': `${BASE}/2025/10/tiktok-icon.png`,
  'instagram-icon.png': `${BASE}/2025/10/instagram-icon.png`,

  // --- Invitación (demo template) ---
  'icon-iglesia.gif': `${BASE}/2025/12/icono-iglesia-modelo-perla-BODA.gif`,
  'icon-copas.gif': `${BASE}/2025/12/icon-copas-modelo-perla-BODA.gif`,
  'icon-sobre.gif': `${BASE}/2025/12/icono-sobre-blanco-MR.gif`,
  'musica-demo.mp3': `${BASE}/2025/12/Until-I-Found-You-Stephen-Sanchez-Espanol-Lyrics-margarita.mp3`,
};

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://vogastudios.com/',
};

const dir = './public/images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(name, url) {
  return new Promise((resolve) => {
    const dest = path.join(dir, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`Skipped (exists): ${name}`);
      resolve();
      return;
    }
    https.get(url, { headers }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${name}: ${res.statusCode}`);
        res.resume();
        resolve();
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${name}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error ${name}: ${err.message}`);
      resolve();
    });
  });
}

const entries = Object.entries(images);
let done = 0;
for (const [name, url] of entries) {
  await download(name, url);
  done++;
}
console.log(`\nFinished: ${done}/${entries.length} processed -> ${dir}`);

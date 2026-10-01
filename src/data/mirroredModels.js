// Modelos de bodas cuya subpágina se replica de forma literal desde el sitio
// original (ver tools/mirror_models.mjs). Cada uno es un documento autónomo en
// public/invitacion/<slug>/index.html con sus animaciones, CSS de Elementor,
// Swiper, Countdown e imágenes originales intactos.
//
// Esta lista es la única fuente de verdad: la consumen el router de React, el
// catálogo y el plugin de Vite que sirve /invitacion/<slug> sin barra final.

export const mirroredModels = [
  { slug: 'perla', name: 'Perla' },
  { slug: 'marmol', name: 'Mármol' },
  { slug: 'terra', name: 'Terra' },
  { slug: 'sobre', name: 'Sobre' },
  { slug: 'carmesi', name: 'Carmesí' },
  { slug: 'gerbera', name: 'Gerbera' },
  { slug: 'carta', name: 'Carta' },
  { slug: 'pasaporte', name: 'Pasaporte' },
]

export const mirroredSlugs = mirroredModels.map((m) => m.slug)

export function isMirrored(slug) {
  return mirroredSlugs.includes(slug)
}

/** URL pública de la subpágina replicada. */
export function mirroredPath(slug) {
  return `/invitacion/${slug}/`
}

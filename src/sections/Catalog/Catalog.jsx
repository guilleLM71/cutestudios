import CatalogItem from '../../components/CatalogItem/CatalogItem'
import { mirroredPath } from '../../data/mirroredModels'
import './Catalog.css'

// Los modelos de bodas están replicados como páginas reales (ver
// tools/mirror_models.mjs), así que se enlazan como documentos completos.
const catalogBodas = [
  { name: 'Perla', image: '/images/mockup-perla-boda.png', color: '#E8E4E1', slug: 'perla' },
  { name: 'Mármol', image: '/images/mockup-marmol-boda.png', color: '#D9D9D9', slug: 'marmol' },
  { name: 'Terra', image: '/images/mockup-terra-boda.png', color: '#C1A694', slug: 'terra' },
  { name: 'Sobre', image: '/images/mockup-sobre-boda.png', color: '#E2D5CD', slug: 'sobre' },
  { name: 'Carmesí', image: '/images/mockup-carmesi-boda.png', color: '#903135', slug: 'carmesi' },
  { name: 'Gerbera', image: '/images/mockup-gerbera-boda.png', color: '#D2A1A8', slug: 'gerbera' },
  { name: 'Carta', image: '/images/mockup-carta-boda.png', color: '#EDE7DE', slug: 'carta' },
  { name: 'Pasaporte', image: '/images/mockup-pasaporte-boda.png', color: '#C9B79C', slug: 'pasaporte' },
].map((m) => ({ ...m, path: mirroredPath(m.slug), external: true }))

const catalogXv = [
  { name: 'Rosa Pastel', image: '/images/mockup-rosa-pastel-xv.png', color: '#FADADD', slug: 'rosa-pastel' },
  { name: 'Realeza', image: '/images/mockup-realeza-xv.png', color: '#C5A3CF', slug: 'realeza' },
  { name: 'Cinderella', image: '/images/mockup-cinderella-xv.png', color: '#A2CFFE', slug: 'cinderella' },
  { name: 'Floral Terra', image: '/images/mockup-floral-terra-xv.png', color: '#C1A694', slug: 'floral-terra' },
  { name: 'Paper Floral', image: '/images/mockup-paper-floral-xv.png', color: '#F3E9E0', slug: 'paper-floral' },
  { name: 'Royal Flush', image: '/images/mockup-royal-flush-xv.png', color: '#800020', slug: 'royal-flush' },
  { name: 'Floral', image: '/images/mockup-floral-xv.png', color: '#E9C8D8', slug: 'floral' },
  { name: 'Fantasy', image: '/images/mockup-fantasy-xv.png', color: '#FFD1DC', slug: 'fantasy' },
]

const catalogGroups = [
  {
    id: 'graduacion',
    title: 'Graduación',
    note: 'La invitación es UNIPERSONAL. Si deseas una invitación para toda una promoción o curso, escríbenos y te haremos la cotización.',
    items: [
      { name: 'Marine', image: '/images/mockup-marine-graduacion.png', color: '#CFD8DC', slug: 'marine' },
      { name: 'Imperial', image: '/images/mockup-imperial-graduacion.png', color: '#2E3A59', slug: 'imperial' },
    ],
  },
  {
    id: 'bautizo',
    title: 'Bautizo',
    items: [
      { name: 'Dorado', image: '/images/mockup-dorado-bautizo.png', color: '#E0C9A0', slug: 'dorado' },
    ],
  },
  {
    id: 'cumplea',
    title: 'Cumpleaños',
    items: [
      { name: 'Nudarose', image: '/images/mockup-nuda-rose-cumple.png', color: '#E8C4C4', slug: 'nudarose' },
      { name: 'Festum', image: '/images/mockup-festum-cumple.png', color: '#FFF9C4', slug: 'festum' },
      { name: 'Rubra', image: '/images/mockup-rubra-cumple.png', color: '#8B1E3F', slug: 'rubra' },
      { name: 'Prive', image: '/images/mockup-prive-cumple.png', color: '#2B2B2B', slug: 'prive' },
    ],
  },
  {
    id: 'cumplei',
    title: 'Cumple Infantil',
    items: [
      { name: 'Capicumple', image: '/images/mockup-capicumple-infantil.png', color: '#FFE0B2', slug: 'capicumple' },
      { name: 'Kinder', image: '/images/mockup-kinder-infantil.png', color: '#B3E5FC', slug: 'kinder' },
      { name: 'Miky & Mini', image: '/images/mockup-mikymini-infantil.png', color: '#FFCDD2', slug: 'miky-mini' },
    ],
  },
  {
    id: 'misa',
    title: 'Misa',
    items: [
      { name: 'Misa', image: '/images/mockup-misa-misa.png', color: '#EDE7F6', slug: 'misa' },
    ],
  },
]

function Grid({ items }) {
  return (
    <div className="catalog-grid">
      {items.map((item) => (
        <CatalogItem
          key={item.slug || item.name}
          name={item.name}
          color={item.color}
          image={item.image}
          path={item.slug ? `/invitacion/${item.slug}` : item.path}
          external={item.external}
        />
      ))}
    </div>
  )
}

function Catalog({ type = 'bodas' }) {
  if (type === 'eventos') {
    return (
      <section className="section catalog" id="catalogo">
        <h2 className="section-title">Invitaciones</h2>
        <p className="section-subtitle">A TU MEDIDA</p>
        {catalogGroups.map((group) => (
          <div className="catalog-group" key={group.id} id={group.id}>
            <div className="catalog-group-head">
              <span className="catalog-group-label">Modelos</span>
              <h3>{group.title}</h3>
              {group.note && <p className="catalog-group-note">{group.note}</p>}
            </div>
            <Grid items={group.items} />
          </div>
        ))}
      </section>
    )
  }

  const items = type === 'xvanos' ? catalogXv : catalogBodas

  return (
    <section className="section catalog" id={type === 'xvanos' ? 'catalogoxv' : 'catalogo'}>
      <h2 className="section-title">Invitaciones</h2>
      <p className="section-subtitle">A TU MEDIDA</p>
      <p className="catalog-lead">
        {type === 'xvanos' ? 'Para todos los gustos, encuentra el tuyo…' : 'Elige tu modelo favorito…'}
      </p>
      <Grid items={items} />
    </section>
  )
}

export default Catalog

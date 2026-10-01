import './EventCategories.css'

const categories = [
  {
    icon: '/images/icon-deslizar.gif',
    title: 'Invitaciones\na tu medida',
    target: '#modelosv',
    primary: true,
  },
  {
    icon: '/images/icon-graduacion.gif',
    title: 'Graduación\ny egreso',
    target: '#graduacion',
    badge: true,
  },
  {
    icon: '/images/icon-paloma.gif',
    title: 'Bautizo y primera\ncomunión',
    target: '#bautizo',
    badge: true,
  },
  {
    icon: '/images/icon-pastel.gif',
    title: 'Cumpleaños\nde adulto',
    target: '#cumplea',
    badge: true,
  },
  {
    icon: '/images/icon-confeti.gif',
    title: 'Cumpleaños\ninfantil',
    target: '#cumplei',
    badge: true,
  },
  {
    icon: '/images/icon-misa.gif',
    title: 'Misa y\ncabo de año',
    target: '#misa',
    badge: true,
  },
]

function EventCategories() {
  return (
    <section className="section event-categories" id="modelosv">
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.title}
            className={`category-card ${category.primary ? 'primary' : ''}`}
          >
            <div className={`category-icon ${category.badge ? 'badge' : ''}`}>
              <img src={category.icon} alt="" />
            </div>
            <h3>
              {category.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h3>
            <a href={category.target} className="category-btn">
              VER MODELOS
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EventCategories

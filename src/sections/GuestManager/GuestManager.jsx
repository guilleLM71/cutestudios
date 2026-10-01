import './GuestManager.css'

const features = [
  {
    icon: '/images/icon-ticket.gif',
    title: 'Control total',
    text: 'Tú controlas el número exacto de pases asignados a cada invitado, y ellos solo podrán confirmar esa cantidad.',
  },
  {
    icon: '/images/icon-seguridad.gif',
    title: 'Links únicos',
    text: 'Evita colados con enlaces personales, intransferibles y seguros que solo permiten confirmar una sola vez.',
  },
  {
    icon: '/images/icon-lista.gif',
    title: 'Lista organizada',
    text: 'Controla todo en un solo lugar viendo al instante quién confirma, sus acompañantes en una misma planilla.',
  },
]

function GuestManager() {
  return (
    <section className="section guest-manager" id="gestor">
      <h2 className="section-title">Gestor de</h2>
      <p className="section-subtitle">INVITADOS</p>

      <div className="guest-grid">
        {features.map((feature) => (
          <div className="guest-card" key={feature.title}>
            <div className="guest-icon">
              <img src={feature.icon} alt="" />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="guest-action">
        <a
          href="https://www.youtube.com/watch?v=SCSbs6-2kN8"
          className="cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          VER MÁS SOBRE EL GESTOR
        </a>
      </div>
    </section>
  )
}

export default GuestManager

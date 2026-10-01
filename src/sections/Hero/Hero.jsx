import { Link } from 'react-router-dom'
import './Hero.css'

function Hero({
  title = 'DIGITALES',
  subtitle = 'Invitaciones',
  tagline,
  ctaHref = 'https://wa.me/59178889375?text=Quisiera%20mas%20informaci%C3%B3n%20sobre%20invitaciones%20digitales',
  ctaText = 'CONTACTAR ASESOR',
  showCategories = true,
}) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        {showCategories && (
          <div className="hero-categories">
            <Link to="/">BODAS</Link>
            <span className="separator"></span>
            <Link to="/mis-15">XV AÑOS</Link>
            <span className="separator"></span>
            <Link to="/eventos">OTROS EVENTOS</Link>
          </div>
        )}

        <p className="hero-subtitle font-script">{subtitle}</p>
        <h1>{title}</h1>
        {tagline && <p className="hero-tagline">{tagline}</p>}

        {ctaHref.startsWith('#') ? (
          <a href={ctaHref} className="cta-button">{ctaText}</a>
        ) : (
          <a href={ctaHref} className="cta-button" target="_blank" rel="noopener noreferrer">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

export default Hero

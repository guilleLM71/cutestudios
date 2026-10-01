import { Link } from 'react-router-dom'
import './Footer.css'

const socialLinks = [
  { icon: '/images/facebook-icon.png', href: 'https://www.facebook.com/', label: 'Facebook' },
  { icon: '/images/tiktok-icon.png', href: 'https://www.tiktok.com/', label: 'TikTok' },
  { icon: '/images/instagram-icon.png', href: 'https://www.instagram.com/', label: 'Instagram' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3 className="footer-logo">Cute Studios</h3>
          <p>Invitaciones digitales para bodas, XV años y otros eventos especiales. Diseño exclusivo y elegante.</p>
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <img src={social.icon} alt={social.label} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <h3>NAVEGACIÓN</h3>
          <ul>
            <li><Link to="/#catalogo">Nuestro Catálogo</Link></li>
            <li><Link to="/#paquetes">Nuestros Paquetes</Link></li>
            <li><Link to="/#extra">Servicios Extra</Link></li>
            <li><Link to="/#gestor">Gestor de Invitados</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>CONTACTO</h3>
          <p><strong>Correo Electrónico</strong></p>
          <p>cutestudios@gmail.com</p>
          <p style={{ marginTop: '1rem' }}><strong>Teléfono</strong></p>
          <p>+591 78889375</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cute Studios. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer

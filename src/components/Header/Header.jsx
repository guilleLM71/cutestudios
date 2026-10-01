import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const closeMenu = () => setMenuOpen(false)

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-logo" onClick={closeMenu}>Cute Studios</Link>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menú">
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu} className={isActive('/') ? 'active-link' : ''}>Bodas</Link></li>
          <li><Link to="/mis-15" onClick={closeMenu} className={isActive('/mis-15') ? 'active-link' : ''}>XV Años</Link></li>
          <li><Link to="/eventos" onClick={closeMenu} className={isActive('/eventos') ? 'active-link' : ''}>Otros Eventos</Link></li>
          <li>
            <a
              href="https://app.cutestudios.com"
              className="nav-login"
              onClick={closeMenu}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ingresar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

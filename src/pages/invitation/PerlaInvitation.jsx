import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import './PerlaInvitation.css'

function PerlaInvitation() {
  const [searchParams] = useSearchParams()
  const guestName = searchParams.get('nombre') || 'Familia'
  const guestsCount = searchParams.get('invitados') || '1'

  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2026-06-28T13:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleEnter = () => {
    setEntered(true)
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="perla-invitation">
      <audio 
        ref={audioRef} 
        loop 
        src="https://vogastudios.com/wp-content/uploads/2025/12/Until-I-Found-You-Stephen-Sanchez-Espanol-Lyrics-margarita.mp3" 
      />

      {/* Splash Screen */}
      <div className={`perla-splash ${entered ? 'hidden' : ''}`}>
        <h2 className="perla-script">Camila & Alejandro</h2>
        <p className="perla-sub">NUESTRA BODA</p>
        <button className="perla-enter-btn" onClick={handleEnter}>INGRESAR</button>
      </div>

      {/* Floating Music Button */}
      {entered && (
        <button className={`music-toggle ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}

      {/* Main Content */}
      <div className="perla-content">
        <section className="perla-hero">
          <div className="laurel-wreath">
            <h1 className="perla-names">Camila<br/>&<br/>Alejandro</h1>
          </div>
          <p className="perla-intro">TENEMOS EL HONOR DE INVITARTE A NUESTRA BODA</p>
        </section>

        <section className="perla-countdown-section">
          <h2>28 Junio 2026</h2>
          <div className="perla-countdown">
            <div className="time-box">
              <span className="time-num">{timeLeft.days}</span>
              <span className="time-label">Días</span>
            </div>
            <div className="time-box">
              <span className="time-num">{timeLeft.hours}</span>
              <span className="time-label">Hrs</span>
            </div>
            <div className="time-box">
              <span className="time-num">{timeLeft.minutes}</span>
              <span className="time-label">Min</span>
            </div>
            <div className="time-box">
              <span className="time-num">{timeLeft.seconds}</span>
              <span className="time-label">Seg</span>
            </div>
          </div>
        </section>

        <section className="perla-greeting">
          <p className="greeting-hola">Hola</p>
          <h2 className="greeting-name">{guestName}</h2>
          <p className="greeting-text">Nos encantaría que nos acompañes en este día tan especial.</p>
          <div className="greeting-passes">
            <span>Pases:</span>
            <div className="passes-number">{guestsCount}</div>
          </div>
        </section>

        <section className="perla-parents">
          <div className="parents-col">
            <h3>Padres de la Novia</h3>
            <p>María González</p>
            <p>Juan Pérez</p>
          </div>
          <div className="parents-col">
            <h3>Padres del Novio</h3>
            <p>Ana López</p>
            <p>Carlos Gómez</p>
          </div>
        </section>

        <section className="perla-locations">
          <div className="location-card">
            <img src="https://vogastudios.com/wp-content/uploads/2025/12/icono-iglesia-modelo-perla-BODA.gif" alt="Ceremonia" />
            <h3>Ceremonia Religiosa</h3>
            <p className="time">13:00 Hrs</p>
            <p className="place">Iglesia San Sebastian</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="perla-btn">VER UBICACIÓN</a>
          </div>
          <div className="location-card">
            <img src="https://vogastudios.com/wp-content/uploads/2025/12/icon-copas-modelo-perla-BODA.gif" alt="Recepción" />
            <h3>Recepción</h3>
            <p className="time">15:00 Hrs</p>
            <p className="place">Salón de eventos Castrillo</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="perla-btn">VER UBICACIÓN</a>
          </div>
        </section>

        <section className="perla-dresscode">
          <h3>Código de Vestimenta</h3>
          <p className="dress-type">FORMAL</p>
          <p className="dress-desc">Se reserva el color blanco para la novia</p>
        </section>

        <section className="perla-itinerary">
          <h3>Itinerario</h3>
          <ul className="timeline">
            <li><strong>13:00</strong> Ceremonia Religiosa</li>
            <li><strong>15:00</strong> Recepción y Cóctel</li>
            <li><strong>16:00</strong> Almuerzo</li>
            <li><strong>18:00</strong> Primer Baile</li>
            <li><strong>00:00</strong> Fin del evento</li>
          </ul>
        </section>

        <section className="perla-gifts">
          <img src="https://vogastudios.com/wp-content/uploads/2025/12/icono-sobre-blanco-MR.gif" alt="Regalos" />
          <h3>Mesa de Regalos</h3>
          <p>Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros:</p>
          <div className="gift-box">
            <p><strong>Lluvia de Sobres</strong></p>
            <p>Habrá un buzón en la recepción para depositar los sobres.</p>
          </div>
          <div className="gift-box">
            <p><strong>Transferencia BCP</strong></p>
            <p>Cuenta: 123-4567890-1-23</p>
            <p>Alejandro Gómez</p>
          </div>
        </section>

        <section className="perla-gallery">
          <h3>Nuestra Historia</h3>
          <div className="gallery-grid">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 1" />
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 2" />
            <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 3" />
            <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 4" />
          </div>
        </section>

        <section className="perla-rsvp">
          <h3>Confirmación de Asistencia</h3>
          <p>Por favor confirma tu asistencia antes del 10 de Junio.</p>
          <form className="rsvp-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" value={guestName} readOnly />
            <select>
              <option value="si">Sí, ahí estaré</option>
              <option value="no">No podré asistir</option>
            </select>
            <textarea placeholder="Mensaje para los novios (Opcional)"></textarea>
            <button type="submit" className="perla-btn submit-btn">CONFIRMAR</button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default PerlaInvitation

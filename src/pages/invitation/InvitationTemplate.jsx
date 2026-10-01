import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getTheme } from '../../data/invitationThemes'
import { getModel } from '../../data/invitationModels'
import './InvitationTemplate.css'

function InvitationTemplate({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp || params.slug || 'perla'
  const theme = getTheme(slug)
  const model = getModel(slug)

  const [searchParams] = useSearchParams()
  const guestName = searchParams.get('nombre') || 'Familia'
  const guestsCount = searchParams.get('invitados') || '1'

  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Fecha objetivo: la del modelo (o la genérica de referencia)
  const targetDate = model?.countdown || '2027-06-28T13:00:00'

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  // Animación de aparición al hacer scroll (reveal)
  useEffect(() => {
    const els = document.querySelectorAll('.inv-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('shown')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [entered, slug])

  const handleEnter = () => {
    setEntered(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const themeVars = {
    '--inv-primary': theme.colors.primary,
    '--inv-bg': theme.colors.bg,
    '--inv-text': theme.colors.text,
    '--inv-accent': theme.colors.accent,
    '--inv-button': theme.colors.button,
    '--inv-heading': theme.heading,
    '--inv-body': theme.body,
    '--inv-script': theme.script,
  }

  const Countdown = ({ label = 'Faltan' }) => (
    <div className="inv-countdown-block inv-reveal">
      <p className="inv-countdown-label">{label}</p>
      <div className="inv-countdown">
        <div className="inv-time-box">
          <span className="inv-time-num">{timeLeft.days}</span>
          <span className="inv-time-label">Días</span>
        </div>
        <div className="inv-time-box">
          <span className="inv-time-num">{timeLeft.hours}</span>
          <span className="inv-time-label">Hrs</span>
        </div>
        <div className="inv-time-box">
          <span className="inv-time-num">{timeLeft.minutes}</span>
          <span className="inv-time-label">Min</span>
        </div>
        <div className="inv-time-box">
          <span className="inv-time-num">{timeLeft.seconds}</span>
          <span className="inv-time-label">Seg</span>
        </div>
      </div>
    </div>
  )

  /* ------------------------- SPLASH ------------------------- */
  const splash = model?.splash
  const renderSplash = () => {
    if (!splash) {
      // Splash genérico (modelos XV/eventos sin subpágina propia)
      return (
        <div className={`inv-splash ${entered ? 'hidden' : ''}`}>
          <h2 className="inv-script">Camila & Alejandro</h2>
          <p className="inv-sub">{theme.eventType}</p>
          <button className="inv-enter-btn" onClick={handleEnter}>INGRESAR</button>
        </div>
      )
    }

    if (splash.variant === 'seal') {
      return (
        <div className={`inv-splash splash-seal ${entered ? 'hidden' : ''}`}>
          <button className="inv-seal-btn" onClick={handleEnter} aria-label="Ingresar">
            <img src={splash.image} alt="Sello" className="inv-seal-img" />
          </button>
          <p className="inv-splash-hint">{splash.hint}</p>
          {splash.signoff && <p className="inv-splash-signoff">{splash.signoff}</p>}
          <h2 className="inv-script inv-splash-names">{splash.names}</h2>
        </div>
      )
    }

    if (splash.variant === 'envelope') {
      return (
        <div className={`inv-splash splash-envelope ${entered ? 'hidden' : ''}`}>
          <div className="inv-envelope">
            <img src={splash.left} alt="" className="inv-envelope-left" />
            <button className="inv-seal-btn" onClick={handleEnter} aria-label="Abrir">
              <img src={splash.seal} alt="Sello" className="inv-seal-img" />
            </button>
            <img src={splash.right} alt="" className="inv-envelope-right" />
          </div>
          <p className="inv-splash-hint">{splash.hint}</p>
          {splash.kicker && <p className="inv-splash-kicker">{splash.kicker}</p>}
          <h2 className="inv-script inv-splash-names">{splash.names}</h2>
        </div>
      )
    }

    // standard
    return (
      <div className={`inv-splash ${entered ? 'hidden' : ''}`}>
        {splash.initials && <img src={splash.initials} alt="" className="inv-splash-initials" />}
        {splash.kicker && <p className="inv-splash-kicker">{splash.kicker}</p>}
        <h2 className="inv-script inv-splash-names">{splash.names}</h2>
        {splash.sub && <p className="inv-sub">{splash.sub}</p>}
        <button className="inv-enter-btn" onClick={handleEnter}>INGRESAR</button>
      </div>
    )
  }

  /* ------------------------- HERO ------------------------- */
  const renderHero = () => {
    const h = model.hero

    if (h.variant === 'script') {
      return (
        <section className="inv-hero hero-script inv-reveal">
          <h1 className="inv-names">
            {h.names[0]}
            <span className="inv-names-y">{h.names[1]}</span>
            {h.names[2]}
          </h1>
          <p className="inv-intro">{h.intro}</p>
          <p className="inv-sub-title">{h.sub}</p>
          <div className="inv-date-big">
            <span className="inv-date-day">{h.date.day}</span>
            <span className="inv-date-month">{h.date.month}</span>
            <span className="inv-date-year">{h.date.year}</span>
          </div>
          <Countdown />
        </section>
      )
    }

    if (h.variant === 'photo-names') {
      return (
        <section className="inv-hero hero-photo inv-reveal">
          {h.kicker && <p className="inv-kicker">{h.kicker}</p>}
          <h1 className="inv-names">{h.names.join(' ')}</h1>
          {h.frame && <img src={h.frame} alt="" className="inv-hero-frame" />}
          <div className="inv-hero-photo-wrap">
            <img src={h.photo} alt="" className="inv-hero-photo" />
          </div>
          <p className="inv-sub-title">{h.sub}</p>
        </section>
      )
    }

    if (h.variant === 'seal-hero') {
      return (
        <section className="inv-hero hero-seal inv-reveal">
          <h1 className="inv-names">{h.names[0]}</h1>
          <p className="inv-sub-title">{h.sub}</p>
          <img src={h.icon} alt="" className="inv-hero-icon" />
          <p className="inv-hero-text">{h.intro}</p>
          <p className="inv-hero-text">{h.intro2}</p>
          {model.dateBlock && (
            <div className="inv-date-card">
              {model.dateBlock.icon && <img src={model.dateBlock.icon} alt="" className="inv-date-icon" />}
              <p className="inv-date-month">{model.dateBlock.month}</p>
              <span className="inv-date-day">{model.dateBlock.day}</span>
              <p className="inv-date-time">{model.dateBlock.time}</p>
              <p className="inv-date-weekday">{model.dateBlock.weekday}</p>
            </div>
          )}
          <Countdown />
        </section>
      )
    }

    if (h.variant === 'envelope-hero') {
      return (
        <section className="inv-hero hero-envelope inv-reveal">
          <img src={h.photo} alt="" className="inv-envelope-photo" />
          <p className="inv-kicker">{h.kicker}</p>
          <div className="inv-date-big">
            <span className="inv-date-day">{h.date.day}</span>
            <span className="inv-date-month">{h.date.month}</span>
            <span className="inv-date-year">{h.date.year}</span>
          </div>
          <p className="inv-kicker">{h.kicker2}</p>
          <p className="inv-sub-title">{h.sub}</p>
          <h1 className="inv-names">{h.names.join(' ')}</h1>
          <Countdown />
        </section>
      )
    }

    if (h.variant === 'initials') {
      return (
        <section className="inv-hero hero-initials inv-reveal">
          <p className="inv-kicker">{h.kicker}</p>
          <img src={h.initialsTop} alt="" className="inv-initials-top" />
          <img src={h.flower} alt="" className="inv-hero-flower" />
          <p className="inv-sub-title">{h.sub}</p>
          <img src={h.initialsBottom} alt="" className="inv-initials-bottom" />
          <div className="inv-hero-photo-wrap">
            <img src={h.photo} alt="" className="inv-hero-photo" />
          </div>
          {model.dateBlock && (
            <div className="inv-date-inline">
              <span>{model.dateBlock.weekday}</span>
              <span className="inv-date-day">{model.dateBlock.day}</span>
              <span>{model.dateBlock.month}</span>
              <span>{model.dateBlock.city}</span>
            </div>
          )}
          <Countdown />
        </section>
      )
    }

    if (h.variant === 'letter') {
      return (
        <section className="inv-hero hero-letter inv-reveal">
          <p className="inv-letter-line">{h.kickerTop}</p>
          <img src={h.initials} alt="" className="inv-letter-initials" />
          <h1 className="inv-names letter-names">
            {h.names[0]}
            <span className="inv-names-amp">{h.names[1]}</span>
            {h.names[2]}
          </h1>
          <p className="inv-letter-line">{h.intro}</p>
          <div className="inv-date-big letter-date">
            <span className="inv-date-month">{h.date.month}</span>
            <span className="inv-date-day">{h.date.day}</span>
            <span className="inv-date-year">{h.date.year}</span>
          </div>
          <img src={h.heart} alt="" className="inv-letter-heart" />
        </section>
      )
    }

    if (h.variant === 'passport') {
      return (
        <section className="inv-hero hero-passport inv-reveal">
          <p className="inv-kicker passport-kicker">{h.kicker}</p>
          <div className="passport-photo-wrap">
            <img src={h.photo} alt="" className="passport-photo" />
          </div>
          <div className="passport-card">
            {h.card.map((f) => (
              <div className="passport-row" key={f.label}>
                <span className="passport-label">{f.label}</span>
                <span className="passport-value">{f.value}</span>
              </div>
            ))}
            <div className="passport-date">
              <span className="passport-month">{h.date.month}</span>
              <span className="passport-day">{h.date.day}</span>
              <span className="passport-time">{h.date.time}</span>
            </div>
            {h.fields.map((f) => (
              <div className="passport-row" key={f.label}>
                <span className="passport-label">{f.label}</span>
                <span className="passport-value">{f.value}</span>
              </div>
            ))}
          </div>
          <p className="passport-quote">{h.quote}</p>
        </section>
      )
    }
    return null
  }

  /* ------------------------- SECCIONES DEL MODELO ------------------------- */
  const renderModelContent = () => {
    const m = model
    const parents = m.blessing

    return (
      <>
        {renderHero()}

        {/* Calendario (Carmesí) */}
        {m.calendar && (
          <section className="inv-calendar-section inv-reveal">
            <p className="inv-calendar-date">{m.calendar.date}</p>
            <div className="inv-calendar">
              <p className="inv-calendar-title">{m.calendar.month} {m.calendar.year}</p>
              <div className="inv-calendar-grid weekdays">
                {m.calendar.weekdays.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="inv-calendar-grid days">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <span key={d} className={d === m.calendar.highlight ? 'highlight' : ''}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <Countdown label="Faltan..." />
          </section>
        )}

        {/* Cita / Versículo */}
        {m.quote && (
          <section className="inv-quote inv-reveal">
            {m.quote.decoration && <img src={m.quote.decoration} alt="" className="inv-quote-deco" />}
            {m.quote.initials && <img src={m.quote.initials} alt="" className="inv-quote-initials" />}
            <p>{m.quote.text}</p>
            {m.quote.source && <span>{m.quote.source}</span>}
          </section>
        )}

        {/* Fecha (modelos con dateBlock no usados en el hero) */}
        {m.dateBlock && ['photo-names'].includes(m.hero.variant) && (
          <section className="inv-date-section inv-reveal">
            {m.dateBlock.weekday && <p className="inv-date-weekday">{m.dateBlock.weekday}</p>}
            <span className="inv-date-day">{m.dateBlock.day}</span>
            <p className="inv-date-month">{m.dateBlock.month}</p>
            {m.dateBlock.time && <p className="inv-date-time">{m.dateBlock.time}</p>}
            <Countdown />
          </section>
        )}

        {/* Mensaje + pases */}
        {m.message && (
          <section className="inv-greeting inv-reveal">
            <p className="inv-greeting-text">{m.message}</p>
          </section>
        )}

        {m.passes && (
          <section className="inv-passes-card inv-reveal">
            <p className="inv-passes-lead">{m.passes.lead}</p>
            <h2 className="inv-passes-name">{guestName}</h2>
            {m.passes.passLead && <p className="inv-passes-passlead">{m.passes.passLead}</p>}
            <div className="inv-passes-row">
              <span>{m.passes.label}</span>
              <div className="inv-passes-number">{guestsCount}</div>
            </div>
            {m.passes.nameLead && (
              <p className="inv-passes-namelead">
                {m.passes.nameLead} <strong>{guestName}</strong>
              </p>
            )}
          </section>
        )}

        {m.message2 && (
          <section className="inv-greeting inv-reveal">
            <p className="inv-greeting-text">{m.message2}</p>
          </section>
        )}

        {/* Padres y padrinos */}
        {parents && (
          <section className="inv-parents inv-reveal">
            <img src={parents.seal || m.dividerSeal} alt="" className="inv-parents-deco" style={{ display: parents.seal || m.dividerSeal ? 'block' : 'none' }} />
            <h2 className="inv-section-title">{parents.title}</h2>
            {parents.intro && <p className="inv-parents-intro">{parents.intro}</p>}
            <div className="inv-parents-grid">
              {parents.groups.map((g) => (
                <div className="inv-parents-col" key={g.title}>
                  <h3>{g.title}</h3>
                  {g.names.map((n) => (
                    <p key={n}>{n}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Divisor decorativo */}
        {m.divider && <img src={m.divider} alt="" className="inv-divider inv-reveal" />}

        {/* Ceremonia y recepción */}
        {m.locations && (
          <section className="inv-locations inv-reveal">
            {m.locations.map((loc) => (
              <div className="inv-location-card" key={loc.title}>
                <img src={loc.icon} alt="" />
                <h3>{loc.title}</h3>
                {loc.time && <p className="inv-time">{loc.time}</p>}
                <p className="inv-place">{loc.place}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.place)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inv-btn"
                >
                  VER UBICACIÓN
                </a>
              </div>
            ))}
          </section>
        )}

        {/* Nota sin pantallas (Gerbera) */}
        {m.screensNote && (
          <section className="inv-note-card inv-reveal">
            <p>{m.screensNote}</p>
          </section>
        )}

        {/* Dress code */}
        {m.dress && (
          <section className="inv-dresscode inv-reveal">
            {m.dress.icon && <img src={m.dress.icon} alt="" className="inv-dress-icon" />}
            {m.dress.icons && (
              <div className="inv-dress-icons">
                {m.dress.icons.map((i) => (
                  <img src={i} alt="" key={i} />
                ))}
              </div>
            )}
            <h2 className="inv-section-title">{m.dress.title}</h2>
            {m.dress.text && <p className="inv-dress-type">{m.dress.text}</p>}
            {m.dress.items && (
              <div className="inv-dress-items">
                {m.dress.items.map((it) => (
                  <div className="inv-dress-item" key={it.label}>
                    {it.icon && <img src={it.icon} alt="" />}
                    <p className="inv-dress-item-label">{it.label}</p>
                    <p className="inv-dress-item-text">{it.text}</p>
                  </div>
                ))}
              </div>
            )}
            {m.dress.note && <p className="inv-dress-desc">{m.dress.note}</p>}
            {m.dress.details && (
              <div className="inv-dress-details">
                {m.dress.details.map((d) => (
                  <div className="inv-dress-detail" key={d.label}>
                    <img src={d.img} alt="" />
                    <p className="inv-dress-item-label">{d.label}</p>
                    <p className="inv-dress-item-text">{d.text}</p>
                  </div>
                ))}
              </div>
            )}
            {m.dress.palette && (
              <div className="inv-dress-palette">
                {m.dress.palette.label && <p>{m.dress.palette.label}</p>}
                {m.dress.palette.img && <img src={m.dress.palette.img} alt="Paleta de colores" />}
                {m.dress.palette.text && <p>{m.dress.palette.text}</p>}
              </div>
            )}
          </section>
        )}

        {/* Itinerario */}
        {m.itinerary && (
          <section className="inv-itinerary inv-reveal">
            {m.itinerary.decoration && <img src={m.itinerary.decoration} alt="" className="inv-itinerary-deco" />}
            <h2 className="inv-section-title">{m.itinerary.title}</h2>
            <ul className={`inv-timeline-icons ${m.itinerary.dashed ? 'dashed' : ''}`}>
              {m.itinerary.items.map((it, idx) => (
                <li key={`${it.label}-${idx}`}>
                  <img src={it.icon} alt="" />
                  <div>
                    <p className="inv-tl-label">{it.label}</p>
                    <p className="inv-tl-time">{it.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            {m.itinerary.note && (
              <div className="inv-itinerary-note">
                {m.itinerary.noteIcon && <img src={m.itinerary.noteIcon} alt="" />}
                <p>{m.itinerary.note}</p>
              </div>
            )}
          </section>
        )}

        {/* Galerías */}
        {m.gallery && m.gallery.photos && (
          <section className="inv-gallery inv-reveal">
            {m.gallery.title && <h2 className="inv-section-title">{m.gallery.title}</h2>}
            <div className="inv-gallery-grid">
              {m.gallery.photos.map((p) => (
                <img src={p} alt="" key={p} />
              ))}
            </div>
          </section>
        )}

        {[m.gallery15, m.gallery2, m.gallery3].filter(Boolean).map((photos, i) => (
          <section className="inv-gallery inv-reveal" key={`g${i}`}>
            <div className={`inv-gallery-grid ${photos.length === 1 ? 'single' : ''}`}>
              {photos.map((p) => (
                <img src={p} alt="" key={p} />
              ))}
            </div>
          </section>
        ))}

        {/* Compartir fotos */}
        {m.share && (
          <section className="inv-share inv-reveal">
            <img src={m.share.icon} alt="" />
            {m.share.title && <h2 className="inv-section-title">{m.share.title}</h2>}
            <p>{m.share.text}</p>
          </section>
        )}

        {/* Sin niños / con respeto */}
        {m.kids && (
          <section className="inv-kids inv-reveal">
            {m.kids.decoration && <img src={m.kids.decoration} alt="" className="inv-kids-deco" />}
            {m.kids.icon && <img src={m.kids.icon} alt="" />}
            {m.kids.title && <h2 className="inv-section-title">{m.kids.title}</h2>}
            <p>{m.kids.text}</p>
          </section>
        )}

        {/* Sugerencia de regalos */}
        {m.gifts && (
          <section className="inv-gifts inv-reveal">
            {m.gifts.icon && <img src={m.gifts.icon} alt="" className="inv-gift-icon" />}
            <h2 className="inv-section-title">{m.gifts.title}</h2>
            {m.gifts.text && <p>{m.gifts.text}</p>}
            {m.gifts.texts?.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <div className="inv-gift-options">
              {m.gifts.options?.map((o) => (
                <div className="inv-gift-box" key={o.text}>
                  {o.icon && <img src={o.icon} alt="" />}
                  <p>
                    <strong>{o.text}</strong>
                  </p>
                  {o.sub && <p>{o.sub}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA final (Carta) */}
        {m.cta && (
          <section className="inv-cta-final inv-reveal">
            <h2>{m.cta.title}</h2>
            <p>{m.cta.text}</p>
          </section>
        )}

        {/* Cierre (Pasaporte) */}
        {m.final && (
          <section className="inv-final inv-reveal">
            <p className="inv-kicker">{m.final.kicker}</p>
            <h2 className="inv-section-title">{m.final.title}</h2>
            <p>{m.final.text}</p>
            <img src={m.final.image} alt="" />
          </section>
        )}

        {/* Confirmación */}
        <section className="inv-rsvp inv-reveal">
          <h2 className="inv-section-title">{m.rsvp?.title || 'Confirma tu Asistencia'}</h2>
          {m.rsvp?.texts?.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <form
            className="inv-rsvp-form"
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.target)
              const msg = `Invitación ${m.rsvp?.title || ''}: ${data.get('nombre')} — ${data.get('asistencia')}${
                data.get('mensaje') ? ` — ${data.get('mensaje')}` : ''
              }`
              window.open(`https://wa.me/59178889375?text=${encodeURIComponent(msg)}`, '_blank')
            }}
          >
            <input type="text" name="nombre" defaultValue={guestName} placeholder="Tu nombre" />
            <select name="asistencia" defaultValue="Sí, ahí estaré">
              <option>Sí, ahí estaré</option>
              <option>No podré asistir</option>
            </select>
            <textarea name="mensaje" placeholder="Mensaje para los novios (Opcional)"></textarea>
            <button type="submit" className="inv-btn submit-btn">CONFIRMAR</button>
          </form>
        </section>

        {/* Firma / cierre */}
        <footer className="inv-signature inv-reveal">
          {m.rsvp?.divider && <img src={m.rsvp.divider} alt="" className="inv-signature-deco" />}
          {m.rsvp?.divider2 && <img src={m.rsvp.divider2} alt="" className="inv-signature-deco" />}
          {m.rsvp?.signature?.map((line) => (
            <p className="inv-script" key={line}>
              {line}
            </p>
          ))}
          {m.footer && <p className="inv-footer-note">{m.footer}</p>}
        </footer>
      </>
    )
  }

  /* ------------------------- CONTENIDO GENÉRICO (sin subpágina propia) ------------------------- */
  const renderGenericContent = () => (
    <>
      <section className="inv-hero">
        <h1 className="inv-names">
          Camila<br />&<br />Alejandro
        </h1>
        <p className="inv-intro">TENEMOS EL HONOR DE INVITARTE A {theme.eventType}</p>
      </section>

      <section className="inv-countdown-section">
        <h2>28 Junio 2027</h2>
        <Countdown />
      </section>

      <section className="inv-greeting">
        <p className="inv-greeting-hola">Hola</p>
        <h2 className="inv-greeting-name">{guestName}</h2>
        <p className="inv-greeting-text">Nos encantaría que nos acompañes en este día tan especial.</p>
        <div className="inv-greeting-passes">
          <span>Pases:</span>
          <div className="inv-passes-number">{guestsCount}</div>
        </div>
      </section>

      <section className="inv-parents">
        <div className="inv-parents-col">
          <h3>Padres de la Novia</h3>
          <p>María González</p>
          <p>Juan Pérez</p>
        </div>
        <div className="inv-parents-col">
          <h3>Padres del Novio</h3>
          <p>Ana López</p>
          <p>Carlos Gómez</p>
        </div>
      </section>

      <section className="inv-locations">
        <div className="inv-location-card">
          <img src="/images/icon-iglesia.gif" alt="Ceremonia" />
          <h3>Ceremonia Religiosa</h3>
          <p className="inv-time">13:00 Hrs</p>
          <p className="inv-place">Iglesia San Sebastian</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inv-btn">VER UBICACIÓN</a>
        </div>
        <div className="inv-location-card">
          <img src="/images/icon-copas.gif" alt="Recepción" />
          <h3>Recepción</h3>
          <p className="inv-time">15:00 Hrs</p>
          <p className="inv-place">Salón de eventos Castrillo</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inv-btn">VER UBICACIÓN</a>
        </div>
      </section>

      <section className="inv-dresscode">
        <h3>Código de Vestimenta</h3>
        <p className="inv-dress-type">FORMAL</p>
        <p className="inv-dress-desc">Se reserva el color blanco para la novia</p>
      </section>

      <section className="inv-itinerary">
        <h3>Itinerario</h3>
        <ul className="inv-timeline">
          <li><strong>13:00</strong> Ceremonia Religiosa</li>
          <li><strong>15:00</strong> Recepción y Cóctel</li>
          <li><strong>16:00</strong> Almuerzo</li>
          <li><strong>18:00</strong> Primer Baile</li>
          <li><strong>00:00</strong> Fin del evento</li>
        </ul>
      </section>

      <section className="inv-gifts">
        <img src="/images/icon-sobre.gif" alt="Regalos" />
        <h3>Mesa de Regalos</h3>
        <p>Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros:</p>
        <div className="inv-gift-box">
          <p><strong>Lluvia de Sobres</strong></p>
          <p>Habrá un buzón en la recepción para depositar los sobres.</p>
        </div>
        <div className="inv-gift-box">
          <p><strong>Transferencia BCP</strong></p>
          <p>Cuenta: 123-4567890-1-23</p>
          <p>Alejandro Gómez</p>
        </div>
      </section>

      <section className="inv-gallery">
        <h3>Nuestra Historia</h3>
        <div className="inv-gallery-grid">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 1" />
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 2" />
          <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 3" />
          <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400&h=400" alt="Nosotros 4" />
        </div>
      </section>

      <section className="inv-rsvp">
        <h3>Confirmación de Asistencia</h3>
        <p>Por favor confirma tu asistencia antes del 10 de Junio.</p>
        <form className="inv-rsvp-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={guestName} readOnly />
          <select defaultValue="si">
            <option value="si">Sí, ahí estaré</option>
            <option value="no">No podré asistir</option>
          </select>
          <textarea placeholder="Mensaje para los novios (Opcional)"></textarea>
          <button type="submit" className="inv-btn submit-btn">CONFIRMAR</button>
        </form>
      </section>
    </>
  )

  return (
    <div className={`inv-template ${model ? 'has-model' : ''}`} style={themeVars} data-model={slug}>
      <audio ref={audioRef} loop src="/images/musica-demo.mp3" />

      {renderSplash()}

      {entered && (
        <button className={`inv-music-toggle ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}

      <div className="inv-content">{model ? renderModelContent() : renderGenericContent()}</div>
    </div>
  )
}

export default InvitationTemplate

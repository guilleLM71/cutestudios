import { useState } from 'react'
import './CTA.css'

const whatsappNumber = '59178889375'

const configs = {
  bodas: {
    text: 'Cuéntanos los detalles de tu boda y el modelo/paquete que prefieres. Y empieza tu invitación HOY MISMO.',
    packages: ['Esmeralda', 'Diamante'],
    showEvent: false,
    links: [
      { label: 'Nuestro Catálogo', href: '#catalogo' },
      { label: 'Nuestros Paquetes', href: '#paquetes' },
      { label: 'Servicios Extra', href: '#extra' },
      { label: '¿Qué es el gestor de invitados?', href: '#gestor' },
    ],
  },
  xvanos: {
    text: 'Cuéntanos los detalles de tus XV y el modelo/paquete que prefieres. Y empieza tu invitación HOY MISMO.',
    packages: ['Esmeralda XV', 'Diamante XV'],
    showEvent: false,
    links: [
      { label: 'Nuestro Catálogo', href: '#catalogoxv' },
      { label: 'Nuestros Paquetes', href: '#paquetes' },
      { label: 'Tabla de Información', href: '#tabla' },
    ],
  },
  eventos: {
    text: 'Cuéntanos los detalles de tu evento y el modelo/paquete que prefieres. Y empieza tu invitación HOY MISMO.',
    packages: ['Gemma', 'Singulare'],
    showEvent: true,
    links: [
      { label: 'Nuestro Catálogo', href: '#catalogo' },
      { label: 'Nuestros Paquetes', href: '#paquetes' },
      { label: 'Servicios Extra', href: '#extra' },
    ],
  },
}

function CTA({ type = 'bodas' }) {
  const config = configs[type] || configs.bodas

  const [form, setForm] = useState({
    nombre: '',
    paquete: config.packages[0],
    evento: 'Graduación',
    mensaje: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let text = `Hola, soy ${form.nombre || ''}. `
    if (config.showEvent) text += `Mi evento: ${form.evento}. `
    text += `Me interesa el paquete ${form.paquete}. `
    if (form.mensaje) text += `Mensaje: ${form.mensaje}`
    text += ' ¿Cuál es el siguiente paso?'

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="cta-section" id="contacto">
      <h2 className="cta-title-script">Empecemos</h2>
      <p className="cta-title-main">AHORA</p>
      <p className="cta-text">{config.text}</p>

      <form className="cta-form" onSubmit={handleSubmit}>
        <div className="cta-field">
          <label htmlFor={`cta-nombre-${type}`}>Nombre</label>
          <input
            id={`cta-nombre-${type}`}
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>

        {config.showEvent && (
          <div className="cta-field">
            <label htmlFor={`cta-evento-${type}`}>Evento</label>
            <select id={`cta-evento-${type}`} name="evento" value={form.evento} onChange={handleChange}>
              <option>Graduación</option>
              <option>Bautizo</option>
              <option>Cumpleaños</option>
              <option>Cumpleaños Infantil</option>
              <option>Misa</option>
            </select>
          </div>
        )}

        <div className="cta-field">
          <label htmlFor={`cta-paquete-${type}`}>Paquete</label>
          <select id={`cta-paquete-${type}`} name="paquete" value={form.paquete} onChange={handleChange}>
            {config.packages.map((pkg) => (
              <option key={pkg}>{pkg}</option>
            ))}
          </select>
        </div>

        <div className="cta-field cta-field-full">
          <label htmlFor={`cta-mensaje-${type}`}>Mensaje</label>
          <textarea
            id={`cta-mensaje-${type}`}
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Cuéntanos los detalles de tu evento"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="cta-submit">Enviar</button>
      </form>

      <div className="cta-reminders">
        <p>¿Olvidaste algo?</p>
        <div className="cta-reminder-links">
          {config.links.map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTA

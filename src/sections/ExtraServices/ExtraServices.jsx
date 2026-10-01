import { useState } from 'react'
import './ExtraServices.css'

const services = {
  general: [
    {
      title: 'Ronda de Revisión Extra',
      price: '+30 bs.',
      text: 'Si tras la entrega final necesitas cambios adicionales, habilitamos una ronda extra de cambios.',
    },
    {
      title: 'Entrega en menos de 48 hrs.',
      price: '+40 bs.',
      text: 'Tu invitación lista en menos de 48 horas. Sin retrasos, sin preocupaciones; compromiso de entrega asegurado.',
    },
    {
      title: 'Versión Adicional de la Web',
      price: '+100 bs.',
      text: '¿Necesitas una variante? Ideal para invitaciones en otro idioma, versiones exclusivas para recepción social (sin ceremonia) o eventos con fechas/lugares distintos.',
    },
    {
      title: 'Remoción de Firma',
      price: '+200 bs.',
      text: 'MARCA BLANCA. Nuestras invitaciones incluyen una discreta firma en el pie de página. Si deseas una experiencia de marca totalmente limpia y exclusiva para tu evento, puedes solicitar su remoción.',
    },
    {
      title: 'Dominio Personalizado',
      price: '+700 bs.',
      text: 'Tu invitación con una dirección propia y elegante. Ej: (nombredelosnovios.com) Incluye la gestión y vigencia por 1 año.',
    },
  ],
  eventos: [
    {
      title: 'Añadir Itinerario',
      price: '+30 bs.',
      text: 'Añadimos el itinerario a tu evento, ya sea el que te dio el local, salón de eventos o tu propio itinerario.',
    },
    {
      title: 'Combinación de Modelos',
      price: '+30 bs.',
      text: '¿Te gustan elementos de diferentes diseños? Fusionamos elementos de los diferentes modelos para crear una estructura a tu gusto.',
    },
    {
      title: 'Ronda de Revisión Extra',
      price: '+30 bs.',
      text: 'Si tras la entrega final necesitas cambios adicionales, habilitamos una ronda extra de cambios.',
    },
    {
      title: 'Entrega en menos de 48 hrs.',
      price: '+40 bs.',
      text: 'Tu invitación lista en menos de 48 horas. Sin retrasos, sin preocupaciones; compromiso de entrega asegurado.',
    },
    {
      title: 'Remoción de Firma',
      price: '+200 bs.',
      text: 'MARCA BLANCA. Nuestras invitaciones incluyen una discreta firma en el pie de página. Si deseas una experiencia de marca totalmente limpia y exclusiva para tu evento, puedes solicitar su remoción.',
    },
  ],
}

function ExtraServices({ type = 'general' }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const list = services[type] || services.general

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="section extras" id="extra">
      <h2 className="section-title">Servicios</h2>
      <p className="section-subtitle">EXTRAS</p>

      <div className="extras-list">
        {list.map((service, index) => (
          <div
            key={service.title}
            className={`extra-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button className="extra-header" onClick={() => toggle(index)}>
              <span className="extra-marker">{activeIndex === index ? '−' : '+'}</span>
              <span className="extra-title">{service.title}</span>
              <span className="extra-price">{service.price}</span>
            </button>
            <div className={`extra-body ${activeIndex === index ? 'open' : ''}`}>
              <p>{service.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ExtraServices

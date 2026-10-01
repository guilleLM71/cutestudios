import { useState } from 'react'
import FAQItem from '../../components/FAQItem/FAQItem'
import './FAQ.css'

const faqData = {
  bodas: [
    {
      question: '¿Cuánto tiempo tarda la entrega?',
      answer: (
        <>
          <p><strong>Paquete Esmeralda:</strong> Entrega garantizada en <strong>3 días hábiles</strong>.</p>
          <p><strong>Paquete Diamante:</strong> Entrega garantizada en <strong>5 días hábiles</strong>.</p>
        </>
      ),
    },
    {
      question: '¿Cuáles son los métodos y formas de pago?',
      answer: (
        <>
          <p>Para tu seguridad y comodidad, trabajamos bajo la siguiente modalidad:</p>
          <p><strong>1. Reserva:</strong> Un adelanto de <strong>80 bs</strong> para iniciar el diseño.</p>
          <p><strong>2. Saldo:</strong> El monto restante se cancela una vez que la invitación esté totalmente terminada y a tu gusto.</p>
        </>
      ),
    },
    {
      question: '¿Puedo realizar cambios después de la entrega final?',
      answer: (
        <p>Sí, mantenemos tu invitación abierta a ediciones después de la entrega final. Cada <strong>ronda de cambios</strong> (todas las correcciones que necesites en una sola solicitud) tiene un costo de <strong>30 bs</strong>. Así aseguramos que el resultado final sea perfecto para ti.</p>
      ),
    },
    {
      question: '¿Hacen invitaciones para otros eventos?',
      answer: (
        <p>Sí, también realizamos invitaciones para XV Años, Bautizos, Graduaciones y mucho más. Puedes encontrar el menú en la parte superior de la página.</p>
      ),
    },
  ],
  xvanos: [
    {
      question: '¿Cuánto tiempo tarda la entrega?',
      answer: (
        <>
          <p><strong>Paquete Esmeralda XV:</strong> Recibe tu invitación en solo <strong>3 días hábiles</strong>.</p>
          <p><strong>Paquete Diamante XV:</strong> Entrega garantizada en <strong>5 días hábiles</strong>.</p>
        </>
      ),
    },
    {
      question: '¿Cuáles son los métodos y formas de pago?',
      answer: (
        <>
          <p>Para tu seguridad y comodidad, trabajamos bajo la siguiente modalidad:</p>
          <p><strong>1. Reserva:</strong> Un adelanto de <strong>80 bs</strong> para iniciar el diseño.</p>
          <p><strong>2. Saldo:</strong> El monto restante se cancela una vez que la invitación esté totalmente terminada y a tu gusto.</p>
        </>
      ),
    },
    {
      question: '¿Puedo realizar cambios después de la entrega final?',
      answer: (
        <p>Sí, mantenemos tu invitación abierta a ediciones después de la entrega final. Cada <strong>ronda de cambios</strong> (todas las correcciones que necesites en una sola solicitud) tiene un costo de <strong>30 bs</strong>. Así aseguramos que el resultado final sea perfecto para ti.</p>
      ),
    },
  ],
}

function FAQ({ type = 'bodas' }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const items = faqData[type] || faqData.bodas

  if (!items) return null

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="section faq" id="faq">
      <h2 className="section-title">Preguntas</h2>
      <p className="section-subtitle">FRECUENTES</p>
      <div className="faq-container">
        {items.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isActive={activeIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQ

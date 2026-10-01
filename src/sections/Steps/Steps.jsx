import StepItem from '../../components/StepItem/StepItem'
import './Steps.css'

const steps = [
  { number: 1, icon: '/images/icon-lupa.gif', title: 'Elige tu modelo\no paquete' },
  { number: 2, icon: '/images/icon-whatsapp.gif', title: 'Escríbenos\npor WhatsApp' },
  { number: 3, icon: '/images/icon-computadora.gif', title: 'Realizamos\ntu invitación' },
  { number: 4, icon: '/images/icon-compartir.gif', title: 'Compártela con\ntus invitados' },
]

function Steps() {
  return (
    <section className="section steps">
      <h2 className="section-title">Pasos a</h2>
      <p className="section-subtitle">SEGUIR</p>
      <div className="steps-grid">
        {steps.map((step) => (
          <StepItem
            key={step.number}
            number={step.number}
            icon={step.icon}
            title={step.title}
          />
        ))}
      </div>
    </section>
  )
}

export default Steps

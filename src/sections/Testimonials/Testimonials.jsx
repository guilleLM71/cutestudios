import TestimonialCard from '../../components/TestimonialCard/TestimonialCard'
import './Testimonials.css'

const testimonials = [
  { text: 'Excelente servicio. Dejan realmente muy en alto la calidad de su producto. Una paciencia y atención personalizada de primera.', author: 'Eliana Camacho' },
  { text: 'Muy buen trabajo.. atención de 1ra y sobre todo mucha calidad en la entrega de su producto.. 100% recomendado 👌', author: 'Eduardo Piérola Sejas' },
  { text: 'Desde Sucre recomiendo este servicio, confiable con una atención personalizada y cordial, sobre todo puntuales 👌👌', author: 'Beatriz Escalante' },
  { text: 'Excelente trabajo, súper bonita la invitación, súper práctica para nuestros invitados, quedó hermoso nuestra invitación, muchas gracias, súper recomendado', author: 'Marlene Lomar' },
  { text: 'Excelente trabajo, quedo muy linda la invitación mucha gracias. Recomendado 100% 🙌', author: 'Silvia Z.' },
  { text: 'Buen trabajo muy buen servicio recomendado,', author: 'David Ramirez' },
  { text: 'Excelente servicio, les recomiendo, muy atentos a los detalles y cortes en las dudas que uno tiene, a todos mis invitados les encantó las invitaciones. Sigan adelante', author: 'Juan Ariel Aspi' },
  { text: 'Muy buena atención y excelente servicio Recomendado', author: 'Mery Laura Ovando' },
  { text: 'Muy bueno recomendadisimo 100% garantizado el trabajo que realizan nos encantaron los trabajos que realizaron. 😎', author: 'Juan Carlos Flores' },
  { text: 'Excelente trabajo !!! Recomendadisimo 👏 Quedamos muy contentos con el resultado de nuestra invitación', author: 'Ortiz Andrea' },
  { text: 'Excelente servicio, se adaptan a las necesidades de sus clientes y tienen mucha paciencia. No le fallamos al elegirlos, muchísimas gracias por todo!', author: 'Gabriela Chavez' },
  { text: 'Muy buen servicio, invitaciones bien hechas 👍', author: 'Claudia Gomez' },
  { text: 'Exelente trabajo muy hermoso super recomendado calidad y puntualidad.', author: 'Alina Karim' },
  { text: 'Muy amables 100% recomendado y confiable.', author: 'Joanna Wara Nina' },
  { text: 'Excelente trabajo!!!! Quede muy feliz y contenta con el resultado de mi invitación, altamente recomendable!!! ❣️', author: 'Monica Pando' },
  { text: 'Quede de 10 con mi invitación.. Se los recomiendo', author: 'Victor Luis Martinez' },
]

function Testimonials() {
  return (
    <section className="section testimonials" id="testimonios">
      <h2 className="section-title">Testimonios</h2>
      <p className="section-subtitle">LO QUE DICEN NUESTROS CLIENTES</p>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            text={testimonial.text}
            author={testimonial.author}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonials

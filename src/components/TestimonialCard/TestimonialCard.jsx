import './TestimonialCard.css'

function TestimonialCard({ text, author }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">{text}</p>
      <p className="testimonial-author">{author}</p>
    </div>
  )
}

export default TestimonialCard

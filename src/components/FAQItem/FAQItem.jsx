import './FAQItem.css'

function FAQItem({ question, answer, isActive, onClick }) {
  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <div className="faq-question" onClick={onClick}>
        <span>{question}</span>
        <span className="faq-toggle">+</span>
      </div>
      <div className="faq-answer">{answer}</div>
    </div>
  )
}

export default FAQItem

import './StepItem.css'

function StepItem({ number, icon, title }) {
  const isImage = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'))

  return (
    <div className="step-item">
      <div className="step-number">{number}</div>
      <div className="step-icon">
        {isImage ? <img src={icon} alt="" /> : icon}
      </div>
      <h3 className="step-title">
        {typeof title === 'string' && title.includes('\n')
          ? title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)
          : title}
      </h3>
    </div>
  )
}

export default StepItem

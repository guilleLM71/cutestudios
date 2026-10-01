import './PackageCard.css'

const whatsappNumber = '59178889375'

function PackageCard({ name, description, price, tag, catalogLink, whatsappText }) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`

  const renderDescription = () => {
    if (!catalogLink) return description
    const [before, after] = description.split('{catalogo}')
    return (
      <>
        {before}
        <a href={catalogLink} className="package-catalog-link">nuestro catálogo</a>
        {after}
      </>
    )
  }

  return (
    <div className="package-card">
      <p className="package-price">{price}</p>
      <p className="package-tag">{tag}</p>
      <p className="package-label">Paquete</p>
      <h3 className="package-name">{name}</h3>
      <p className="package-desc">{renderDescription()}</p>
      <p className="package-reserve">
        Reserva solo con <strong>80</strong> bs.
      </p>
      <a href={whatsappUrl} className="package-btn" target="_blank" rel="noopener noreferrer">
        RESERVAR INVITACIÓN
      </a>
    </div>
  )
}

export default PackageCard

import { Link } from 'react-router-dom'
import './CatalogItem.css'

function CatalogItem({ name, color, image, path, external }) {
  const content = (
    <div className="catalog-item">
      <div className="catalog-img" style={{ backgroundColor: color }}>
        {image ? (
          <img src={image} alt={`Modelo ${name}`} className="catalog-actual-img" />
        ) : (
          <span className="catalog-img-text">{name}</span>
        )}
      </div>
      <div className="catalog-info">
        <h3>{name}</h3>
      </div>
    </div>
  )

  if (!path) return content

  // Las subpáginas replicadas son documentos HTML autónomos: necesitan una
  // carga completa de página, no una ruta del router de React.
  if (external) {
    return (
      <a href={path} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </a>
    )
  }

  return (
    <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
      {content}
    </Link>
  )
}

export default CatalogItem

import './ComparisonTable.css'

const tables = {
  bodas: {
    title: 'TABLA DE INFORMACIÓN',
    columns: [
      { name: 'Esmeralda', price: '490 bs.', tag: 'Plantilla' },
      { name: 'Diamante', price: '690 bs.', tag: 'Personalizado' },
    ],
    rows: [
      { label: 'Ubicación Google Maps', a: '✓', b: '✓' },
      { label: 'Cuenta regresiva', a: '✓', b: '✓' },
      { label: 'Itinerario del evento', a: '✓', b: '✓' },
      { label: 'Dress code (Código de vestimenta)', a: '✓', b: '✓' },
      { label: 'Sugerencia de regalos', a: '✓', b: '✓' },
      { label: 'Música de fondo', a: '✓', b: '✓' },
      { label: 'Galería de fotos', a: '✓', b: '✓' },
      { label: 'Envíos ilimitados', a: '✓', b: '✓' },
      { label: 'Nombre de invitado + Pases asignados', a: '✓', b: '✓', bold: true },
      { label: 'Botón para agendar evento (Google Calendar)', a: '✓', b: '✓' },
      { label: 'Botón para compartir fotos', a: '✓', b: '✓' },
      { label: 'Cambios mínimos en el diseño o combinación de modelos', a: '✓', b: 'Personalizado' },
      { label: 'Cambio de color de la plantilla', a: '✓', b: 'Personalizado' },
      { label: 'Confirmación de Asistencia (Gestor de Invitados)', a: '✓', b: '✓', bold: true },
      { label: 'Invitación en línea después del evento', a: '60 días', b: '90 días' },
      { label: 'Rondas de corrección gratuitas', a: '2', b: '5' },
      { label: 'Tiempo de Entrega', a: '3 días', b: '5 días' },
    ],
  },
  xvanos: {
    title: 'TABLA DE INFORMACIÓN',
    columns: [
      { name: 'Esmeralda XV', price: '490 bs.', tag: 'Plantilla' },
      { name: 'Diamante XV', price: '690 bs.', tag: 'Personalizado' },
    ],
    rows: [
      { label: 'Ubicación Google Maps', a: '✓', b: '✓' },
      { label: 'Cuenta regresiva', a: '✓', b: '✓' },
      { label: 'Itinerario del evento', a: '✓', b: '✓' },
      { label: 'Dress code (Código de vestimenta)', a: '✓', b: '✓' },
      { label: 'Sugerencia de regalos', a: '✓', b: '✓' },
      { label: 'Música de fondo', a: '✓', b: '✓' },
      { label: 'Galería de fotos', a: '✓', b: '✓' },
      { label: 'Envíos ilimitados', a: '✓', b: '✓' },
      { label: 'Nombre de invitado + Pases asignados', a: '✓', b: '✓', bold: true },
      { label: 'Botón para agendar evento (Google Calendar)', a: '✓', b: '✓' },
      { label: 'Botón para compartir fotos', a: '✓', b: '✓' },
      { label: 'Cambios mínimos en el diseño o combinación de modelos', a: '✓', b: 'Personalizado' },
      { label: 'Cambio de color de la plantilla', a: '✓', b: 'Personalizado' },
      { label: 'Confirmación de Asistencia (Gestor de Invitados)', a: '✓', b: '✓', bold: true },
      { label: 'Invitación en línea después del evento', a: '60 días', b: '90 días' },
      { label: 'Rondas de corrección gratuitas', a: '2', b: '5' },
      { label: 'Tiempo de Entrega', a: '3 días', b: '5 días' },
    ],
  },
  eventos: {
    title: 'TABLA COMPARATIVA',
    columns: [
      { name: 'Gemma', price: '250 bs.', tag: 'Plantilla' },
      { name: 'Singulare', price: '390 bs.', tag: 'Personalizado' },
    ],
    rows: [
      { label: 'Ubicación Google Maps', a: '✓', b: '✓' },
      { label: 'Cuenta regresiva', a: '✓', b: '✓' },
      { label: 'Música de fondo', a: '✓', b: '✓' },
      { label: 'Galería de Fotos', a: '✓', b: '✓' },
      { label: 'Envíos ilimitados', a: '✓', b: '✓' },
      { label: 'Itinerario del evento', a: 'X', b: '✓' },
      { label: 'Sugerencia de regalos', a: 'X', b: '✓' },
      { label: 'Dress code (Código de vestimenta)', a: 'X', b: '✓' },
      { label: 'Nombre de invitado + Pases asignados', a: '+ 50 bs.', b: '✓', bold: true },
      { label: 'Cambio de color', a: '+ 30 bs.', b: 'Personalizado' },
      { label: 'Tipo de confirmación de asistencia', a: 'WhatsApp', b: 'WhatsApp', bold: true },
      { label: 'Invitación en línea después del evento', a: '10 días', b: '20 días' },
      { label: 'Estilo de Diseño', a: 'Plantilla', b: 'Personalizado', bold: true },
      { label: 'Rondas de corrección gratuitas', a: '1', b: '2' },
    ],
  },
}

const whatsappNumber = '59178889375'

function ComparisonTable({ type = 'bodas' }) {
  const table = tables[type] || tables.bodas
  const reserveText = encodeURIComponent(
    'Hola, quisiera reservar una invitación digital. ¿Cuál es el siguiente paso?'
  )

  return (
    <section className="section comparison" id="tabla">
      <h2 className="section-title">Tabla de</h2>
      <p className="section-subtitle">{table.title}</p>

      <div className="comparison-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="col-feature"></th>
              {table.columns.map((col) => (
                <th key={col.name} className="col-package">
                  <span className="pkg-name">{col.name}</span>
                  <span className="pkg-price">{col.price}</span>
                  <span className="pkg-tag">{col.tag}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label}>
                <td className={`col-feature ${row.bold ? 'is-bold' : ''}`}>{row.label}</td>
                <td className={`col-value ${row.a === '✓' ? 'check' : ''} ${row.a === 'X' ? 'cross' : ''}`}>
                  {row.a}
                </td>
                <td className={`col-value ${row.b === '✓' ? 'check' : ''} ${row.b === 'X' ? 'cross' : ''}`}>
                  {row.b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="comparison-footer">
          <p className="reserve-note">
            Reserva solo con <strong>80</strong> bs.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${reserveText}`}
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            RESERVAR INVITACIÓN
          </a>
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable

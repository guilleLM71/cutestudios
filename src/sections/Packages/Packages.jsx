import PackageCard from '../../components/PackageCard/PackageCard'
import './Packages.css'

const packages = {
  bodas: [
    {
      name: 'Esmeralda',
      price: '490 bs.',
      tag: 'Plantillas',
      desc: 'Elige el modelo que más te guste de {catalogo} y nosotros lo adaptamos con los datos de tu evento.',
      catalogLink: '#catalogo',
      whatsapp: 'Hola, quisiera reservar el paquete Esmeralda para mi boda. ¿Cuál es el siguiente paso?',
    },
    {
      name: 'Diamante',
      price: '690 bs.',
      tag: 'Personalizado',
      desc: 'Realizamos tu invitación desde cero, sin plantillas, con tus ideas, tu estilo, tus colores y tu diseño. Invitación totalmente personalizada.',
      whatsapp: 'Hola, quisiera reservar el paquete Diamante para mi boda. ¿Cuál es el siguiente paso?',
    },
  ],
  xvanos: [
    {
      name: 'Esmeralda XV',
      price: '490 bs.',
      tag: 'Plantillas',
      desc: 'Elige el modelo que más te guste de {catalogo} y nosotros lo adaptamos con los datos de tu evento.',
      catalogLink: '#catalogoxv',
      whatsapp: 'Hola, quisiera reservar el paquete Esmeralda XV. ¿Cuál es el siguiente paso?',
    },
    {
      name: 'Diamante XV',
      price: '690 bs.',
      tag: 'Personalizado',
      desc: 'Realizamos tu invitación desde cero, sin plantillas, con tus ideas, tu estilo, tus colores y tu diseño. Invitación totalmente personalizada.',
      whatsapp: 'Hola, quisiera reservar el paquete Diamante XV. ¿Cuál es el siguiente paso?',
    },
  ],
  eventos: [
    {
      name: 'Gemma',
      price: '250 bs.',
      tag: 'Plantillas',
      desc: 'Elige el modelo que más te guste de {catalogo} y nosotros lo adaptamos con los datos de tu evento.',
      catalogLink: '#catalogo',
      whatsapp: 'Hola, quisiera reservar el paquete Gemma para mi evento. ¿Cuál es el siguiente paso?',
    },
    {
      name: 'Singulare',
      price: '390 bs.',
      tag: 'Personalizado',
      desc: 'Realizamos tu invitación desde cero, sin plantillas, con tus ideas, tu estilo, tus colores y tu diseño. Invitación totalmente personalizada.',
      whatsapp: 'Hola, quisiera reservar el paquete Singulare para mi evento. ¿Cuál es el siguiente paso?',
    },
  ],
}

const subtitles = {
  bodas: 'ESMERALDA Y DIAMANTE',
  xvanos: 'ESMERALDA XV Y DIAMANTE XV',
  eventos: 'GEMMA Y SINGULARE',
}

function Packages({ type = 'bodas' }) {
  const list = packages[type] || packages.bodas

  return (
    <section className="section packages" id="paquetes">
      <h2 className="section-title">Nuestros</h2>
      <p className="section-subtitle">PAQUETES</p>
      <p className="packages-lead">
        Contamos con 2 paquetes, elige el que más se adecue a tu evento
      </p>
      <p className="packages-names">{subtitles[type] || subtitles.bodas}</p>

      <div className="package-grid">
        {list.map((pkg) => (
          <PackageCard
            key={pkg.name}
            name={pkg.name}
            description={pkg.desc}
            price={pkg.price}
            tag={pkg.tag}
            catalogLink={pkg.catalogLink}
            whatsappText={pkg.whatsapp}
          />
        ))}
      </div>
    </section>
  )
}

export default Packages

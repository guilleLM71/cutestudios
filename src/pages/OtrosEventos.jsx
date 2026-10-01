import Hero from '../sections/Hero/Hero'
import EventCategories from '../sections/EventCategories/EventCategories'
import Catalog from '../sections/Catalog/Catalog'
import Packages from '../sections/Packages/Packages'
import ComparisonTable from '../sections/ComparisonTable/ComparisonTable'
import ExtraServices from '../sections/ExtraServices/ExtraServices'
import CTA from '../sections/CTA/CTA'

function OtrosEventos() {
  return (
    <main>
      <Hero
        title="DIGITALES"
        subtitle="Invitaciones"
        tagline="PARA TODO TIPO DE EVENTO"
        ctaHref="#modelosv"
        ctaText="VER MODELOS"
      />
      <EventCategories />
      <Catalog type="eventos" />
      <Packages type="eventos" />
      <ComparisonTable type="eventos" />
      <ExtraServices type="eventos" />
      <CTA type="eventos" />
    </main>
  )
}

export default OtrosEventos

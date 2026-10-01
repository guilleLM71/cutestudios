import Hero from '../sections/Hero/Hero'
import Catalog from '../sections/Catalog/Catalog'
import Packages from '../sections/Packages/Packages'
import ComparisonTable from '../sections/ComparisonTable/ComparisonTable'
import Testimonials from '../sections/Testimonials/Testimonials'
import Steps from '../sections/Steps/Steps'
import FAQ from '../sections/FAQ/FAQ'
import CTA from '../sections/CTA/CTA'

function XvAnos() {
  return (
    <main>
      <Hero
        title="AÑOS"
        subtitle="Quince"
      />
      <Catalog type="xvanos" />
      <Packages type="xvanos" />
      <ComparisonTable type="xvanos" />
      <Testimonials />
      <Steps />
      <FAQ type="xvanos" />
      <CTA type="xvanos" />
    </main>
  )
}

export default XvAnos

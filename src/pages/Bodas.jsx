import Hero from '../sections/Hero/Hero'
import Catalog from '../sections/Catalog/Catalog'
import GuestManager from '../sections/GuestManager/GuestManager'
import Packages from '../sections/Packages/Packages'
import ComparisonTable from '../sections/ComparisonTable/ComparisonTable'
import ExtraServices from '../sections/ExtraServices/ExtraServices'
import Testimonials from '../sections/Testimonials/Testimonials'
import Steps from '../sections/Steps/Steps'
import FAQ from '../sections/FAQ/FAQ'
import CTA from '../sections/CTA/CTA'

function Bodas() {
  return (
    <main>
      <Hero
        title="DIGITALES"
        subtitle="Invitaciones"
      />
      <Catalog type="bodas" />
      <GuestManager />
      <Packages type="bodas" />
      <ComparisonTable type="bodas" />
      <ExtraServices type="general" />
      <Testimonials />
      <Steps />
      <FAQ type="bodas" />
      <CTA type="bodas" />
    </main>
  )
}

export default Bodas

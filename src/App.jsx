import { useEffect } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Bodas from './pages/Bodas'
import XvAnos from './pages/XvAnos'
import OtrosEventos from './pages/OtrosEventos'
import InvitationTemplate from './pages/invitation/InvitationTemplate'
import { isMirrored, mirroredPath } from './data/mirroredModels'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

/**
 * Los modelos de bodas son documentos HTML autónomos replicados del sitio
 * original. Si el router llega a ellos (navegación interna sin recarga completa)
 * delegamos en el servidor para que se sirva la réplica y no la plantilla.
 */
function MirroredInvitation() {
  const { slug } = useParams()

  useEffect(() => {
    window.location.replace(mirroredPath(slug))
  }, [slug])

  return null
}

function InvitationRoute() {
  const { slug } = useParams()
  return isMirrored(slug) ? <MirroredInvitation /> : <InvitationTemplate slug={slug} />
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><Bodas /></MainLayout>} />
        <Route path="/mis-15" element={<MainLayout><XvAnos /></MainLayout>} />
        <Route path="/eventos" element={<MainLayout><OtrosEventos /></MainLayout>} />
        <Route path="/invitacion/:slug" element={<InvitationRoute />} />
        <Route path="/perla" element={<MirroredInvitation />} />
      </Routes>
    </>
  )
}

export default App

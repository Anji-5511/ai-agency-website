import { useCallback, useState } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import TrustedCompanies from './components/sections/TrustedCompanies'
import AICapabilities from './components/sections/AICapabilities'
import AIDemoSection from './components/sections/AIDemo'
import ServicesSection from './components/sections/Services'
import ProcessSection from './components/sections/Process'
import CTASection from './components/sections/CTA'
import Footer from './components/sections/Footer'
import ContactFormModal from './components/ContactFormModal'

function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)
  const closeContact = useCallback(() => setContactOpen(false), [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedCompanies />
        <AICapabilities />
        <AIDemoSection />
        <ServicesSection />
        <ProcessSection />
        <CTASection onOpenContact={openContact} />
      </main>
      <Footer onOpenContact={openContact} />
      <ContactFormModal open={contactOpen} onClose={closeContact} />
    </>
  )
}

export default App

import Nav from "@/components/Nav"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Services from "@/components/sections/Services"
import HowItWorks from "@/components/sections/HowItWorks"
import Work from "@/components/sections/Work"
import Pricing from "@/components/sections/Pricing"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Work />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}

import Nav from "@/components/Nav"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Services from "@/components/sections/Services"
import HowItWorks from "@/components/sections/HowItWorks"
import ScrollVelocity from "@/components/fancy/ScrollVelocity"
import Work from "@/components/sections/Work"
import Pricing from "@/components/sections/Pricing"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/Footer"
import FloatingCTA from "@/components/FloatingCTA"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <About />
      <Services />
      <HowItWorks />

      {/* Velocity marquee between sections */}
      <ScrollVelocity
        texts={["Built to their absolute limit."]}
        velocity={80}
        numCopies={8}
        className="text-[#1A1A4D]"
      />

      <Work />
      <Pricing />
      <Contact />
      <Footer />

      {/* Floating pill CTA — appears on scroll-up past hero */}
      <FloatingCTA />
    </main>
  )
}

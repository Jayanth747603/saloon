import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Services from "@/components/Services"
import Testimonials from "@/components/Testimonials"
import Gallery from "@/components/Gallery"
import BookingCTA from "@/components/BookingCTA"
import Team from "@/components/Team"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Gallery />
      <BookingCTA />
      <Team />
      <Footer />
    </main>
  )
}

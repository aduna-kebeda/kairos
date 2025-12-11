import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedVehicles } from "@/components/home/featured-vehicles"
import { WhyKairos } from "@/components/home/why-kairos"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedVehicles />
      <WhyKairos />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

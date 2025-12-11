import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-cover bg-center" />

      {/* Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Experience the <span className="text-gold">Future of Mobility?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Visit our showroom in Addis Ababa or schedule a test drive today. Our expert team is ready to help you find
            your perfect electric vehicle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/contact">
              <Button size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold text-base px-8">
                Schedule a Visit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/vehicles">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 bg-transparent"
              >
                Explore Vehicles
              </Button>
            </Link>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
            <a
              href="tel:+251911234567"
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>+251 911 234 567</span>
            </a>
            <a
              href="https://wa.me/251911234567"
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

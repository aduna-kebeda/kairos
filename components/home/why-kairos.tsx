import { Shield, Wrench, Award, Users, Clock, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Comprehensive coverage through our partnership with YouGuard, giving you complete peace of mind.",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description: "EV-trained technicians with state-of-the-art diagnostic tools and genuine spare parts.",
  },
  {
    icon: Award,
    title: "Premium Selection",
    description: "Carefully curated vehicles from BYD, Geely, and Toyota - the world's leading EV manufacturers.",
  },
  {
    icon: Users,
    title: "Family-Focused",
    description: "Vehicles selected specifically for Ethiopian families, with space, comfort, and reliability in mind.",
  },
  {
    icon: Clock,
    title: "Transparent Tracking",
    description: "Real-time order tracking from purchase to delivery, with milestone notifications at every step.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer support via WhatsApp, phone, and email whenever you need assistance.",
  },
]

export function WhyKairos() {
  return (
    <section className="py-24 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium mb-2">Why Choose Us</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">The Kairos Addis Advantage</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We're not just selling cars – we're building a community of forward-thinking Ethiopians who believe in
            sustainable, premium mobility.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:bg-white/10"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <feature.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

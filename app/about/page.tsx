import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target, Eye, Users, Award, Handshake, ArrowRight } from "lucide-react"

export const metadata = {
  title: "About Us | Kairos Addis",
  description:
    "Learn about Kairos Addis and our partnership with YouGuard to bring premium electric vehicles to Ethiopia.",
}

const leadership = [
  {
    name: "Dawit Mengistu",
    role: "CEO & Founder",
    image: "/professional-ethiopian-businessman-portrait.jpg",
    bio: "Visionary leader with 15+ years in automotive and sustainable energy sectors.",
  },
  {
    name: "Sara Tekle",
    role: "Chief Operations Officer",
    image: "/professional-ethiopian-businesswoman-portrait.jpg",
    bio: "Operations expert driving excellence in customer service and logistics.",
  },
  {
    name: "Michael Haile",
    role: "Head of Service",
    image: "/professional-ethiopian-man-portrait-mechanic.jpg",
    bio: "EV specialist with certifications from leading manufacturers.",
  },
  {
    name: "Hanna Girma",
    role: "Customer Experience Director",
    image: "/professional-ethiopian-woman-portrait.jpg",
    bio: "Dedicated to creating exceptional experiences for every customer.",
  },
]

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description: "Kairos Addis established with a vision for sustainable mobility in Ethiopia",
  },
  { year: "2021", title: "First Imports", description: "Successfully imported first batch of BYD electric vehicles" },
  {
    year: "2022",
    title: "YouGuard Partnership",
    description: "Strategic partnership with YouGuard for comprehensive warranty coverage",
  },
  { year: "2023", title: "Service Center", description: "Opened state-of-the-art EV service center in Addis Ababa" },
  { year: "2024", title: "Expansion", description: "Added Geely and Toyota to our premium vehicle portfolio" },
  { year: "2025", title: "500+ Customers", description: "Milestone of 500+ satisfied customers across Ethiopia" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 bg-navy">
        <div className="absolute inset-0 bg-[url('/modern-car-showroom-premium.jpg')] opacity-10 bg-cover bg-center" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              About Kairos Addis
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Driving Ethiopia's <span className="text-gold">Electric Future</span>
            </h1>
            <p className="text-xl text-white/70">
              We are Ethiopia's premier destination for premium electric vehicles, committed to delivering exceptional
              quality, service, and sustainability to discerning customers across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-gold" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-card-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To accelerate Ethiopia's transition to sustainable transportation by providing access to world-class
                  electric vehicles, backed by unparalleled service and comprehensive warranty coverage. We believe
                  every Ethiopian deserves the opportunity to drive the future.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-gold" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-card-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become Africa's leading electric vehicle company, transforming how Ethiopians experience mobility
                  while contributing to a cleaner, more sustainable future. We envision roads filled with zero-emission
                  vehicles and cities with cleaner air.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-gold text-gold">
                Our Story
              </Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                A Partnership Built on Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Kairos Addis was founded with a singular vision: to bring the world's finest electric vehicles to
                  Ethiopian roads. The name "Kairos" represents the perfect moment – and we believe that moment for
                  Ethiopia's electric revolution is now.
                </p>
                <p>
                  Our partnership with YouGuard, a leading warranty and service provider, ensures that every vehicle we
                  sell is backed by comprehensive 5-year coverage. This collaboration represents our commitment to not
                  just selling cars, but building lasting relationships with our customers.
                </p>
                <p>
                  Together with our manufacturing partners – BYD, Geely, and Toyota – we offer a carefully curated
                  selection of vehicles that meet the unique demands of Ethiopian roads, climate, and lifestyle.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/modern-car-dealership-showroom-interior-premium.jpg" alt="Kairos Addis Showroom" fill className="object-cover" />
              </div>
              <Card className="absolute -bottom-8 -left-8 bg-navy text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Handshake className="h-10 w-10 text-gold" />
                    <div>
                      <div className="text-2xl font-bold text-gold">YouGuard</div>
                      <div className="text-sm text-white/70">Official Warranty Partner</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              Our Journey
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card className="inline-block bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="text-gold font-bold text-lg mb-1">{milestone.year}</div>
                        <h3 className="text-white font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-white/60 text-sm">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-background" id="team">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              Leadership
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced leadership team brings together decades of expertise in automotive, technology, and
              customer service.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member) => (
              <Card key={member.name} className="bg-card border-border overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6 relative -mt-16">
                  <div className="bg-card rounded-xl p-4 shadow-lg">
                    <h3 className="font-semibold text-card-foreground">{member.name}</h3>
                    <p className="text-gold text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              Our Values
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">What Drives Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Excellence", desc: "We pursue the highest standards in everything we do" },
              { icon: Users, title: "Customer First", desc: "Your satisfaction is our ultimate measure of success" },
              { icon: Handshake, title: "Integrity", desc: "Honest, transparent dealings in every interaction" },
              { icon: Target, title: "Innovation", desc: "Embracing new technologies and better ways forward" },
            ].map((value, index) => (
              <Card key={index} className="bg-card border-border text-center">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Join the Electric Revolution?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Visit our showroom today and experience the future of mobility firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/vehicles">
              <Button size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
                Browse Vehicles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

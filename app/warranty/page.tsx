import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Shield,
  Wrench,
  Clock,
  CheckCircle,
  Battery,
  Cpu,
  Car,
  Cog,
  Calendar,
  FileText,
  Phone,
  Users,
  ArrowRight,
  Zap,
} from "lucide-react"

export const metadata = {
  title: "Warranty & Service | Kairos Addis",
  description:
    "5-year comprehensive warranty coverage through YouGuard partnership. Expert EV service center with trained technicians.",
}

const warrantyCoverage = [
  {
    icon: Battery,
    title: "Battery System",
    coverage: "8 years / 160,000 km",
    description: "Complete battery pack, cells, and thermal management system",
  },
  {
    icon: Cpu,
    title: "Electric Drivetrain",
    coverage: "5 years / 100,000 km",
    description: "Electric motor, inverter, and power electronics",
  },
  {
    icon: Car,
    title: "Vehicle Body",
    coverage: "5 years",
    description: "Structural components, paint, and corrosion protection",
  },
  {
    icon: Cog,
    title: "General Components",
    coverage: "3 years / 60,000 km",
    description: "Suspension, steering, brakes, and interior components",
  },
]

const serviceFeatures = [
  {
    icon: Users,
    title: "EV-Trained Technicians",
    desc: "Our team holds certifications from BYD, Geely, and Toyota for comprehensive EV expertise",
  },
  {
    icon: Wrench,
    title: "Advanced Diagnostics",
    desc: "State-of-the-art equipment for accurate fault detection and efficient repairs",
  },
  {
    icon: Cog,
    title: "Genuine Parts",
    desc: "We use only original manufacturer parts to maintain your vehicle's integrity",
  },
  { icon: Clock, title: "Quick Turnaround", desc: "Most services completed same-day with minimal wait times" },
]

const maintenanceSchedule = [
  { km: "10,000 km", items: ["Tire rotation", "Brake inspection", "Fluid top-up", "Multi-point inspection"] },
  {
    km: "20,000 km",
    items: ["Cabin air filter", "Brake fluid check", "Battery health check", "Suspension inspection"],
  },
  {
    km: "40,000 km",
    items: ["Coolant service", "Brake pad replacement", "Comprehensive diagnostics", "Software updates"],
  },
  { km: "80,000 km", items: ["Major service", "Battery conditioning", "Complete system check", "Alignment"] },
]

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 bg-navy">
        <div className="absolute inset-0 bg-[url('/modern-car-service-center-clean.jpg')] opacity-10 bg-cover bg-center" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-gold text-gold">
                YouGuard Partnership
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
                5-Year Comprehensive <span className="text-gold">Warranty</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Every vehicle from Kairos Addis comes with industry-leading warranty coverage through our partnership
                with YouGuard, giving you complete peace of mind on Ethiopian roads.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
                    Schedule Service
                  </Button>
                </Link>
                <Link href="#coverage">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    View Coverage
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="h-16 w-16 text-gold" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">YouGuard</h3>
                      <p className="text-white/70">Official Warranty Partner</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "5-year comprehensive coverage",
                      "Transparent claims process",
                      "Nationwide service network",
                      "No hidden fees or deductibles",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80">
                        <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-20 bg-background" id="coverage">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              Coverage
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">What's Covered</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive warranty covers all major components, ensuring your investment is protected.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyCoverage.map((item, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-1">{item.title}</h3>
                  <p className="text-gold font-medium text-sm mb-2">{item.coverage}</p>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              Simple Process
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">How Warranty Claims Work</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Report Issue", desc: "Contact us via phone, WhatsApp, or customer portal" },
              { step: "2", title: "Assessment", desc: "Our technicians diagnose the issue at our service center" },
              { step: "3", title: "Claim Filed", desc: "We submit the claim to YouGuard on your behalf" },
              { step: "4", title: "Resolution", desc: "Repairs completed with genuine parts, no cost to you" },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-gold text-navy font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                {index < 3 && <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-gold" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Center */}
      <section className="py-20 bg-navy" id="service">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-gold text-gold">
                Service Center
              </Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">State-of-the-Art EV Service</h2>
              <p className="text-white/70 mb-8">
                Our service center in Addis Ababa is equipped with the latest diagnostic tools and staffed by EV-trained
                technicians. From routine maintenance to complex repairs, we've got you covered.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {serviceFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <feature.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/60 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/modern-electric-car-service-center-workshop.jpg" alt="Kairos Addis Service Center" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              Maintenance
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Recommended Service Schedule
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow our recommended maintenance schedule to keep your EV in optimal condition.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceSchedule.map((schedule, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gold" />
                    <CardTitle className="text-gold">{schedule.km}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {schedule.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Records Info */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image src="/digital-tablet-showing-car-service-records-app.jpg" alt="Digital Service Records" fill className="object-cover" />
            </div>
            <div>
              <Badge variant="outline" className="mb-4 border-gold text-gold">
                Digital Records
              </Badge>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Complete Service History at Your Fingertips
              </h2>
              <p className="text-muted-foreground mb-6">
                Access your complete service history through our customer portal. Every maintenance visit, repair, and
                part replacement is recorded digitally and available to you 24/7.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Complete maintenance history",
                  "Parts and labor documentation",
                  "Automated service reminders",
                  "Digital + physical service logbook",
                  "Warranty claim tracking",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <FileText className="h-5 w-5 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/portal">
                <Button className="bg-gold text-navy hover:bg-gold-light">
                  Access Customer Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="h-16 w-16 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Need Service or Have Questions?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Our team is ready to help. Schedule a service appointment or reach out with any warranty questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
                <Phone className="mr-2 h-5 w-5" />
                Schedule Service
              </Button>
            </Link>
            <Link href="/portal">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Customer Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

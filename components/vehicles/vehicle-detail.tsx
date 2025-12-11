"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Gauge,
  Users,
  Battery,
  Timer,
  Car,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  Phone,
  MessageCircle,
  Shield,
  Wrench,
} from "lucide-react"
import type { Vehicle } from "@/lib/types"
import { cn } from "@/lib/utils"

interface VehicleDetailProps {
  vehicle: Vehicle
}

export function VehicleDetail({ vehicle }: VehicleDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(vehicle.colors[0])

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  const specs = [
    { icon: Zap, label: "Range", value: vehicle.range },
    { icon: Gauge, label: "0-100 km/h", value: vehicle.acceleration },
    { icon: Battery, label: "Battery", value: vehicle.batteryCapacity },
    { icon: Timer, label: "Fast Charge", value: vehicle.chargingTime },
    { icon: Users, label: "Seats", value: `${vehicle.seatingCapacity} Passengers` },
    { icon: Car, label: "Drive", value: vehicle.driveType },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/vehicles" className="hover:text-gold">
              Vehicles
            </Link>
            <span>/</span>
            <span className="text-gold">{vehicle.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy-light">
                <Image
                  src={vehicle.images[selectedImage] || "/placeholder.svg"}
                  alt={`${vehicle.name} - View ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-gold hover:text-navy transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-gold hover:text-navy transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Badge */}
                <Badge className="absolute top-4 left-4 bg-gold text-navy text-base px-4 py-1">{vehicle.brand}</Badge>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === index ? "border-gold" : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${vehicle.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="border-gold text-gold">
                  {vehicle.year} Model
                </Badge>
                {vehicle.available ? (
                  <Badge className="bg-green-600 text-white">Available Now</Badge>
                ) : (
                  <Badge variant="secondary">Coming Soon</Badge>
                )}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">{vehicle.name}</h1>
              <p className="text-xl text-white/70 mb-6">{vehicle.description}</p>

              <div className="text-4xl font-bold text-gold mb-8">{vehicle.priceDisplay}</div>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-white/70 mb-3">
                  Color: <span className="text-white">{selectedColor.name}</span>
                </h3>
                <div className="flex gap-3">
                  {vehicle.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor.name === color.name ? "border-gold scale-110" : "border-white/20",
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    Book Test Drive
                  </Button>
                </Link>
                <Link href="https://wa.me/251911234567">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Inquiry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Bar */}
      <section className="bg-navy-dark border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specs.map((spec, index) => (
              <div key={index} className="text-center">
                <spec.icon className="h-6 w-6 text-gold mx-auto mb-2" />
                <div className="text-white font-semibold">{spec.value}</div>
                <div className="text-white/50 text-sm">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="w-full max-w-xl mx-auto grid grid-cols-3 mb-12 bg-muted">
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="ethiopia">Why Ethiopia</TabsTrigger>
            </TabsList>

            <TabsContent value="highlights">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Key Highlights</h2>
                  <ul className="space-y-4">
                    {vehicle.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-4 w-4 text-gold" />
                        </div>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={vehicle.images[1] || "/placeholder.svg"}
                    alt={`${vehicle.name} interior`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <div className="grid md:grid-cols-3 gap-6">
                {vehicle.features.map((feature, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                        <Check className="h-5 w-5 text-gold" />
                      </div>
                      <h3 className="font-semibold text-card-foreground">{feature}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ethiopia">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Perfect for Ethiopian Roads</h2>
                  <p className="text-muted-foreground mb-6">
                    We've carefully selected this vehicle for its exceptional suitability to Ethiopian driving
                    conditions and lifestyle needs.
                  </p>
                  <ul className="space-y-4">
                    {vehicle.whyEthiopia.map((reason, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin className="h-4 w-4 text-gold" />
                        </div>
                        <span className="text-muted-foreground">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={vehicle.images[2] || vehicle.heroImage || "/placeholder.svg"}
                    alt={`${vehicle.name} on Ethiopian roads`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Warranty & Service CTA */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-navy text-white border-0">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 text-gold mb-6" />
                <h3 className="font-serif text-2xl font-bold mb-4">5-Year Comprehensive Warranty</h3>
                <p className="text-white/70 mb-6">
                  Every {vehicle.name} comes with our industry-leading 5-year warranty through YouGuard, covering all
                  major components and giving you complete peace of mind.
                </p>
                <Link href="/warranty">
                  <Button className="bg-gold text-navy hover:bg-gold-light">Learn About Warranty</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-navy text-white border-0">
              <CardContent className="p-8">
                <Wrench className="h-12 w-12 text-gold mb-6" />
                <h3 className="font-serif text-2xl font-bold mb-4">Expert EV Service Center</h3>
                <p className="text-white/70 mb-6">
                  Our state-of-the-art service center is staffed with EV-trained technicians and equipped with the
                  latest diagnostic tools to keep your {vehicle.name} in perfect condition.
                </p>
                <Link href="/warranty#service">
                  <Button className="bg-gold text-navy hover:bg-gold-light">View Service Options</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience the {vehicle.name}?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Visit our showroom for a test drive or contact us to learn more about making this exceptional vehicle yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold">
                Schedule a Test Drive
              </Button>
            </Link>
            <Link href="/vehicles">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                View Other Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

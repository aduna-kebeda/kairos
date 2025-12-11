"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Gauge, Users } from "lucide-react"
import { vehicles } from "@/lib/data"

export function FeaturedVehicles() {
  const featuredVehicles = vehicles.slice(0, 4)

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-gold text-gold">
            Our Collection
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Premium Electric Vehicles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of world-class electric vehicles, each chosen for their exceptional quality,
            performance, and suitability for Ethiopian roads and lifestyle.
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredVehicles.map((vehicle, index) => (
            <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
              <Card className="group overflow-hidden bg-card border-border hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={vehicle.images[0] || "/placeholder.svg"}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-gold text-navy">{vehicle.brand}</Badge>
                  {index === 0 && <Badge className="absolute top-4 right-4 bg-red text-white">Popular</Badge>}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-gold transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{vehicle.year} Model</p>
                    </div>
                    <p className="text-gold font-bold">{vehicle.priceDisplay}</p>
                  </div>

                  <div className="flex gap-6 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 text-gold" />
                      {vehicle.range}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Gauge className="h-4 w-4 text-gold" />
                      {vehicle.acceleration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-gold" />
                      {vehicle.seatingCapacity} Seats
                    </div>
                  </div>

                  <div className="flex items-center text-gold font-medium group-hover:gap-2 transition-all">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/vehicles">
            <Button
              size="lg"
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-navy bg-transparent"
            >
              View All Vehicles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

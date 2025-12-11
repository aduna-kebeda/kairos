"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play, Sparkles } from "lucide-react"
import { vehicles } from "@/lib/data"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const featuredVehicles = vehicles.slice(0, 3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredVehicles.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [featuredVehicles.length])

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Background Slides */}
      {featuredVehicles.map((vehicle, index) => (
        <div
          key={vehicle.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentSlide === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={vehicle.heroImage || "/placeholder.svg"}
            alt={vehicle.name}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm text-gold font-medium">Ethiopia's Premier EV Destination</span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Drive the Future, <span className="text-gold">Today</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/70 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Experience premium electric vehicles from BYD, Geely, and Toyota. Exceptional quality, 5-year warranty, and
            world-class service tailored for Ethiopian roads.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/vehicles">
              <Button size="lg" className="bg-gold text-navy hover:bg-gold-light font-semibold text-base px-8">
                Browse Cars
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 bg-transparent"
              >
                Book a Visit
              </Button>
            </Link>
            <Link href="/portal">
              <Button size="lg" variant="ghost" className="text-white/80 hover:text-gold font-semibold text-base">
                <Play className="mr-2 h-5 w-5" />
                Track Your Order
              </Button>
            </Link>
          </div>

          {/* Vehicle Selector Dots */}
          <div className="flex items-center gap-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex gap-2">
              {featuredVehicles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentSlide === index ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50",
                  )}
                />
              ))}
            </div>
            <span className="text-white/50 text-sm">{featuredVehicles[currentSlide].name}</span>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-8 hidden lg:flex gap-8">
          <div className="text-right">
            <div className="text-3xl font-bold text-gold">500+</div>
            <div className="text-sm text-white/50">Happy Customers</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gold">5 Years</div>
            <div className="text-sm text-white/50">Warranty Coverage</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gold">24/7</div>
            <div className="text-sm text-white/50">Support Available</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { testimonials, partners } from "@/lib/data"
import { cn } from "@/lib/utils"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium mb-2">Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by Ethiopian Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have made the switch to electric mobility with Kairos Addis.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gold/20">
                    <Image
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="h-10 w-10 text-gold/30 mb-4 mx-auto md:mx-0" />
                  <p className="text-lg text-card-foreground mb-6 italic">"{testimonials[currentIndex].content}"</p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < testimonials[currentIndex].rating ? "text-gold fill-gold" : "text-muted",
                        )}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                      {testimonials[currentIndex].company && `, ${testimonials[currentIndex].company}`}
                    </p>
                    {testimonials[currentIndex].vehicle && (
                      <p className="text-sm text-gold mt-1">Owner of {testimonials[currentIndex].vehicle}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-gold/30 text-gold hover:bg-gold hover:text-navy bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    currentIndex === index ? "bg-gold w-6" : "bg-muted-foreground/30",
                  )}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-gold/30 text-gold hover:bg-gold hover:text-navy bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="border-t border-border pt-12">
          <p className="text-center text-muted-foreground mb-8">Authorized Partner of Leading Manufacturers</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="relative h-12 w-32 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

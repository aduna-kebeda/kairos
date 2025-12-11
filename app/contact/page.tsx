"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Calendar, Car, CheckCircle } from "lucide-react"
import { vehicles } from "@/lib/data"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    vehicleInterest: "",
    preferredDate: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast.success("Message sent successfully! We'll get back to you soon.")

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      vehicleInterest: "",
      preferredDate: "",
      message: "",
    })
  }

  const contactInfo = [
    { icon: MapPin, label: "Showroom Address", value: "Bole Road, Near Edna Mall\nAddis Ababa, Ethiopia" },
    { icon: Phone, label: "Phone", value: "+251 911 234 567", href: "tel:+251911234567" },
    { icon: Mail, label: "Email", value: "info@kairosaddis.com", href: "mailto:info@kairosaddis.com" },
    { icon: Clock, label: "Business Hours", value: "Mon - Sat: 9:00 AM - 6:00 PM\nSunday: Closed" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 bg-navy">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              Get in Touch
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              Contact & <span className="text-gold">Showroom</span>
            </h1>
            <p className="text-xl text-white/70">
              Visit our showroom in Addis Ababa or reach out to schedule a test drive. Our team is here to help you find
              your perfect electric vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-10">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card border-border shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-2">{info.label}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-muted-foreground hover:text-gold transition-colors whitespace-pre-line"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Badge variant="outline" className="mb-4 border-gold text-gold">
                Book a Visit
              </Badge>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Schedule a Test Drive or Inquiry</h2>

              {isSubmitted ? (
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Thank You!</h3>
                    <p className="text-green-700 dark:text-green-300 mb-6">
                      Your message has been sent successfully. Our team will contact you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} className="bg-gold text-navy hover:bg-gold-light">
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-card border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-card border-border"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 9XX XXX XXX"
                        className="bg-card border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Inquiry Type *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="bg-card border-border">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="test-drive">Schedule Test Drive</SelectItem>
                          <SelectItem value="showroom-visit">Showroom Visit</SelectItem>
                          <SelectItem value="price-inquiry">Price Inquiry</SelectItem>
                          <SelectItem value="service">Service Appointment</SelectItem>
                          <SelectItem value="warranty">Warranty Question</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleInterest">Vehicle Interest</Label>
                      <Select
                        value={formData.vehicleInterest}
                        onValueChange={(value) => setFormData({ ...formData, vehicleInterest: value })}
                      >
                        <SelectTrigger className="bg-card border-border">
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="undecided">Not Sure Yet</SelectItem>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="bg-card border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="bg-card border-border"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gold text-navy hover:bg-gold-light font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map and WhatsApp */}
            <div className="space-y-8">
              {/* Map */}
              <div>
                <Badge variant="outline" className="mb-4 border-gold text-gold">
                  Location
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Visit Our Showroom</h2>
                <Card className="overflow-hidden border-border">
                  <div className="relative aspect-[4/3] bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5437267378147!2d38.7892!3d9.0107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzguNSJOIDM4wrA0NycyMS4xIkU!5e0!3m2!1sen!2set!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>
                  <CardContent className="p-4 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-gold" />
                      <span>Bole Road, Near Edna Mall, Addis Ababa</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Contact Options */}
              <Card className="bg-navy text-white border-0">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-4">Quick Contact</h3>
                  <p className="text-white/70 mb-6">
                    Prefer a faster response? Reach us directly via WhatsApp or phone call.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/251911234567?text=Hello%20Kairos%20Addis,%20I'm%20interested%20in%20your%20electric%20vehicles."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="h-8 w-8" />
                      <div>
                        <div className="font-semibold">WhatsApp Us</div>
                        <div className="text-sm text-white/80">Instant messaging support</div>
                      </div>
                    </a>
                    <a
                      href="tel:+251911234567"
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Phone className="h-8 w-8 text-gold" />
                      <div>
                        <div className="font-semibold">Call Us</div>
                        <div className="text-sm text-white/80">+251 911 234 567</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Showroom Features */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-card-foreground mb-4">At Our Showroom</h3>
                  <ul className="space-y-3">
                    {[
                      { icon: Car, text: "View all vehicle models" },
                      { icon: Calendar, text: "Book test drives" },
                      { icon: MessageCircle, text: "Speak with EV experts" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <item.icon className="h-5 w-5 text-gold" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

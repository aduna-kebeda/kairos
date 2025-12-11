import Link from "next/link"
import { Car, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  vehicles: [
    { name: "BYD Tang L", href: "/vehicles/byd-tang-l" },
    { name: "BYD Song Plus", href: "/vehicles/byd-song-plus" },
    { name: "Geely Galaxy E5", href: "/vehicles/geely-galaxy-e5" },
    { name: "Toyota BZ3X", href: "/vehicles/toyota-bz3x" },
    { name: "Geely Starwish", href: "/vehicles/geely-starwish" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "News & Updates", href: "/news" },
  ],
  support: [
    { name: "Warranty & Service", href: "/warranty" },
    { name: "Contact Us", href: "/contact" },
    { name: "Customer Portal", href: "/portal" },
    { name: "FAQ", href: "/faq" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold">
                <Car className="h-7 w-7 text-navy" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold">Kairos Addis</span>
                <p className="text-xs text-gold">Premium Electric Vehicles</p>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Your trusted partner for premium electric vehicles in Ethiopia. Experience the future of mobility with our
              curated selection of world-class EVs and exceptional service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-navy transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-navy transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-navy transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-navy transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Vehicles */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Vehicles</h3>
            <ul className="space-y-3">
              {footerLinks.vehicles.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a href="tel:+251911234567" className="text-white/70 hover:text-gold text-sm">
                  +251 911 234 567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a href="mailto:info@kairosaddis.com" className="text-white/70 hover:text-gold text-sm">
                  info@kairosaddis.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Kairos Addis. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/50 hover:text-gold text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-gold text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

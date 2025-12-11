"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronDown, User, Car } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Vehicles",
    href: "/vehicles",
    children: [
      { name: "All Vehicles", href: "/vehicles" },
      { name: "BYD Tang L", href: "/vehicles/byd-tang-l" },
      { name: "BYD Song Plus", href: "/vehicles/byd-song-plus" },
      { name: "Geely Galaxy E5", href: "/vehicles/geely-galaxy-e5" },
      { name: "Toyota BZ3X", href: "/vehicles/toyota-bz3x" },
      { name: "Geely Starwish", href: "/vehicles/geely-starwish" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Warranty & Service", href: "/warranty" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg" : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold">
              <Car className="h-6 w-6 text-navy" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-white">Kairos Addis</span>
              <span className="text-xs text-gold">Premium Electric Vehicles</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) =>
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                        isActive(item.href) ? "text-gold" : "text-white/80 hover:text-gold hover:bg-white/5",
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-navy-light border-navy">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link
                          href={child.href}
                          className={cn(
                            "w-full cursor-pointer",
                            pathname === child.href ? "text-gold" : "text-white/80 hover:text-gold",
                          )}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                    isActive(item.href) ? "text-gold" : "text-white/80 hover:text-gold hover:bg-white/5",
                  )}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Link href="/portal">
              <Button variant="ghost" className="text-white/80 hover:text-gold hover:bg-white/5">
                <User className="mr-2 h-4 w-4" />
                Portal
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-gold text-navy hover:bg-gold-light font-semibold">Book a Visit</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-navy border-navy-light">
              <div className="sr-only">
                <h2 id="mobile-menu-title">Mobile Navigation Menu</h2>
              </div>
              <div className="flex flex-col gap-6 pt-8">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        isActive(item.href) ? "text-gold" : "text-white/80 hover:text-gold",
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="mt-2 ml-4 flex flex-col gap-2">
                        {item.children.slice(1).map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm text-white/60 hover:text-gold"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <Link href="/portal" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-gold text-gold hover:bg-gold hover:text-navy bg-transparent"
                    >
                      Customer Portal
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-gold text-navy hover:bg-gold-light">Book a Visit</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

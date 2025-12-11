"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  Car,
  LayoutDashboard,
  Package,
  FileText,
  Wrench,
  Shield,
  MessageSquare,
  User,
  CreditCard,
  LogOut,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/portal/orders", icon: Package },
  { name: "Documents", href: "/portal/documents", icon: FileText },
  { name: "Service History", href: "/portal/service", icon: Wrench },
  { name: "Warranty", href: "/portal/warranty", icon: Shield },
  { name: "Bank Receipts", href: "/portal/receipts", icon: CreditCard },
  { name: "Messages", href: "/portal/messages", icon: MessageSquare },
  { name: "Profile", href: "/portal/profile", icon: User },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-navy border-r border-white/10">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold">
            <Car className="h-6 w-6 text-navy" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-white">Kairos Addis</span>
            <p className="text-xs text-gold">Customer Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-gold text-navy" : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          Back to Website
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

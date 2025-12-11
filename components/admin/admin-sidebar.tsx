"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Car,
  MessageSquare,
  Shield,
  FileText,
  Settings,
  Wrench,
  BarChart3,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Upload,
  UserCog,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, badge: null },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "3" },
  { name: "Customers", href: "/admin/customers", icon: Users, badge: null },
  { name: "Vehicle Catalog", href: "/admin/catalog", icon: Car, badge: null },
  { name: "Service Records", href: "/admin/service", icon: Wrench, badge: "2" },
  { name: "Warranty Claims", href: "/admin/warranty", icon: Shield, badge: "1" },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare, badge: "5" },
  { name: "Content", href: "/admin/content", icon: FileText, badge: null },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3, badge: null },
  { name: "User Management", href: "/admin/users", icon: UserCog, badge: null },
  { name: "Settings", href: "/admin/settings", icon: Settings, badge: null },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function AdminSidebar({ open, onClose, collapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-slate-900 text-slate-50 border-r border-slate-800 transform transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-20" : "lg:w-72",
          "w-72",
        )}
      >
        {/* Header - fixed height */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16 flex-shrink-0">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {!collapsed && (
              <div className="hidden lg:block">
                <span className="text-lg font-bold text-white">
                  Kairos Admin
                </span>
                <p className="text-xs text-slate-400">System Administration</p>
              </div>
            )}
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Collapse button - desktop only */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted items-center justify-center"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

            const linkContent = (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "lg:justify-center lg:px-2",
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "animate-pulse")} />
                {!collapsed && <span className="lg:block">{item.name}</span>}
                {!collapsed && item.badge && (
                  <Badge
                    className={cn(
                      "ml-auto text-xs px-2 py-0.5",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary",
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                {collapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.name}
                    {item.badge && <Badge className="ml-2">{item.badge}</Badge>}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return linkContent
          })}
        </nav>

        {/* Quick Actions - only when expanded, fixed at bottom */}
        {!collapsed && (
          <div className="p-3 border-t border-border flex-shrink-0">
            <p className="text-xs text-muted-foreground mb-2 px-3">Quick Actions</p>
            <div className="space-y-1">
              <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Documents</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Service</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer - fixed at bottom */}
        <div className="p-3 border-t border-border flex-shrink-0">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Sign Out</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}

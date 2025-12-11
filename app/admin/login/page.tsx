"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, AlertCircle, Car, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Demo admin credentials
    if (email === "admin@kairosaddis.com" && password === "admin123") {
      const user = await login(email, password)
      if (user) {
        router.push("/admin")
      } else {
        setError("Login failed. Please try again.")
      }
    } else {
      setError("Invalid admin credentials. Use admin@kairosaddis.com / admin123")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/dark-luxury-showroom.png')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Car className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-bold">Kairos Addis</span>
              <p className="text-sm text-primary-foreground/70">Admin Portal</p>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Manage Your
              <br />
              Premium Vehicle
              <br />
              Business
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Access the complete admin dashboard to manage orders, customers, inventory, and more.
            </p>
            <div className="space-y-3">
              {[
                "Real-time order tracking & management",
                "Customer relationship management",
                "Inventory & catalog control",
                "Analytics & reporting",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-primary-foreground/80">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-primary-foreground/60">2025 Kairos Addis. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Car className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <span className="text-2xl font-bold">Kairos Addis</span>
              <p className="text-sm text-muted-foreground">Admin Portal</p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kairos.com"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          <div className="p-4 bg-muted/50 rounded-xl border border-border">
            <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials</p>
            <div className="flex items-center justify-center gap-4 text-sm font-mono">
              <span className="bg-background px-2 py-1 rounded">admin@kairos.com</span>
              <span className="text-muted-foreground">/</span>
              <span className="bg-background px-2 py-1 rounded">admin123</span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

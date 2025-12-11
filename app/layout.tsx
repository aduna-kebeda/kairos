import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Kairos Addis | Premium Electric Vehicles in Ethiopia",
  description:
    "Experience the future of driving with Kairos Addis. Premium electric vehicles from BYD, Geely, and Toyota with 5-year warranty and exceptional after-sales service.",
  keywords: ["electric vehicles", "EV", "Ethiopia", "BYD", "Geely", "Toyota", "Kairos Addis", "YouGuard"],
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}

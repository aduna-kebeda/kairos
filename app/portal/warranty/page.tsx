"use client"

import { useAuth } from "@/lib/auth-context"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalHeader } from "@/components/portal/portal-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getWarrantyInfoByUserId } from "@/lib/mock-data"
import { Shield, Calendar, CheckCircle, Clock, AlertCircle, FileText, Phone } from "lucide-react"

export default function WarrantyPage() {
  const { user } = useAuth()

  if (!user) return null

  const warranty = getWarrantyInfoByUserId(user.id)

  if (!warranty) {
    return (
      <div className="flex min-h-screen bg-background">
        <PortalSidebar />
        <div className="flex-1 flex flex-col">
          <PortalHeader title="Warranty" />
          <main className="flex-1 p-6 flex items-center justify-center">
            <Card className="max-w-md bg-card border-border">
              <CardContent className="p-12 text-center">
                <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">No Warranty Information</h3>
                <p className="text-muted-foreground mb-6">
                  Warranty information will be available once your vehicle is delivered.
                </p>
                <Link href="/warranty">
                  <Button className="bg-gold text-navy hover:bg-gold-light">Learn About Our Warranty</Button>
                </Link>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  const startDate = new Date(warranty.startDate)
  const endDate = new Date(warranty.endDate)
  const today = new Date()
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const progressPercent = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100))

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col">
        <PortalHeader title="Warranty" />
        <main className="flex-1 p-6">
          {/* Warranty Status Card */}
          <Card className="mb-8 bg-navy text-white border-0">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <Badge className="bg-green-500 text-white mb-2">Active</Badge>
                    <h2 className="text-2xl font-bold">{warranty.coverageType}</h2>
                    <p className="text-white/70">VIN: {warranty.vehicleVin}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Warranty Progress</span>
                    <span className="text-gold font-medium">{daysRemaining} days remaining</span>
                  </div>
                  <Progress value={progressPercent} className="h-3 bg-white/20" />
                  <div className="flex justify-between text-xs mt-2 text-white/50">
                    <span>{startDate.toLocaleDateString()}</span>
                    <span>{endDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warranty Details */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-gold mb-4" />
                <h3 className="font-semibold text-card-foreground">Start Date</h3>
                <p className="text-muted-foreground">
                  {startDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-gold mb-4" />
                <h3 className="font-semibold text-card-foreground">Expiry Date</h3>
                <p className="text-muted-foreground">
                  {endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <CheckCircle className="h-8 w-8 text-gold mb-4" />
                <h3 className="font-semibold text-card-foreground">Total Claims</h3>
                <p className="text-muted-foreground">{warranty.claims.length} claim(s) filed</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <AlertCircle className="h-8 w-8 text-gold mb-4" />
                <h3 className="font-semibold text-card-foreground">Status</h3>
                <p className="text-green-600 font-medium">Fully Active</p>
              </CardContent>
            </Card>
          </div>

          {/* Warranty Claims */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Warranty Claims</CardTitle>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-navy bg-transparent"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  File New Claim
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {warranty.claims.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">No warranty claims filed. Your vehicle is in great shape!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {warranty.claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground">{claim.description}</h3>
                          <p className="text-sm text-muted-foreground">
                            Filed {new Date(claim.date).toLocaleDateString()}
                            {claim.resolvedAt && ` · Resolved ${new Date(claim.resolvedAt).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <Badge className={getClaimStatusColor(claim.status)}>{claim.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Need Help */}
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-8 w-8 text-gold" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Need Help with Your Warranty?</h3>
                    <p className="text-muted-foreground">Our team is ready to assist with any warranty questions.</p>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="bg-gold text-navy hover:bg-gold-light">Contact Support</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

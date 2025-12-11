"use client"

import { useAuth } from "@/lib/auth-context"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalHeader } from "@/components/portal/portal-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getOrdersByUserId, getWarrantyInfoByUserId } from "@/lib/mock-data"
import { Package, Shield, Wrench, FileText, ArrowRight, Calendar, Clock } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const orders = getOrdersByUserId(user.id)
  const warranty = getWarrantyInfoByUserId(user.id)
  const activeOrder = orders.find((o) => o.status !== "delivered")

  const warrantyDaysLeft = warranty
    ? Math.ceil((new Date(warranty.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col">
        <PortalHeader title="Dashboard" />
        <main className="flex-1 p-6">
          {/* Welcome Banner */}
          <Card className="mb-8 bg-navy text-white border-0">
            <CardContent className="p-8">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Welcome back, {user.fullName}!</h1>
              <p className="text-white/70">Here's an overview of your account and recent activity.</p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="h-8 w-8 text-gold" />
                  <Badge variant="outline" className="border-gold text-gold">
                    {orders.length}
                  </Badge>
                </div>
                <h3 className="font-semibold text-card-foreground">Total Orders</h3>
                <p className="text-sm text-muted-foreground">All time orders</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="h-8 w-8 text-gold" />
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                </div>
                <h3 className="font-semibold text-card-foreground">Warranty</h3>
                <p className="text-sm text-muted-foreground">{warrantyDaysLeft} days remaining</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Wrench className="h-8 w-8 text-gold" />
                  <Badge variant="outline">2</Badge>
                </div>
                <h3 className="font-semibold text-card-foreground">Service Records</h3>
                <p className="text-sm text-muted-foreground">Maintenance history</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="h-8 w-8 text-gold" />
                  <Badge variant="outline">{activeOrder?.documents.length || 0}</Badge>
                </div>
                <h3 className="font-semibold text-card-foreground">Documents</h3>
                <p className="text-sm text-muted-foreground">Available files</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Order Status */}
          {activeOrder && (
            <Card className="mb-8 bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-serif">Active Order</CardTitle>
                <Link href="/portal/orders">
                  <Button variant="ghost" className="text-gold hover:text-gold hover:bg-gold/10">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="bg-gold text-navy">{activeOrder.vehicle.brand}</Badge>
                      <span className="font-semibold text-card-foreground">{activeOrder.vehicle.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Order Number:</span>
                        <p className="font-medium text-card-foreground">{activeOrder.orderNumber}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Est. Arrival:</span>
                        <p className="font-medium text-card-foreground">
                          {activeOrder.estimatedArrival
                            ? new Date(activeOrder.estimatedArrival).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "TBD"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Progress */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      {["placed", "processing", "shipping", "arrival", "ready"].map((status, index) => {
                        const statusIndex = ["placed", "processing", "shipping", "arrival", "ready"].indexOf(
                          activeOrder.status,
                        )
                        const isCompleted = index <= statusIndex
                        const isCurrent = index === statusIndex
                        return (
                          <div key={status} className="flex flex-col items-center flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                isCompleted ? "bg-gold text-navy" : "bg-muted text-muted-foreground"
                              } ${isCurrent ? "ring-2 ring-gold ring-offset-2" : ""}`}
                            >
                              {index + 1}
                            </div>
                            <span className="text-xs mt-2 text-muted-foreground capitalize">{status}</span>
                          </div>
                        )
                      })}
                    </div>
                    {activeOrder.shippingTrackingUrl && activeOrder.status === "shipping" && (
                      <a
                        href={activeOrder.shippingTrackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gold hover:underline"
                      >
                        Track Shipment Live →
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/portal/service">
              <Card className="bg-card border-border hover:border-gold/50 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 text-gold mb-4" />
                  <h3 className="font-semibold text-card-foreground group-hover:text-gold transition-colors">
                    Schedule Service
                  </h3>
                  <p className="text-sm text-muted-foreground">Book your next maintenance appointment</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/portal/documents">
              <Card className="bg-card border-border hover:border-gold/50 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-gold mb-4" />
                  <h3 className="font-semibold text-card-foreground group-hover:text-gold transition-colors">
                    View Documents
                  </h3>
                  <p className="text-sm text-muted-foreground">Access your vehicle documents</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/portal/messages">
              <Card className="bg-card border-border hover:border-gold/50 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-gold mb-4" />
                  <h3 className="font-semibold text-card-foreground group-hover:text-gold transition-colors">
                    Contact Support
                  </h3>
                  <p className="text-sm text-muted-foreground">Send us a message</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

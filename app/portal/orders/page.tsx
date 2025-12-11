"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalHeader } from "@/components/portal/portal-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { getOrdersByUserId } from "@/lib/mock-data"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  MessageSquare,
  ChevronRight,
  Ship,
  MapPin,
} from "lucide-react"
import type { Order, OrderStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  placed: { label: "Order Placed", color: "bg-blue-100 text-blue-800", icon: Package },
  processing: { label: "Processing", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  shipping: { label: "Shipping", color: "bg-purple-100 text-purple-800", icon: Ship },
  customs: { label: "Customs", color: "bg-orange-100 text-orange-800", icon: FileText },
  arrival: { label: "Arrived", color: "bg-teal-100 text-teal-800", icon: MapPin },
  ready: { label: "Ready for Pickup", color: "bg-green-100 text-green-800", icon: CheckCircle },
  delivered: { label: "Delivered", color: "bg-gray-100 text-gray-800", icon: CheckCircle },
}

const statusSteps: OrderStatus[] = ["placed", "processing", "shipping", "customs", "arrival", "ready", "delivered"]

export default function OrdersPage() {
  const { user } = useAuth()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  if (!user) return null

  const orders = getOrdersByUserId(user.id)
  const activeOrders = orders.filter((o) => o.status !== "delivered")
  const completedOrders = orders.filter((o) => o.status === "delivered")

  const currentOrder = selectedOrder || orders[0]

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col">
        <PortalHeader title="My Orders" />
        <main className="flex-1 p-6">
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {activeOrders.length === 0 ? (
                <Card className="bg-card border-border">
                  <CardContent className="p-12 text-center">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">No Active Orders</h3>
                    <p className="text-muted-foreground mb-6">You don't have any active orders at the moment.</p>
                    <Link href="/vehicles">
                      <Button className="bg-gold text-navy hover:bg-gold-light">Browse Vehicles</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Order List */}
                  <div className="space-y-4">
                    {activeOrders.map((order) => (
                      <Card
                        key={order.id}
                        className={cn(
                          "bg-card border-border cursor-pointer transition-all hover:border-gold/50",
                          currentOrder?.id === order.id && "border-gold",
                        )}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={order.vehicle.images[0] || "/placeholder.svg"}
                                alt={order.vehicle.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-card-foreground">{order.vehicle.name}</h3>
                              <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
                              <Badge className={cn("mt-1", statusConfig[order.status].color)}>
                                {statusConfig[order.status].label}
                              </Badge>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Order Details */}
                  {currentOrder && (
                    <div className="lg:col-span-2 space-y-6">
                      {/* Status Progress */}
                      <Card className="bg-card border-border">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="font-serif">Order Status</CardTitle>
                            <Badge className={statusConfig[currentOrder.status].color}>
                              {statusConfig[currentOrder.status].label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {/* Progress Bar */}
                          <div className="relative mb-8">
                            <div className="flex items-center justify-between">
                              {statusSteps.slice(0, -1).map((status, index) => {
                                const currentIndex = statusSteps.indexOf(currentOrder.status)
                                const isCompleted = index <= currentIndex
                                const isCurrent = index === currentIndex
                                const StatusIcon = statusConfig[status].icon

                                return (
                                  <div key={status} className="flex flex-col items-center relative z-10">
                                    <div
                                      className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        isCompleted ? "bg-gold text-navy" : "bg-muted text-muted-foreground",
                                        isCurrent && "ring-4 ring-gold/30",
                                      )}
                                    >
                                      <StatusIcon className="h-5 w-5" />
                                    </div>
                                    <span
                                      className={cn(
                                        "text-xs mt-2 text-center max-w-16",
                                        isCompleted ? "text-foreground" : "text-muted-foreground",
                                      )}
                                    >
                                      {statusConfig[status].label}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                            {/* Progress Line */}
                            <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted -z-0">
                              <div
                                className="h-full bg-gold transition-all"
                                style={{
                                  width: `${(statusSteps.indexOf(currentOrder.status) / (statusSteps.length - 2)) * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Live Tracking Link */}
                          {currentOrder.shippingTrackingUrl && currentOrder.status === "shipping" && (
                            <a
                              href={currentOrder.shippingTrackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 p-4 rounded-lg bg-navy text-white hover:bg-navy-light transition-colors"
                            >
                              <Truck className="h-5 w-5" />
                              <span className="font-medium">Track Shipment Live</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </CardContent>
                      </Card>

                      {/* Order Info */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <Card className="bg-card border-border">
                          <CardHeader>
                            <CardTitle className="text-base">Vehicle Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-4">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                                <Image
                                  src={currentOrder.vehicle.images[0] || "/placeholder.svg"}
                                  alt={currentOrder.vehicle.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <Badge className="mb-1 bg-gold text-navy">{currentOrder.vehicle.brand}</Badge>
                                <h3 className="font-semibold text-card-foreground">{currentOrder.vehicle.name}</h3>
                                <p className="text-sm text-muted-foreground">{currentOrder.vehicle.year} Model</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-card border-border">
                          <CardHeader>
                            <CardTitle className="text-base">Order Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Order Number</span>
                              <span className="font-medium text-card-foreground">{currentOrder.orderNumber}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Order Date</span>
                              <span className="font-medium text-card-foreground">
                                {new Date(currentOrder.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Est. Arrival</span>
                              <span className="font-medium text-gold">
                                {currentOrder.estimatedArrival
                                  ? new Date(currentOrder.estimatedArrival).toLocaleDateString()
                                  : "TBD"}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Payment Info */}
                      <Card className="bg-card border-border">
                        <CardHeader>
                          <CardTitle className="text-base">Payment Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Total Amount</span>
                              <span className="font-medium text-card-foreground">
                                ETB {currentOrder.totalAmount.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Deposit Paid</span>
                              <span className="font-medium text-green-600">
                                ETB {currentOrder.depositPaid.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm pt-3 border-t border-border">
                              <span className="font-medium text-card-foreground">Balance Due</span>
                              <span className="font-bold text-gold">
                                ETB {(currentOrder.totalAmount - currentOrder.depositPaid).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Status History */}
                      <Card className="bg-card border-border">
                        <CardHeader>
                          <CardTitle className="text-base">Status History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {currentOrder.statusHistory.map((update, index) => (
                              <div key={index} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={cn(
                                      "w-3 h-3 rounded-full",
                                      index === currentOrder.statusHistory.length - 1
                                        ? "bg-gold"
                                        : "bg-muted-foreground",
                                    )}
                                  />
                                  {index < currentOrder.statusHistory.length - 1 && (
                                    <div className="w-px h-full bg-border" />
                                  )}
                                </div>
                                <div className="pb-4">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-card-foreground capitalize">
                                      {statusConfig[update.status]?.label || update.status}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(update.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                  {update.note && <p className="text-sm text-muted-foreground">{update.note}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-4">
                        <Link href="/portal/documents">
                          <Button variant="outline" className="border-border bg-transparent">
                            <FileText className="h-4 w-4 mr-2" />
                            View Documents
                          </Button>
                        </Link>
                        <Link href="/portal/messages">
                          <Button variant="outline" className="border-border bg-transparent">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Support
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {completedOrders.length === 0 ? (
                <Card className="bg-card border-border">
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">No Completed Orders</h3>
                    <p className="text-muted-foreground">Your completed orders will appear here.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedOrders.map((order) => (
                    <Card key={order.id} className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={order.vehicle.images[0] || "/placeholder.svg"}
                              alt={order.vehicle.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-card-foreground">{order.vehicle.name}</h3>
                            <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
                          </div>
                        </div>
                        <Badge className={statusConfig[order.status].color}>{statusConfig[order.status].label}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

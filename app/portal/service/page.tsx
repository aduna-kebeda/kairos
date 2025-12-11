"use client"

import { useAuth } from "@/lib/auth-context"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalHeader } from "@/components/portal/portal-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getServiceRecordsByUserId } from "@/lib/mock-data"
import { Wrench, Calendar, Clock, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"

export default function ServicePage() {
  const { user } = useAuth()

  if (!user) return null

  const serviceRecords = getServiceRecordsByUserId(user.id)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      case "repair":
        return "bg-red-100 text-red-800"
      case "inspection":
        return "bg-green-100 text-green-800"
      case "warranty":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const nextService = serviceRecords[0]

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col">
        <PortalHeader title="Service History" />
        <main className="flex-1 p-6">
          {/* Next Service Reminder */}
          {nextService?.nextServiceDate && (
            <Card className="mb-8 bg-navy text-white border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Next Service Due</h3>
                      <p className="text-white/70">
                        {new Date(nextService.nextServiceDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        or at {nextService.nextServiceMileage?.toLocaleString()} km
                      </p>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-gold text-navy hover:bg-gold-light">
                      Schedule Service
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Summary */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{serviceRecords.length}</p>
                    <p className="text-sm text-muted-foreground">Total Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">
                      {serviceRecords[0]?.date
                        ? new Date(serviceRecords[0].date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">Last Service</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">
                      {serviceRecords[0]?.mileage?.toLocaleString() || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">Current Mileage (km)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Records */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-serif">Service Records</CardTitle>
            </CardHeader>
            <CardContent>
              {serviceRecords.length === 0 ? (
                <div className="text-center py-12">
                  <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">No Service Records</h3>
                  <p className="text-muted-foreground">Your service history will appear here after your first visit.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {serviceRecords.map((record) => (
                    <div key={record.id} className="border border-border rounded-lg p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-gold" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-card-foreground">{record.description}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(record.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}{" "}
                              · {record.mileage.toLocaleString()} km
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getTypeColor(record.type)}>{record.type}</Badge>
                          <span className="font-semibold text-gold">ETB {record.totalCost.toLocaleString()}</span>
                        </div>
                      </div>

                      {record.partsUsed.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Parts Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {record.partsUsed.map((part, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {part.name} ({part.quantity}x)
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {record.notes && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Notes:</span> {record.notes}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                        Technician: {record.technicianName}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

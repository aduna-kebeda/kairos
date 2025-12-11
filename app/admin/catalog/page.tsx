"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { vehicles } from "@/lib/data"
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Car, Zap, Gauge, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [brandFilter, setBrandFilter] = useState("all")

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = brandFilter === "all" || vehicle.brand === brandFilter
    return matchesSearch && matchesBrand
  })

  const brands = [...new Set(vehicles.map((v) => v.brand))]

  const totalValue = vehicles.reduce((sum, v) => sum + v.price, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Vehicle Catalog</h1>
          <p className="text-muted-foreground">Manage your vehicle inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vehicle Name</Label>
                <Input placeholder="e.g., BYD Tang L" />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BYD">BYD</SelectItem>
                    <SelectItem value="Geely">Geely</SelectItem>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input placeholder="e.g., Tang L" />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input type="number" placeholder="2025" />
              </div>
              <div className="space-y-2">
                <Label>Price (ETB)</Label>
                <Input type="number" placeholder="2800000" />
              </div>
              <div className="space-y-2">
                <Label>Range (km)</Label>
                <Input placeholder="600 km" />
              </div>
              <div className="space-y-2">
                <Label>Battery Capacity</Label>
                <Input placeholder="108.8 kWh" />
              </div>
              <div className="space-y-2">
                <Label>Seating Capacity</Label>
                <Input type="number" placeholder="7" />
              </div>
              <div className="space-y-2">
                <Label>Drive Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select drive type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FWD">FWD</SelectItem>
                    <SelectItem value="RWD">RWD</SelectItem>
                    <SelectItem value="AWD">AWD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Acceleration (0-100km/h)</Label>
                <Input placeholder="4.6s" />
              </div>
              <div className="space-y-2 col-span-full">
                <Label>Description</Label>
                <Textarea placeholder="Vehicle description..." rows={3} />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Vehicle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vehicles.length}</p>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Zap className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{brands.length}</p>
                <p className="text-sm text-muted-foreground">Brands</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <Gauge className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vehicles.filter((v) => v.available).length}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">ETB {(totalValue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className="border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-video relative bg-muted">
              <Image
                src={vehicle.images[0] || "/placeholder.svg?height=400&width=600&query=electric car"}
                alt={vehicle.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-primary/90 text-primary-foreground">{vehicle.brand}</Badge>
              </div>
              <div className="absolute top-3 right-3">
                {vehicle.available ? (
                  <Badge className="bg-emerald-500/90 text-white">Available</Badge>
                ) : (
                  <Badge className="bg-amber-500/90 text-white">Coming Soon</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                  <p className="text-sm text-muted-foreground">{vehicle.year} Model</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedVehicle(vehicle)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Vehicle
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 bg-muted/50 rounded-lg text-center">
                  <p className="text-lg font-bold text-primary">{vehicle.range}</p>
                  <p className="text-xs text-muted-foreground">Range</p>
                </div>
                <div className="p-2 bg-muted/50 rounded-lg text-center">
                  <p className="text-lg font-bold">{vehicle.seatingCapacity}</p>
                  <p className="text-xs text-muted-foreground">Seats</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-bold text-secondary">{vehicle.priceDisplay}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setSelectedVehicle(vehicle)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vehicle Detail Dialog */}
      <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="w-5 h-5 text-primary" />
              </div>
              {selectedVehicle?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedVehicle && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="aspect-video relative rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={selectedVehicle.heroImage || selectedVehicle.images[0] || "/placeholder.svg"}
                    alt={selectedVehicle.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">{selectedVehicle.range}</p>
                    <p className="text-sm text-muted-foreground">Range</p>
                  </div>
                  <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-xl text-center">
                    <p className="text-2xl font-bold text-secondary">{selectedVehicle.acceleration}</p>
                    <p className="text-sm text-muted-foreground">0-100 km/h</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-2xl font-bold">{selectedVehicle.topSpeed}</p>
                    <p className="text-sm text-muted-foreground">Top Speed</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-2xl font-bold">{selectedVehicle.seatingCapacity}</p>
                    <p className="text-sm text-muted-foreground">Seats</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedVehicle.description}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground">Listed Price</p>
                    <p className="text-2xl font-bold text-secondary">{selectedVehicle.priceDisplay}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button>Update Price</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Brand", value: selectedVehicle.brand },
                    { label: "Model", value: selectedVehicle.model },
                    { label: "Year", value: selectedVehicle.year },
                    { label: "Range", value: selectedVehicle.range },
                    { label: "Acceleration", value: selectedVehicle.acceleration },
                    { label: "Top Speed", value: selectedVehicle.topSpeed },
                    { label: "Battery Capacity", value: selectedVehicle.batteryCapacity },
                    { label: "Charging Time", value: selectedVehicle.chargingTime },
                    { label: "Seating Capacity", value: selectedVehicle.seatingCapacity },
                    { label: "Drive Type", value: selectedVehicle.driveType },
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedVehicle.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">All Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVehicle.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="py-1.5">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Why This Car Fits Ethiopia</h4>
                  <div className="space-y-2">
                    {selectedVehicle.whyEthiopia.map((reason, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-secondary/5 border border-secondary/20 rounded-lg"
                      >
                        <span className="text-secondary font-bold">{index + 1}.</span>
                        <span className="text-sm">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedVehicle.colors.map((color) => (
                    <div key={color.name} className="p-4 bg-muted/30 rounded-xl text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-background shadow-lg"
                        style={{ backgroundColor: color.hex }}
                      />
                      <p className="font-medium">{color.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Zap, Gauge, Users, Battery, Search, SlidersHorizontal, X } from "lucide-react"
import { vehicles } from "@/lib/data"
import { cn } from "@/lib/utils"

type Brand = "all" | "BYD" | "Geely" | "Toyota"
type SortOption = "price-low" | "price-high" | "range" | "name"

export function VehicleCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<Brand>("all")
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [priceRange, setPriceRange] = useState([0, 4000000])
  const [showFilters, setShowFilters] = useState(false)

  const filteredVehicles = vehicles
    .filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesBrand = selectedBrand === "all" || vehicle.brand === selectedBrand
      const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]
      return matchesSearch && matchesBrand && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "range":
          return Number.parseInt(b.range) - Number.parseInt(a.range)
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrand("all")
    setSortBy("name")
    setPriceRange([0, 4000000])
  }

  const hasActiveFilters =
    searchQuery || selectedBrand !== "all" || sortBy !== "name" || priceRange[0] > 0 || priceRange[1] < 4000000

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="relative bg-navy pt-24 pb-16 mb-12">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1920')] opacity-10 bg-cover bg-center" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 border-gold text-gold">
            Our Collection
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Vehicle Catalog</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover premium electric vehicles designed for Ethiopian roads and lifestyle
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border"
            />
          </div>

          {/* Brand Filter */}
          <Select value={selectedBrand} onValueChange={(value) => setSelectedBrand(value as Brand)}>
            <SelectTrigger className="w-full lg:w-48 h-12 bg-card border-border">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="BYD">BYD</SelectItem>
              <SelectItem value="Geely">Geely</SelectItem>
              <SelectItem value="Toyota">Toyota</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full lg:w-48 h-12 bg-card border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="range">Longest Range</SelectItem>
            </SelectContent>
          </Select>

          {/* Toggle Filters */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn("h-12 border-border bg-transparent", showFilters && "border-gold text-gold")}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Price Range */}
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-4 block">
                    Price Range: ETB {priceRange[0].toLocaleString()} - ETB {priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={4000000}
                    step={100000}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="text-red hover:text-red hover:bg-red/10">
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing <span className="text-foreground font-medium">{filteredVehicles.length}</span> vehicles
          </p>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
                <Card className="group h-full overflow-hidden bg-card border-border hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={vehicle.images[0] || "/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-gold text-navy">{vehicle.brand}</Badge>
                    {vehicle.available ? (
                      <Badge className="absolute top-4 right-4 bg-green-600 text-white">Available</Badge>
                    ) : (
                      <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground">Coming Soon</Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground group-hover:text-gold transition-colors">
                          {vehicle.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{vehicle.year} Model</p>
                      </div>
                      <p className="text-gold font-bold text-lg">{vehicle.priceDisplay}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 text-gold" />
                        {vehicle.range}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Gauge className="h-4 w-4 text-gold" />
                        {vehicle.acceleration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-gold" />
                        {vehicle.seatingCapacity} Seats
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Battery className="h-4 w-4 text-gold" />
                        {vehicle.batteryCapacity}
                      </div>
                    </div>

                    <div className="flex items-center text-gold font-medium group-hover:gap-2 transition-all pt-4 border-t border-border">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No vehicles found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
            <Button onClick={clearFilters} className="bg-gold text-navy hover:bg-gold-light">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

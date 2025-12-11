"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockOrders } from "@/lib/mock-data"
import { vehicles } from "@/lib/data"
import { BarChart3, TrendingUp, Car, DollarSign, Users, Calendar } from "lucide-react"

export default function AdminAnalyticsPage() {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.totalAmount, 0)

  const monthlyData = [
    { month: "Jan", orders: 12, revenue: 580000 },
    { month: "Feb", orders: 15, revenue: 720000 },
    { month: "Mar", orders: 18, revenue: 890000 },
    { month: "Apr", orders: 22, revenue: 1100000 },
    { month: "May", orders: 28, revenue: 1400000 },
    { month: "Jun", orders: 25, revenue: 1250000 },
  ]

  const topVehicles = vehicles.slice(0, 5).map((v, i) => ({
    name: v.name,
    sales: 25 - i * 4,
    revenue: v.price * (25 - i * 4),
  }))

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Business performance insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(2)}M</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Car className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">+24.5%</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-10 text-sm text-muted-foreground">{data.month}</span>
                  <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-lg transition-all duration-500"
                      style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="w-24 text-sm text-right">${(data.revenue / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Vehicles */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Top Selling Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVehicles.map((vehicle, index) => (
                <div key={vehicle.name} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{vehicle.name}</p>
                    <p className="text-sm text-muted-foreground">{vehicle.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(vehicle.revenue / 1000000).toFixed(2)}M</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Distribution */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Order Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { status: "Placed", count: 8, color: "bg-yellow-500" },
              { status: "Processing", count: 12, color: "bg-blue-500" },
              { status: "Shipping", count: 15, color: "bg-purple-500" },
              { status: "Arrived", count: 6, color: "bg-orange-500" },
              { status: "Ready", count: 45, color: "bg-green-500" },
            ].map((item) => (
              <div key={item.status} className="p-4 bg-muted/30 rounded-xl text-center">
                <div className={`w-4 h-4 ${item.color} rounded-full mx-auto mb-2`} />
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-sm text-muted-foreground">{item.status}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

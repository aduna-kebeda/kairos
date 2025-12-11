"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockOrders, mockUsers, mockWarrantyClaims, mockServiceRecords } from "@/lib/mock-data"
import { vehicles } from "@/lib/data"
import {
  Car,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreHorizontal,
  Activity,
  Shield,
  Wrench,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const totalOrders = mockOrders.length
  const pendingOrders = mockOrders.filter((o) => o.status !== "ready").length
  const completedOrders = mockOrders.filter((o) => o.status === "ready").length
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.totalAmount, 0)
  const totalCustomers = mockUsers.filter((u) => u.role === "customer").length
  const pendingClaims = mockWarrantyClaims.filter((c) => c.status === "pending").length
  const scheduledServices = mockServiceRecords.filter((s) => s.status === "scheduled").length

  const recentOrders = mockOrders.slice(0, 5)
  const recentCustomers = mockUsers.filter((u) => u.role === "customer").slice(0, 4)

  const stats = [
    {
      title: "Total Revenue",
      value: `$${(totalRevenue / 1000000).toFixed(2)}M`,
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      trend: "up" as const,
      icon: ShoppingCart,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Active Customers",
      value: totalCustomers.toString(),
      change: "+15.3%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Vehicles in Stock",
      value: vehicles.length.toString(),
      change: "+2",
      trend: "up" as const,
      icon: Car,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
    },
  ]

  const statusColors: Record<string, string> = {
    placed: "bg-amber-500/20 text-amber-500 border-amber-500/30",
    processing: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    shipping: "bg-violet-500/20 text-violet-500 border-violet-500/30",
    arrival: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    ready: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>Live</span>
          </div>
          <Button asChild>
            <Link href="/admin/orders">View All Orders</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={`border-2 ${stat.borderColor} bg-gradient-to-br from-background to-muted/30 hover:shadow-lg transition-all duration-300`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                >
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xl font-bold">{pendingOrders}</p>
              <p className="text-xs text-muted-foreground">Pending Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold">{completedOrders}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10">
              <Shield className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <p className="text-xl font-bold">{pendingClaims}</p>
              <p className="text-xs text-muted-foreground">Warranty Claims</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10">
              <Wrench className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-bold">{scheduledServices}</p>
              <p className="text-xs text-muted-foreground">Services Scheduled</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="xl:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders" className="text-primary">
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Order
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium">{order.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Car className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{order.vehicleName}</p>
                            <p className="text-xs text-muted-foreground">{order.color}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${statusColors[order.status]} border capitalize text-xs`}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-semibold">${order.totalAmount.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Customers */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Recent Customers</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/customers" className="text-primary">
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="w-10 h-10 border-2 border-primary/20">
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary">{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{customer.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {mockOrders.filter((o) => o.userId === customer.id).length} orders
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {[
                { label: "Orders", icon: ShoppingCart, href: "/admin/orders", color: "text-primary" },
                { label: "Customers", icon: Users, href: "/admin/customers", color: "text-blue-500" },
                { label: "Catalog", icon: Car, href: "/admin/catalog", color: "text-secondary" },
                { label: "Warranty", icon: Shield, href: "/admin/warranty", color: "text-violet-500" },
                { label: "Service", icon: Wrench, href: "/admin/service", color: "text-orange-500" },
                { label: "Analytics", icon: TrendingUp, href: "/admin/analytics", color: "text-emerald-500" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <action.icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Order Progress */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Order Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Placed",
                  count: mockOrders.filter((o) => o.status === "placed").length,
                  total: totalOrders,
                  color: "bg-amber-500",
                },
                {
                  label: "Processing",
                  count: mockOrders.filter((o) => o.status === "processing").length,
                  total: totalOrders,
                  color: "bg-blue-500",
                },
                {
                  label: "Shipping",
                  count: mockOrders.filter((o) => o.status === "shipping").length,
                  total: totalOrders,
                  color: "bg-violet-500",
                },
                {
                  label: "Ready",
                  count: mockOrders.filter((o) => o.status === "ready").length,
                  total: totalOrders,
                  color: "bg-emerald-500",
                },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <Progress value={(item.count / item.total) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

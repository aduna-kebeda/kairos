"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockOrders, mockUsers } from "@/lib/mock-data"
import {
  Search,
  Eye,
  Edit,
  MoreHorizontal,
  Car,
  ExternalLink,
  Download,
  Plus,
  RefreshCw,
  Truck,
  Package,
  CheckCircle2,
  Trash2,
  Mail,
  Phone,
  Printer,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type OrderStatus = "placed" | "processing" | "shipping" | "arrival" | "ready"

const statusSteps: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "processing", label: "Processing", icon: RefreshCw },
  { key: "shipping", label: "Shipping", icon: Truck },
  { key: "arrival", label: "Arrived", icon: CheckCircle2 },
  { key: "ready", label: "Ready for Pickup", icon: Car },
]

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [editingOrder, setEditingOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [orders, setOrders] = useState(mockOrders)
  const [statusNote, setStatusNote] = useState("")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors: Record<string, string> = {
    placed: "bg-amber-500/20 text-amber-500 border-amber-500/30",
    processing: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    shipping: "bg-violet-500/20 text-violet-500 border-violet-500/30",
    arrival: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    ready: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
  }

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    setEditingOrder(null)
    setStatusNote("")
    toast({ title: "Status Updated", description: `Order status updated to ${newStatus}` })
  }

  const getCustomerInfo = (userId: string) => {
    return mockUsers.find((u) => u.id === userId)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((o) => o.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const handleBulkDelete = () => {
    setOrders(orders.filter((o) => !selectedOrders.includes(o.id)))
    setSelectedOrders([])
    setBulkDeleteConfirm(false)
    toast({ title: "Orders Deleted", description: `${selectedOrders.length} orders deleted` })
  }

  const handleBulkStatusUpdate = (newStatus: OrderStatus) => {
    setOrders(orders.map((o) => (selectedOrders.includes(o.id) ? { ...o, status: newStatus } : o)))
    setSelectedOrders([])
    toast({ title: "Status Updated", description: `${selectedOrders.length} orders updated to ${newStatus}` })
  }

  const handleExport = () => {
    toast({ title: "Exporting", description: "Exporting orders to CSV..." })
  }

  const orderStats = {
    all: orders.length,
    placed: orders.filter((o) => o.status === "placed").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipping: orders.filter((o) => o.status === "shipping").length,
    arrival: orders.filter((o) => o.status === "arrival").length,
    ready: orders.filter((o) => o.status === "ready").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">View and manage all customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
        <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="all" className="data-[state=active]:bg-background">
            All{" "}
            <Badge variant="secondary" className="ml-2">
              {orderStats.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="placed" className="data-[state=active]:bg-background">
            Placed{" "}
            <Badge variant="secondary" className="ml-2">
              {orderStats.placed}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="processing" className="data-[state=active]:bg-background">
            Processing{" "}
            <Badge variant="secondary" className="ml-2">
              {orderStats.processing}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="data-[state=active]:bg-background">
            Shipping{" "}
            <Badge variant="secondary" className="ml-2">
              {orderStats.shipping}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="arrival" className="data-[state=active]:bg-background">
            Arrived{" "}
            <Badge variant="secondary" className="ml-2">
              {orderStats.arrival}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="ready" className="data-[state=active]:bg-background">
            Ready{" "}
            <Badge variant="secondary" className="ml-2">
              {orderStats.ready}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search & Bulk Actions */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, vehicle, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {selectedOrders.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedOrders.length} selected</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("placed")}>Set to Placed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("processing")}>
                      Set to Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("shipping")}>
                      Set to Shipping
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("arrival")}>
                      Set to Arrived
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("ready")}>Set to Ready</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="destructive" size="sm" onClick={() => setBulkDeleteConfirm(true)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-border/50">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border bg-muted/30">
                  <th className="py-3 px-4 w-12">
                    <Checkbox
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const customer = getCustomerInfo(order.userId)
                  return (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) => handleSelectOrder(order.id, !!checked)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-mono text-sm font-medium">{order.id}</span>
                          {order.orderNumber && <p className="text-xs text-muted-foreground">{order.orderNumber}</p>}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={customer?.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {customer?.name?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{customer?.name || "Unknown"}</p>
                            <p className="text-xs text-muted-foreground">{customer?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{order.vehicleName}</p>
                            <p className="text-xs text-muted-foreground">{order.color}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground hidden lg:table-cell">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold">${order.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Paid: ${order.depositPaid.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className={`${statusColors[order.status]} border capitalize`}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingOrder(order)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="w-4 h-4 mr-2" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {customer && (
                              <>
                                <DropdownMenuItem>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Email Customer
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call Customer
                                </DropdownMenuItem>
                              </>
                            )}
                            {order.trackingLink && (
                              <DropdownMenuItem asChild>
                                <a href={order.trackingLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Track Shipment
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Details - {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-4">
                <h4 className="font-medium">Order Progress</h4>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const currentIndex = statusSteps.findIndex((s) => s.key === selectedOrder.status)
                      const isCompleted = index <= currentIndex
                      const isCurrent = index === currentIndex
                      const StepIcon = step.icon
                      return (
                        <div key={step.key} className="flex flex-col items-center flex-1 relative">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                              isCompleted
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "bg-muted text-muted-foreground"
                            } ${isCurrent ? "ring-4 ring-primary/30 scale-110" : ""}`}
                          >
                            <StepIcon className="w-5 h-5" />
                          </div>
                          <span className="text-xs mt-2 text-center font-medium">{step.label}</span>
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`absolute top-5 left-1/2 w-full h-0.5 ${isCompleted ? "bg-primary" : "bg-muted"}`}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Customer & Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const customer = getCustomerInfo(selectedOrder.userId)
                      return (
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={customer?.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {customer?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer?.name}</p>
                            <p className="text-sm text-muted-foreground">{customer?.email}</p>
                            <p className="text-sm text-muted-foreground">{customer?.phone}</p>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedOrder.vehicleName}</p>
                        <p className="text-sm text-muted-foreground">Color: {selectedOrder.color}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium">${selectedOrder.totalAmount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">Deposit Paid</p>
                  <p className="font-medium">${selectedOrder.depositPaid.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">ETA</p>
                  <p className="font-medium">
                    {selectedOrder.estimatedArrival
                      ? new Date(selectedOrder.estimatedArrival).toLocaleDateString()
                      : "TBD"}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="font-medium">Order Timeline</h4>
                <div className="relative pl-8 space-y-4">
                  {selectedOrder.timeline.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-8 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      {index < selectedOrder.timeline.length - 1 && (
                        <div className="absolute -left-6 top-4 w-0.5 h-full bg-border" />
                      )}
                      <div className="pb-4">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setEditingOrder(selectedOrder)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Invoice
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Customer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={!!editingOrder} onOpenChange={() => setEditingOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          {editingOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{editingOrder.vehicleName}</p>
                    <p className="text-sm text-muted-foreground">{editingOrder.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>New Status</Label>
                <Select
                  value={editingOrder.status}
                  onValueChange={(value) => setEditingOrder({ ...editingOrder, status: value as OrderStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusSteps.map((step) => (
                      <SelectItem key={step.key} value={step.key}>
                        {step.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Note (Optional)</Label>
                <Textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Add a note about this status update..."
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Checkbox id="notify-customer" defaultChecked />
                <Label htmlFor="notify-customer" className="text-sm cursor-pointer">
                  Notify customer about this update
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingOrder(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => editingOrder && handleUpdateStatus(editingOrder.id, editingOrder.status as OrderStatus)}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation */}
      <AlertDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedOrders.length} Orders</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedOrders.length} orders? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleBulkDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

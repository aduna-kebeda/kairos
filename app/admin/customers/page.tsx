"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockUsers, mockOrders } from "@/lib/mock-data"
import {
  Search,
  Eye,
  Mail,
  Phone,
  Car,
  MoreHorizontal,
  Plus,
  Download,
  Users,
  UserCheck,
  ShoppingBag,
  DollarSign,
  MessageSquare,
  FileText,
  Edit,
  Trash2,
  Ban,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
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
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof mockUsers)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [customers, setCustomers] = useState(mockUsers.filter((u) => u.role === "customer"))
  const [editingCustomer, setEditingCustomer] = useState<(typeof mockUsers)[0] | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  const getCustomerOrders = (userId: string) => {
    return mockOrders.filter((o) => o.userId === userId)
  }

  const getCustomerTotalSpent = (userId: string) => {
    return mockOrders.filter((o) => o.userId === userId).reduce((sum, o) => sum + o.totalAmount, 0)
  }

  const statusColors: Record<string, string> = {
    placed: "bg-amber-500/20 text-amber-500",
    processing: "bg-blue-500/20 text-blue-500",
    shipping: "bg-violet-500/20 text-violet-500",
    arrival: "bg-orange-500/20 text-orange-500",
    ready: "bg-emerald-500/20 text-emerald-500",
  }

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((c) => c.id !== customerId))
    setDeleteConfirm(null)
    toast({ title: "Customer Deleted", description: "Customer deleted successfully" })
  }

  const handleUpdateCustomer = () => {
    if (!editingCustomer) return
    setCustomers(customers.map((c) => (c.id === editingCustomer.id ? editingCustomer : c)))
    setEditingCustomer(null)
    toast({ title: "Customer Updated", description: "Customer updated successfully" })
  }

  const handleBlockCustomer = (customerId: string) => {
    toast({ title: "Customer Blocked", description: "Customer blocked successfully" })
  }

  const handleExport = () => {
    toast({ title: "Exporting", description: "Exporting customers to CSV..." })
  }

  const handleBulkEmail = () => {
    toast({ title: "Sending Email", description: `Sending email to ${selectedCustomers.length} customers...` })
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => getCustomerOrders(c.id).length > 0).length
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage customer accounts and view their activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCustomers}</p>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <UserCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCustomers}</p>
                <p className="text-sm text-muted-foreground">With Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <DollarSign className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(2)}M</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Bulk Actions */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {selectedCustomers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedCustomers.length} selected</span>
                <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                  <Mail className="w-4 h-4 mr-1" />
                  Email All
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => {
          const orders = getCustomerOrders(customer.id)
          const totalSpent = getCustomerTotalSpent(customer.id)
          return (
            <Card
              key={customer.id}
              className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCustomers([...selectedCustomers, customer.id])
                        } else {
                          setSelectedCustomers(selectedCustomers.filter((id) => id !== customer.id))
                        }
                      }}
                      className="mt-1"
                    />
                    <Avatar className="w-14 h-14 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingCustomer(customer)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleBlockCustomer(customer.id)}>
                        <Ban className="w-4 h-4 mr-2" />
                        Block Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => setDeleteConfirm(customer.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Car className="w-4 h-4" />
                      {orders.length} Order(s)
                    </div>
                    <span className="font-semibold text-primary">${totalSpent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  {customer.gender && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {customer.gender}
                    </Badge>
                  )}
                  {customer.age && (
                    <Badge variant="outline" className="text-xs">
                      Age: {customer.age}
                    </Badge>
                  )}
                  {orders.length > 0 && <Badge className="bg-emerald-500/20 text-emerald-500 text-xs">Active</Badge>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6 mt-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={selectedCustomer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                      {selectedCustomer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                    <p className="text-muted-foreground">{selectedCustomer.email}</p>
                    <p className="text-muted-foreground">{selectedCustomer.phone}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingCustomer(selectedCustomer)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/30 rounded-xl text-center">
                    <p className="text-2xl font-bold">{selectedCustomer.age || "-"}</p>
                    <p className="text-sm text-muted-foreground">Age</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl text-center">
                    <p className="text-2xl font-bold capitalize">{selectedCustomer.gender || "-"}</p>
                    <p className="text-sm text-muted-foreground">Gender</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl text-center">
                    <p className="text-2xl font-bold">{getCustomerOrders(selectedCustomer.id).length}</p>
                    <p className="text-sm text-muted-foreground">Orders</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl text-center">
                    <p className="text-2xl font-bold">
                      ${(getCustomerTotalSpent(selectedCustomer.id) / 1000).toFixed(0)}k
                    </p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </div>

                {selectedCustomer.bio && (
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-muted-foreground bg-muted/30 p-4 rounded-xl">{selectedCustomer.bio}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Admin Notes</Label>
                  <Textarea placeholder="Add internal notes about this customer..." />
                  <Button size="sm" className="mt-2">
                    Save Notes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <div className="space-y-4">
                  {getCustomerOrders(selectedCustomer.id).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No orders yet</p>
                    </div>
                  ) : (
                    getCustomerOrders(selectedCustomer.id).map((order) => (
                      <Card key={order.id} className="border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Car className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{order.vehicleName}</p>
                                <p className="text-sm text-muted-foreground">{order.id}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(order.orderDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={statusColors[order.status]}>{order.status}</Badge>
                              <p className="font-semibold mt-1">${order.totalAmount.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No documents uploaded yet</p>
                  <Button className="mt-4 bg-transparent" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={!!editingCustomer} onOpenChange={() => setEditingCustomer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editingCustomer && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={editingCustomer.age || ""}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, age: Number.parseInt(e.target.value) || undefined })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Input
                    value={editingCustomer.gender || ""}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, gender: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={editingCustomer.bio || ""}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, bio: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCustomer(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCustomer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this customer? This will also remove all associated orders and data. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteConfirm && handleDeleteCustomer(deleteConfirm)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  UserCog,
  Shield,
  Key,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
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

// Mock admin users data
const initialAdminUsers = [
  {
    id: "admin-1",
    name: "System Administrator",
    email: "admin@kairosaddis.com",
    phone: "+251 911 000 001",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-01-15T10:30:00",
    createdAt: "2023-06-01",
    avatar: null,
    permissions: ["all"],
  },
  {
    id: "admin-2",
    name: "Sales Manager",
    email: "sales@kairosaddis.com",
    phone: "+251 911 000 002",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-15T09:15:00",
    createdAt: "2023-08-15",
    avatar: null,
    permissions: ["orders", "customers", "catalog"],
  },
  {
    id: "admin-3",
    name: "Service Coordinator",
    email: "service@kairosaddis.com",
    phone: "+251 911 000 003",
    role: "staff",
    status: "active",
    lastLogin: "2024-01-14T16:45:00",
    createdAt: "2023-09-20",
    avatar: null,
    permissions: ["service", "warranty"],
  },
  {
    id: "admin-4",
    name: "Content Editor",
    email: "content@kairosaddis.com",
    phone: "+251 911 000 004",
    role: "staff",
    status: "inactive",
    lastLogin: "2024-01-10T11:00:00",
    createdAt: "2023-10-05",
    avatar: null,
    permissions: ["content", "messages"],
  },
]

const roleLabels: Record<string, { label: string; color: string }> = {
  super_admin: { label: "Super Admin", color: "bg-red-500/20 text-red-500 border-red-500/30" },
  manager: { label: "Manager", color: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
  staff: { label: "Staff", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" },
}

const permissionOptions = [
  { value: "orders", label: "Orders Management" },
  { value: "customers", label: "Customer Management" },
  { value: "catalog", label: "Vehicle Catalog" },
  { value: "service", label: "Service Records" },
  { value: "warranty", label: "Warranty Claims" },
  { value: "messages", label: "Messages" },
  { value: "content", label: "Content Management" },
  { value: "analytics", label: "Analytics" },
  { value: "settings", label: "Settings" },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialAdminUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<(typeof initialAdminUsers)[0] | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff",
    permissions: [] as string[],
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = () => {
    const user = {
      id: `admin-${Date.now()}`,
      ...newUser,
      status: "active",
      lastLogin: null,
      createdAt: new Date().toISOString().split("T")[0],
      avatar: null,
    }
    setUsers([...users, user as (typeof initialAdminUsers)[0]])
    setIsAddDialogOpen(false)
    setNewUser({ name: "", email: "", phone: "", role: "staff", permissions: [] })
    toast({ title: "User Added", description: "User added successfully" })
  }

  const handleUpdateUser = () => {
    if (!editingUser) return
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
    setEditingUser(null)
    toast({ title: "User Updated", description: "User updated successfully" })
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
    setDeleteConfirm(null)
    toast({ title: "User Deleted", description: "User deleted successfully" })
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
    toast({ title: "Status Updated", description: "User status updated" })
  }

  const handleResetPassword = (userId: string) => {
    toast({ title: "Password Reset", description: "Password reset email sent" })
  }

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    superAdmins: users.filter((u) => u.role === "super_admin").length,
    managers: users.filter((u) => u.role === "manager").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage admin users, roles, and permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Admin User</DialogTitle>
              <DialogDescription>Create a new user account with specific permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+251 9XX XXX XXX"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-muted/30 rounded-lg max-h-48 overflow-y-auto">
                  {permissionOptions.map((perm) => (
                    <label key={perm.value} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newUser.permissions.includes(perm.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewUser({ ...newUser, permissions: [...newUser.permissions, perm.value] })
                          } else {
                            setNewUser({
                              ...newUser,
                              permissions: newUser.permissions.filter((p) => p !== perm.value),
                            })
                          }
                        }}
                        className="rounded border-border"
                      />
                      {perm.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email}>
                Add User
              </Button>
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
                <UserCog className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
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
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/10">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.superAdmins}</p>
                <p className="text-sm text-muted-foreground">Super Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <UserCog className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.managers}</p>
                <p className="text-sm text-muted-foreground">Managers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-border/50">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Admin Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Permissions
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Last Login
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-primary/20">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={roleLabels[user.role]?.color}>
                        {roleLabels[user.role]?.label}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {user.permissions.includes("all") ? (
                          <Badge variant="secondary" className="text-xs">
                            All Access
                          </Badge>
                        ) : (
                          user.permissions.slice(0, 2).map((perm) => (
                            <Badge key={perm} variant="secondary" className="text-xs capitalize">
                              {perm}
                            </Badge>
                          ))
                        )}
                        {user.permissions.length > 2 && !user.permissions.includes("all") && (
                          <Badge variant="secondary" className="text-xs">
                            +{user.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground hidden lg:table-cell">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={
                          user.status === "active"
                            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {user.status === "active" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.status}
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
                          <DropdownMenuItem onClick={() => setEditingUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                            <Key className="w-4 h-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                            {user.status === "active" ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteConfirm(user.id)}
                            disabled={user.role === "super_admin"}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
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

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions</DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-muted/30 rounded-lg max-h-48 overflow-y-auto">
                  {permissionOptions.map((perm) => (
                    <label key={perm.value} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          editingUser.permissions.includes(perm.value) || editingUser.permissions.includes("all")
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditingUser({
                              ...editingUser,
                              permissions: [...editingUser.permissions.filter((p) => p !== "all"), perm.value],
                            })
                          } else {
                            setEditingUser({
                              ...editingUser,
                              permissions: editingUser.permissions.filter((p) => p !== perm.value),
                            })
                          }
                        }}
                        className="rounded border-border"
                      />
                      {perm.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm text-muted-foreground">Enable or disable this account</p>
                </div>
                <Switch
                  checked={editingUser.status === "active"}
                  onCheckedChange={(checked) =>
                    setEditingUser({ ...editingUser, status: checked ? "active" : "inactive" })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteConfirm && handleDeleteUser(deleteConfirm)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

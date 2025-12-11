"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockWarrantyClaims } from "@/lib/mock-data"
import { Search, Shield, CheckCircle, XCircle, Clock, MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AdminWarrantyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClaim, setSelectedClaim] = useState<(typeof mockWarrantyClaims)[0] | null>(null)
  const [claims, setClaims] = useState(mockWarrantyClaims)

  const filteredClaims = claims.filter(
    (claim) =>
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.vehicleVin.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-500",
    approved: "bg-green-500/20 text-green-500",
    rejected: "bg-red-500/20 text-red-500",
    "in-progress": "bg-blue-500/20 text-blue-500",
  }

  const handleUpdateStatus = (claimId: string, newStatus: string) => {
    setClaims((prev) => prev.map((claim) => (claim.id === claimId ? { ...claim, status: newStatus } : claim)))
    setSelectedClaim(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Warranty Claims</h1>
          <p className="text-muted-foreground">Review and manage warranty claims</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/10">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{claims.filter((c) => c.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{claims.filter((c) => c.status === "approved").length}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{claims.filter((c) => c.status === "in-progress").length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/10">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{claims.filter((c) => c.status === "rejected").length}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
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
              placeholder="Search by claim ID or VIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>All Claims ({filteredClaims.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Claim ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vehicle VIN</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Issue</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-4 px-4 font-mono text-sm">{claim.id}</td>
                    <td className="py-4 px-4 font-mono text-sm">{claim.vehicleVin}</td>
                    <td className="py-4 px-4">{claim.issue}</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(claim.claimDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={statusColors[claim.status]}>{claim.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedClaim(claim)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View & Update
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

      {/* Claim Detail Dialog */}
      <Dialog open={!!selectedClaim} onOpenChange={() => setSelectedClaim(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Warranty Claim Review</DialogTitle>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Claim ID</p>
                  <p className="font-mono">{selectedClaim.id}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Vehicle VIN</p>
                  <p className="font-mono">{selectedClaim.vehicleVin}</p>
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Issue Description</p>
                <p>{selectedClaim.issue}</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Current Status</p>
                <Badge className={statusColors[selectedClaim.status]}>{selectedClaim.status}</Badge>
              </div>
              <div className="space-y-2">
                <Label>Admin Notes</Label>
                <Textarea placeholder="Add notes about this claim..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent"
                  onClick={() => handleUpdateStatus(selectedClaim.id, "rejected")}
                >
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500/10 bg-transparent"
                  onClick={() => handleUpdateStatus(selectedClaim.id, "in-progress")}
                >
                  In Progress
                </Button>
                <Button onClick={() => handleUpdateStatus(selectedClaim.id, "approved")}>Approve</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

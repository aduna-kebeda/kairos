"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalHeader } from "@/components/portal/portal-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getOrdersByUserId } from "@/lib/mock-data"
import { FileText, Download, Upload, Search, File, ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function DocumentsPage() {
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<{ name: string; date: string; type: string }[]>([])

  if (!user) return null

  const orders = getOrdersByUserId(user.id)
  const allDocuments = orders.flatMap((order) =>
    order.documents.map((doc) => ({
      ...doc,
      orderNumber: order.orderNumber,
      vehicleName: order.vehicle.name,
    })),
  )

  const filteredDocuments = allDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setUploadedDocs([
        ...uploadedDocs,
        {
          name: file.name,
          date: new Date().toISOString().split("T")[0],
          type: file.type,
        },
      ])
      toast.success("Document uploaded successfully!")
      setIsUploading(false)
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return ImageIcon
    return File
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col">
        <PortalHeader title="Documents" />
        <main className="flex-1 p-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gold text-navy hover:bg-gold-light"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept=".pdf,.jpg,.png" />
          </div>

          {/* Documents from Kairos */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="font-serif">Documents from Kairos Addis</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No documents found</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {doc.vehicleName} · {doc.orderNumber} · {doc.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="hidden sm:inline-flex">
                          {doc.type.toUpperCase()}
                        </Badge>
                        <Button variant="ghost" size="icon" className="text-gold hover:bg-gold/10">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Uploaded Documents */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-serif">My Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedDocs.length === 0 ? (
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No uploaded documents</p>
                  <p className="text-sm text-muted-foreground">
                    Upload bank receipts, identification, or other required documents here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {uploadedDocs.map((doc, index) => {
                    const FileIcon = getFileIcon(doc.type)
                    return (
                      <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <FileIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium text-card-foreground">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground">Uploaded {doc.date}</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalHeader } from "@/components/portal/portal-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getOrdersByUserId } from "@/lib/mock-data"
import { CreditCard, Upload, CheckCircle, Clock, Download, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function ReceiptsPage() {
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedReceipts, setUploadedReceipts] = useState<{ name: string; amount: string; date: string }[]>([])

  if (!user) return null

  const orders = getOrdersByUserId(user.id)
  const allReceipts = orders.flatMap((order) =>
    order.bankReceipts.map((receipt) => ({
      ...receipt,
      orderNumber: order.orderNumber,
      vehicleName: order.vehicle.name,
    })),
  )

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setUploadedReceipts([
        ...uploadedReceipts,
        {
          name: file.name,
          amount: "Pending verification",
          date: new Date().toISOString().split("T")[0],
        },
      ])
      toast.success("Receipt uploaded successfully! It will be verified within 24 hours.")
      setIsUploading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col">
        <PortalHeader title="Bank Receipts" />
        <main className="flex-1 p-6">
          {/* Upload Section */}
          <Card className="mb-8 bg-navy text-white border-0">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                    <CreditCard className="h-7 w-7 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Upload Bank Receipt</h2>
                    <p className="text-white/70">Upload proof of payment for your vehicle orders</p>
                  </div>
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
                      Upload Receipt
                    </>
                  )}
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleUpload}
                  className="hidden"
                  accept=".pdf,.jpg,.png"
                />
              </div>
            </CardContent>
          </Card>

          {/* Verified Receipts */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="font-serif">Verified Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              {allReceipts.length === 0 && uploadedReceipts.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">No Receipts</h3>
                  <p className="text-muted-foreground">Upload your bank receipts to track your payments.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allReceipts.map((receipt) => (
                    <div
                      key={receipt.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground">{receipt.fileName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {receipt.vehicleName} · {receipt.orderNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-gold">ETB {receipt.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            Verified {receipt.verifiedAt ? new Date(receipt.verifiedAt).toLocaleDateString() : ""}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        <Button variant="ghost" size="icon" className="text-gold">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Pending Uploads */}
                  {uploadedReceipts.map((receipt, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground">{receipt.name}</h3>
                          <p className="text-sm text-muted-foreground">Uploaded {receipt.date}</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending Verification</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-card-foreground mb-4">Payment Instructions</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>1. Make your payment to the Kairos Addis bank account</p>
                <p>2. Take a photo or scan of your bank receipt/transfer confirmation</p>
                <p>3. Upload the receipt here for verification</p>
                <p>4. Our team will verify within 24 hours and update your order status</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

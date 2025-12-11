"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Bell, Shield, Globe, Mail, Phone, MapPin, Save } from "lucide-react"

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Business Information
              </CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Kairos Addis" />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input defaultValue="https://kairosaddis.com" />
                </div>
                <div className="space-y-2">
                  <Label>
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                  <Input defaultValue="info@kairosaddis.com" />
                </div>
                <div className="space-y-2">
                  <Label>
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </Label>
                  <Input defaultValue="+251 911 123 456" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </Label>
                <Textarea defaultValue="Bole Road, Addis Ababa, Ethiopia" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Showroom Hours</CardTitle>
              <CardDescription>Set your business operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Weekdays</Label>
                  <Input defaultValue="9:00 AM - 6:00 PM" />
                </div>
                <div className="space-y-2">
                  <Label>Weekends</Label>
                  <Input defaultValue="10:00 AM - 4:00 PM" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "New Order Notifications", description: "Get notified when a new order is placed" },
                { label: "Customer Messages", description: "Receive alerts for new customer messages" },
                { label: "Warranty Claims", description: "Get notified about new warranty claims" },
                { label: "Service Reminders", description: "Automated service reminder notifications" },
                { label: "Weekly Reports", description: "Receive weekly business summary reports" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage account security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-4 border-t border-border">
                <div className="space-y-2">
                  <Label>Change Password</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                External Integrations
              </CardTitle>
              <CardDescription>Connect third-party services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "WhatsApp Business", status: "Connected", connected: true },
                { name: "SMS Gateway", status: "Connected", connected: true },
                { name: "Email Service (SendGrid)", status: "Connected", connected: true },
                { name: "Shipping Tracker API", status: "Not Connected", connected: false },
                { name: "Payment Gateway", status: "Not Connected", connected: false },
                { name: "GPT-5.1-Codex-Max (Preview)", status: "Enabled for all clients", connected: true },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className={`text-sm ${item.connected ? "text-green-500" : "text-muted-foreground"}`}>
                      {item.status}
                    </p>
                  </div>
                  <Button variant={item.connected ? "outline" : "default"} size="sm">
                    {item.connected ? "Configure" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

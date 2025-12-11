"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalHeader } from "@/components/portal/portal-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getOrdersByUserId } from "@/lib/mock-data"
import { Send, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Message } from "@/lib/types"

export default function MessagesPage() {
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const orders = getOrdersByUserId(user?.id || "")
  const initialMessages = orders.flatMap((order) => order.messages)
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!user) return null

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderRole: "customer",
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate auto-reply
    setTimeout(() => {
      const reply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: "admin-1",
        senderRole: "admin",
        content: "Thank you for your message! Our team will respond shortly during business hours (9 AM - 6 PM EAT).",
        timestamp: new Date().toISOString(),
        read: false,
      }
      setMessages((prev) => [...prev, reply])
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col">
        <PortalHeader title="Messages" />
        <main className="flex-1 p-6 flex flex-col">
          <Card className="flex-1 flex flex-col bg-card border-border">
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gold text-navy">KA</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Kairos Addis Support</CardTitle>
                  <p className="text-sm text-muted-foreground">Usually replies within 2 hours</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">No Messages Yet</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Start a conversation with our support team. We're here to help!
                    </p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwn = message.senderRole === "customer"
                    return (
                      <div key={message.id} className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
                        <Avatar className="h-8 w-8 shrink-0">
                          {isOwn ? (
                            <>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gold text-navy text-xs">
                                {user.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-navy text-white text-xs">KA</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div className={cn("max-w-[70%]", isOwn && "text-right")}>
                          <div
                            className={cn(
                              "inline-block p-3 rounded-2xl",
                              isOwn ? "bg-gold text-navy rounded-tr-none" : "bg-muted rounded-tl-none",
                            )}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-4 border-t border-border">
                <div className="flex gap-3">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-background"
                  />
                  <Button type="submit" className="bg-gold text-navy hover:bg-gold-light" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

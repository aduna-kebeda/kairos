"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockMessages, mockUsers } from "@/lib/mock-data"
import { Search, Send, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AdminMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("user-1")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const customers = mockUsers.filter((u) => u.role === "customer")

  const getConversationMessages = (userId: string) => {
    return messages.filter((m) => m.userId === userId)
  }

  const getUnreadCount = (userId: string) => {
    return messages.filter((m) => m.userId === userId && !m.read && m.sender === "customer").length
  }

  const getUser = (userId: string) => {
    return customers.find((c) => c.id === userId)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg = {
      id: `msg-${Date.now()}`,
      userId: selectedConversation,
      sender: "admin" as const,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversations List */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-380px)]">
              {customers.map((customer) => {
                const unread = getUnreadCount(customer.id)
                const lastMessage = getConversationMessages(customer.id).slice(-1)[0]
                return (
                  <button
                    key={customer.id}
                    onClick={() => setSelectedConversation(customer.id)}
                    className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/50 ${
                      selectedConversation === customer.id ? "bg-muted/50" : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{customer.name}</span>
                        {unread > 0 && <Badge className="bg-primary text-primary-foreground text-xs">{unread}</Badge>}
                      </div>
                      {lastMessage && <p className="text-sm text-muted-foreground truncate">{lastMessage.content}</p>}
                    </div>
                  </button>
                )
              })}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 border-border/50 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={getUser(selectedConversation)?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUser(selectedConversation)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{getUser(selectedConversation)?.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{getUser(selectedConversation)?.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {getConversationMessages(selectedConversation).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-xl ${
                            message.sender === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

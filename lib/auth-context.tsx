"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<User | null>
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: "user-1",
    email: "demo@kairosaddis.com",
    password: "demo123",
    username: "demo_user",
    fullName: "Yohannes Tadesse",
    phone: "+251 911 234 567",
    avatar: "/professional-ethiopian-businessman-portrait.jpg",
    age: 45,
    sex: "male",
    address: "Bole Road",
    city: "Addis Ababa",
    createdAt: "2024-01-15",
    role: "customer",
  },
  {
    id: "admin-1",
    email: "admin@kairosaddis.com",
    password: "admin123",
    username: "admin",
    fullName: "Admin User",
    phone: "+251 911 000 000",
    avatar: "/professional-ethiopian-woman-portrait.jpg",
    age: 35,
    sex: "female",
    address: "Headquarters",
    city: "Addis Ababa",
    createdAt: "2023-01-01",
    role: "admin",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem("kairos_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("kairos_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User | null> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("kairos_user", JSON.stringify(userWithoutPassword))
      return userWithoutPassword
    }
    return null
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email || "",
      username: userData.username || userData.email?.split("@")[0] || "",
      fullName: userData.fullName || "",
      phone: userData.phone || "",
      avatar: userData.avatar,
      age: userData.age,
      sex: userData.sex,
      address: userData.address,
      city: userData.city,
      createdAt: new Date().toISOString().split("T")[0],
      role: "customer",
    }

    setUser(newUser)
    localStorage.setItem("kairos_user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("kairos_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("kairos_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

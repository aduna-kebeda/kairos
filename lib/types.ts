export interface Vehicle {
  id: string
  name: string
  brand: "BYD" | "Geely" | "Toyota"
  model: string
  year: number
  price: number
  priceDisplay: string
  images: string[]
  heroImage: string
  range: string
  acceleration: string
  topSpeed: string
  batteryCapacity: string
  chargingTime: string
  seatingCapacity: number
  driveType: string
  highlights: string[]
  whyEthiopia: string[]
  colors: { name: string; hex: string }[]
  features: string[]
  description: string
  available: boolean
}

export interface User {
  id: string
  email: string
  username: string
  fullName: string
  phone: string
  avatar?: string
  age?: number
  sex?: "male" | "female" | "other"
  address?: string
  city?: string
  createdAt: string
  role: "customer" | "admin"
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  vehicleId: string
  vehicle: Vehicle
  status: OrderStatus
  statusHistory: StatusUpdate[]
  shippingTrackingUrl?: string
  totalAmount: number
  depositPaid: number
  documents: Document[]
  bankReceipts: BankReceipt[]
  messages: Message[]
  createdAt: string
  updatedAt: string
  estimatedArrival?: string
}

export type OrderStatus = "placed" | "processing" | "shipping" | "customs" | "arrival" | "ready" | "delivered"

export interface StatusUpdate {
  status: OrderStatus
  timestamp: string
  note?: string
  updatedBy?: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
  uploadedBy: "customer" | "admin"
}

export interface BankReceipt {
  id: string
  fileName: string
  url: string
  amount: number
  uploadedAt: string
  verified: boolean
  verifiedAt?: string
}

export interface Message {
  id: string
  senderId: string
  senderRole: "customer" | "admin"
  content: string
  timestamp: string
  read: boolean
}

export interface ServiceRecord {
  id: string
  vehicleVin: string
  userId: string
  type: "maintenance" | "repair" | "inspection" | "warranty"
  date: string
  mileage: number
  description: string
  partsUsed: { name: string; quantity: number; cost: number }[]
  laborCost: number
  totalCost: number
  technicianName: string
  notes?: string
  nextServiceDate?: string
  nextServiceMileage?: number
}

export interface WarrantyInfo {
  vehicleVin: string
  userId: string
  startDate: string
  endDate: string
  coverageType: string
  claims: WarrantyClaim[]
}

export interface WarrantyClaim {
  id: string
  date: string
  description: string
  status: "pending" | "approved" | "rejected" | "completed"
  approvedAt?: string
  resolvedAt?: string
  cost?: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  avatar: string
  vehicle?: string
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: "ev-benefits" | "charging" | "model-highlights" | "company-news" | "lifestyle"
  author: string
  publishedAt: string
  readTime: number
}

import type { Order, ServiceRecord, WarrantyInfo } from "./types"
import { vehicles } from "./data"

export interface MockUser {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
  phone: string
  avatar?: string
  age?: number
  gender?: string
  bio?: string
}

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    email: "customer@demo.com",
    name: "Dawit Tadesse",
    role: "customer",
    phone: "+251 911 234 567",
    avatar: "/ethiopian-man-professional.jpg",
    age: 35,
    gender: "male",
    bio: "Business owner and EV enthusiast from Addis Ababa.",
  },
  {
    id: "user-2",
    email: "sara@demo.com",
    name: "Sara Bekele",
    role: "customer",
    phone: "+251 922 345 678",
    avatar: "/ethiopian-woman-professional.jpg",
    age: 29,
    gender: "female",
    bio: "Software engineer passionate about sustainable transportation.",
  },
  {
    id: "user-3",
    email: "yonas@demo.com",
    name: "Yonas Mekonnen",
    role: "customer",
    phone: "+251 933 456 789",
    avatar: "/ethiopian-man-businessman.jpg",
    age: 42,
    gender: "male",
    bio: "Real estate developer looking for luxury EVs.",
  },
  {
    id: "admin-1",
    email: "admin@kairos.com",
    name: "Admin User",
    role: "admin",
    phone: "+251 911 000 000",
  },
]

export const mockOrders: (Order & {
  vehicleName: string
  color: string
  timeline: { status: string; description: string; date: string }[]
})[] = [
  {
    id: "ORD-2025-001",
    orderNumber: "KA-2025-00147",
    userId: "user-1",
    vehicleId: "byd-tang-l",
    vehicle: vehicles[0],
    vehicleName: "BYD Tang L",
    color: "Pearl White",
    status: "shipping",
    statusHistory: [
      { status: "placed", timestamp: "2025-01-05T10:30:00Z", note: "Order confirmed" },
      { status: "processing", timestamp: "2025-01-07T14:00:00Z", note: "Payment verified" },
      { status: "shipping", timestamp: "2025-01-15T09:00:00Z", note: "Vehicle shipped" },
    ],
    timeline: [
      { status: "Order Placed", description: "Order confirmed and payment received", date: "2025-01-05" },
      { status: "Processing", description: "Documents verified and approved", date: "2025-01-07" },
      { status: "Shipping", description: "Vehicle en route via sea freight", date: "2025-01-15" },
    ],
    shippingTrackingUrl: "https://www.searates.com/container/tracking/",
    trackingLink: "https://www.searates.com/container/tracking/",
    totalAmount: 68000,
    orderDate: "2025-01-05",
    depositPaid: 34000,
    documents: [],
    bankReceipts: [],
    messages: [],
    createdAt: "2025-01-05",
    updatedAt: "2025-01-15",
    estimatedArrival: "2025-02-15",
  },
  {
    id: "ORD-2025-002",
    orderNumber: "KA-2025-00148",
    userId: "user-2",
    vehicleId: "byd-song-plus",
    vehicle: vehicles[1],
    vehicleName: "BYD Song Plus",
    color: "Arctic Blue",
    status: "processing",
    statusHistory: [
      { status: "placed", timestamp: "2025-01-10T14:00:00Z", note: "Order confirmed" },
      { status: "processing", timestamp: "2025-01-12T09:00:00Z", note: "Processing documents" },
    ],
    timeline: [
      { status: "Order Placed", description: "Order confirmed", date: "2025-01-10" },
      { status: "Processing", description: "Preparing shipping documents", date: "2025-01-12" },
    ],
    totalAmount: 52000,
    orderDate: "2025-01-10",
    depositPaid: 26000,
    documents: [],
    bankReceipts: [],
    messages: [],
    createdAt: "2025-01-10",
    updatedAt: "2025-01-12",
    estimatedArrival: "2025-03-01",
  },
  {
    id: "ORD-2025-003",
    orderNumber: "KA-2025-00149",
    userId: "user-3",
    vehicleId: "geely-galaxy-e5",
    vehicle: vehicles[2],
    vehicleName: "Geely Galaxy E5",
    color: "Midnight Black",
    status: "ready",
    statusHistory: [
      { status: "placed", timestamp: "2024-11-01T10:00:00Z", note: "Order confirmed" },
      { status: "processing", timestamp: "2024-11-05T09:00:00Z", note: "Processing" },
      { status: "shipping", timestamp: "2024-11-15T09:00:00Z", note: "Shipped" },
      { status: "arrival", timestamp: "2024-12-20T09:00:00Z", note: "Arrived at port" },
      { status: "ready", timestamp: "2024-12-25T09:00:00Z", note: "Ready for pickup" },
    ],
    timeline: [
      { status: "Order Placed", description: "Order confirmed", date: "2024-11-01" },
      { status: "Processing", description: "Documents approved", date: "2024-11-05" },
      { status: "Shipping", description: "Vehicle shipped", date: "2024-11-15" },
      { status: "Arrived", description: "Arrived at Djibouti port", date: "2024-12-20" },
      { status: "Ready", description: "Ready for pickup at showroom", date: "2024-12-25" },
    ],
    totalAmount: 48000,
    orderDate: "2024-11-01",
    depositPaid: 48000,
    documents: [],
    bankReceipts: [],
    messages: [],
    createdAt: "2024-11-01",
    updatedAt: "2024-12-25",
  },
]

export const mockServiceRecords: (ServiceRecord & {
  serviceType: string
  technician: string
  notes: string
  partsUsed: string[]
  status: string
})[] = [
  {
    id: "SVC-001",
    vehicleVin: "LSGJA52U1KF123456",
    userId: "user-1",
    type: "maintenance",
    serviceType: "Routine Maintenance",
    date: "2025-01-10",
    mileage: 15000,
    description: "Regular 15,000 km service",
    partsUsed: ["Cabin Air Filter", "Brake Fluid"],
    laborCost: 3000,
    totalCost: 7300,
    technicianName: "Abebe Kebede",
    technician: "Abebe Kebede",
    notes: "All systems checked. Battery health at 98%.",
    status: "completed",
    nextServiceDate: "2025-06-15",
    nextServiceMileage: 30000,
  },
  {
    id: "SVC-002",
    vehicleVin: "LSGJA52U1KF789012",
    userId: "user-2",
    type: "repair",
    serviceType: "Battery Inspection",
    date: "2025-01-15",
    mileage: 8000,
    description: "Battery health check and calibration",
    partsUsed: [],
    laborCost: 1500,
    totalCost: 1500,
    technicianName: "Michael Haile",
    technician: "Michael Haile",
    notes: "Battery performing optimally at 99% health.",
    status: "completed",
    nextServiceDate: "2025-07-15",
    nextServiceMileage: 20000,
  },
  {
    id: "SVC-003",
    vehicleVin: "LSGJA52U1KF345678",
    userId: "user-3",
    type: "inspection",
    serviceType: "Pre-Delivery Inspection",
    date: "2025-01-20",
    mileage: 50,
    description: "Full vehicle inspection before customer pickup",
    partsUsed: [],
    laborCost: 0,
    totalCost: 0,
    technicianName: "Solomon Getachew",
    technician: "Solomon Getachew",
    notes: "Vehicle ready for delivery.",
    status: "scheduled",
    nextServiceDate: "2025-07-20",
    nextServiceMileage: 15000,
  },
]

export const mockWarrantyClaims = [
  {
    id: "WC-001",
    vehicleVin: "LSGJA52U1KF123456",
    userId: "user-1",
    issue: "Infotainment system software glitch",
    claimDate: "2025-01-08",
    status: "approved",
  },
  {
    id: "WC-002",
    vehicleVin: "LSGJA52U1KF789012",
    userId: "user-2",
    issue: "Minor paint defect on rear bumper",
    claimDate: "2025-01-12",
    status: "pending",
  },
  {
    id: "WC-003",
    vehicleVin: "LSGJA52U1KF345678",
    userId: "user-3",
    issue: "Door seal replacement needed",
    claimDate: "2025-01-05",
    status: "in-progress",
  },
]

export const mockMessages = [
  {
    id: "msg-1",
    userId: "user-1",
    sender: "customer" as const,
    content: "Hello, I wanted to check on my order status.",
    timestamp: "2025-01-15T10:00:00Z",
    read: true,
  },
  {
    id: "msg-2",
    userId: "user-1",
    sender: "admin" as const,
    content: "Hi Dawit! Your BYD Tang L is currently in transit. Expected arrival is mid-February.",
    timestamp: "2025-01-15T10:30:00Z",
    read: true,
  },
  {
    id: "msg-3",
    userId: "user-1",
    sender: "customer" as const,
    content: "Great, thank you for the update!",
    timestamp: "2025-01-15T11:00:00Z",
    read: false,
  },
  {
    id: "msg-4",
    userId: "user-2",
    sender: "customer" as const,
    content: "Can I change my vehicle color preference?",
    timestamp: "2025-01-14T09:00:00Z",
    read: true,
  },
  {
    id: "msg-5",
    userId: "user-2",
    sender: "admin" as const,
    content: "Yes, as long as we haven't finalized the shipping. What color would you prefer?",
    timestamp: "2025-01-14T09:30:00Z",
    read: true,
  },
]

export const mockWarrantyInfo: WarrantyInfo = {
  vehicleVin: "LSGJA52U1KF123456",
  userId: "user-1",
  startDate: "2024-06-01",
  endDate: "2029-06-01",
  coverageType: "Comprehensive - YouGuard Premium",
  claims: [
    {
      id: "claim-1",
      date: "2024-10-20",
      description: "Software update issue - infotainment system",
      status: "completed",
      approvedAt: "2024-10-21",
      resolvedAt: "2024-10-22",
      cost: 0,
    },
  ],
}

export function getOrdersByUserId(userId: string): Order[] {
  return mockOrders.filter((order) => order.userId === userId)
}

export function getServiceRecordsByUserId(userId: string): ServiceRecord[] {
  return mockServiceRecords.filter((record) => record.userId === userId)
}

export function getWarrantyInfoByUserId(userId: string): WarrantyInfo | null {
  return mockWarrantyInfo.userId === userId ? mockWarrantyInfo : null
}

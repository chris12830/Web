export interface Invoice {
  id: string
  invoiceNumber: string
  childName: string
  dueDate: string
  totalAmount: number
  status: string
  guardianId: string
  organizationId: string
  createdAt: string
  updatedAt: string
}

export interface Child {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  guardianId: string
  organizationId: string
  ageRangeId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Organization {
  id: string
  name: string
  address: string
  phone: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "system_admin" | "childcare_admin" | "guardian"
  organizationId?: string
  organizationName?: string
  phone?: string
  address?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

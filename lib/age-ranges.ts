export interface AgeRange {
  id: string
  organizationId: string
  name: string
  minAgeMonths: number
  maxAgeMonths: number
  monthlyRate: number
  description?: string
  isActive: boolean
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  requesterId: string
  assignedToId?: string
  organizationId: string
  subject: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in_progress" | "resolved" | "closed"
  category?: string
  createdAt: string
  updatedAt: string
  requesterName?: string
  assignedToName?: string
}

export interface SupportMessage {
  id: string
  ticketId: string
  senderId: string
  message: string
  isInternal: boolean
  createdAt: string
  senderName?: string
}

// Demo data for age ranges
const demoAgeRanges: AgeRange[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440060",
    organizationId: "550e8400-e29b-41d4-a716-446655440001",
    name: "Infant Care (6-18 months)",
    minAgeMonths: 6,
    maxAgeMonths: 18,
    monthlyRate: 1500.0,
    description: "Specialized care for infants with low child-to-caregiver ratios",
    isActive: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440061",
    organizationId: "550e8400-e29b-41d4-a716-446655440001",
    name: "Toddler Care (18-36 months)",
    minAgeMonths: 18,
    maxAgeMonths: 36,
    monthlyRate: 1300.0,
    description: "Active toddler program with structured activities",
    isActive: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440062",
    organizationId: "550e8400-e29b-41d4-a716-446655440001",
    name: "Preschool (3-4 years)",
    minAgeMonths: 36,
    maxAgeMonths: 48,
    monthlyRate: 1200.0,
    description: "Educational preschool program preparing for kindergarten",
    isActive: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440063",
    organizationId: "550e8400-e29b-41d4-a716-446655440001",
    name: "Pre-K (4-5 years)",
    minAgeMonths: 48,
    maxAgeMonths: 60,
    monthlyRate: 1100.0,
    description: "Advanced pre-kindergarten curriculum",
    isActive: true,
  },
]

// Demo data for support tickets
const demoSupportTickets: SupportTicket[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440070",
    ticketNumber: "TICK-2024-001",
    requesterId: "550e8400-e29b-41d4-a716-446655440011",
    assignedToId: "550e8400-e29b-41d4-a716-446655440010",
    organizationId: "550e8400-e29b-41d4-a716-446655440001",
    subject: "Unable to generate monthly reports",
    description:
      "The monthly report generation feature is not working properly. When I click generate, it shows an error message.",
    priority: "high",
    status: "open",
    category: "Technical Issue",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    requesterName: "Sarah Johnson",
    assignedToName: "System Admin",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440071",
    ticketNumber: "TICK-2024-002",
    requesterId: "550e8400-e29b-41d4-a716-446655440020",
    assignedToId: "550e8400-e29b-41d4-a716-446655440011",
    organizationId: "550e8400-e29b-41d4-a716-446655440001",
    subject: "Question about payment methods",
    description:
      "I would like to know what payment methods are accepted for invoice payments. Can I pay with bank transfer?",
    priority: "medium",
    status: "resolved",
    category: "General Inquiry",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    requesterName: "John Smith",
    assignedToName: "Sarah Johnson",
  },
]

async function getDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  try {
    const { neon } = await import("@neondatabase/serverless")
    return neon(process.env.DATABASE_URL)
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function getAgeRangesByOrganization(organizationId: string): Promise<AgeRange[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return demoAgeRanges.filter((range) => range.organizationId === organizationId)
  }

  try {
    const result = await sql`
      SELECT * FROM age_ranges 
      WHERE organization_id = ${organizationId} AND is_active = true
      ORDER BY min_age_months
    `

    return result.map((row) => ({
      id: row.id,
      organizationId: row.organization_id,
      name: row.name,
      minAgeMonths: row.min_age_months,
      maxAgeMonths: row.max_age_months,
      monthlyRate: Number.parseFloat(row.monthly_rate),
      description: row.description,
      isActive: row.is_active,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return demoAgeRanges.filter((range) => range.organizationId === organizationId)
  }
}

export async function getSupportTicketsByUser(userId: string, userRole: string): Promise<SupportTicket[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return demoSupportTickets.filter(
      (ticket) => userRole === "system_admin" || ticket.requesterId === userId || ticket.assignedToId === userId,
    )
  }

  try {
    let query
    if (userRole === "system_admin") {
      // System admin sees all tickets
      query = sql`
        SELECT 
          st.*,
          CONCAT(u1.first_name, ' ', u1.last_name) as requester_name,
          CONCAT(u2.first_name, ' ', u2.last_name) as assigned_to_name
        FROM support_tickets st
        JOIN users u1 ON st.requester_id = u1.id
        LEFT JOIN users u2 ON st.assigned_to_id = u2.id
        ORDER BY st.created_at DESC
      `
    } else {
      // Other users see tickets they created or are assigned to
      query = sql`
        SELECT 
          st.*,
          CONCAT(u1.first_name, ' ', u1.last_name) as requester_name,
          CONCAT(u2.first_name, ' ', u2.last_name) as assigned_to_name
        FROM support_tickets st
        JOIN users u1 ON st.requester_id = u1.id
        LEFT JOIN users u2 ON st.assigned_to_id = u2.id
        WHERE st.requester_id = ${userId} OR st.assigned_to_id = ${userId}
        ORDER BY st.created_at DESC
      `
    }

    const result = await query

    return result.map((row) => ({
      id: row.id,
      ticketNumber: row.ticket_number,
      requesterId: row.requester_id,
      assignedToId: row.assigned_to_id,
      organizationId: row.organization_id,
      subject: row.subject,
      description: row.description,
      priority: row.priority,
      status: row.status,
      category: row.category,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      requesterName: row.requester_name,
      assignedToName: row.assigned_to_name,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return demoSupportTickets.filter(
      (ticket) => userRole === "system_admin" || ticket.requesterId === userId || ticket.assignedToId === userId,
    )
  }
}

export function calculateAgeInMonths(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)

  const yearDiff = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  return yearDiff * 12 + monthDiff
}

export function getAgeRangeForChild(ageInMonths: number, ageRanges: AgeRange[]): AgeRange | null {
  return ageRanges.find((range) => ageInMonths >= range.minAgeMonths && ageInMonths <= range.maxAgeMonths) || null
}

export interface Invoice {
  id: string
  invoiceNumber: string
  organizationId: string
  guardianId: string
  childId: string
  childName: string
  guardianName: string
  issueDate: string
  dueDate: string
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
  status: string
  notes?: string
  organizationName: string
}

export interface InvoiceItem {
  id: string
  invoiceId: string
  serviceId?: string
  description: string
  quantity: number
  rate: number
  amount: number
  serviceDate?: string
}

export interface Child {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  guardianId: string
  organizationId: string
  enrollmentDate: string
  isActive: boolean
  guardianName?: string
  guardianEmail?: string
}

export interface Service {
  id: string
  organizationId: string
  name: string
  description?: string
  rate: number
  billingFrequency: string
  isActive: boolean
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  paymentDate: string
  paymentMethod?: string
  transactionId?: string
  notes?: string
}

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

// Invoice functions
export async function getInvoicesByGuardian(guardianId: string): Promise<Invoice[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return []
  }

  try {
    const result = await sql`
      SELECT 
        i.*,
        CONCAT(c.first_name, ' ', c.last_name) as child_name,
        CONCAT(u.first_name, ' ', u.last_name) as guardian_name,
        o.name as organization_name
      FROM invoices i
      JOIN children c ON i.child_id = c.id
      JOIN users u ON i.guardian_id = u.id
      JOIN organizations o ON i.organization_id = o.id
      WHERE i.guardian_id = ${guardianId}
      ORDER BY i.issue_date DESC
    `

    return result.map((row) => ({
      id: row.id,
      invoiceNumber: row.invoice_number,
      organizationId: row.organization_id,
      guardianId: row.guardian_id,
      childId: row.child_id,
      childName: row.child_name,
      guardianName: row.guardian_name,
      issueDate: row.issue_date,
      dueDate: row.due_date,
      subtotal: Number.parseFloat(row.subtotal),
      taxRate: Number.parseFloat(row.tax_rate),
      taxAmount: Number.parseFloat(row.tax_amount),
      totalAmount: Number.parseFloat(row.total_amount),
      status: row.status,
      notes: row.notes,
      organizationName: row.organization_name,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

export async function getInvoicesByOrganization(organizationId: string): Promise<Invoice[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return []
  }

  try {
    const result = await sql`
      SELECT 
        i.*,
        CONCAT(c.first_name, ' ', c.last_name) as child_name,
        CONCAT(u.first_name, ' ', u.last_name) as guardian_name,
        o.name as organization_name
      FROM invoices i
      JOIN children c ON i.child_id = c.id
      JOIN users u ON i.guardian_id = u.id
      JOIN organizations o ON i.organization_id = o.id
      WHERE i.organization_id = ${organizationId}
      ORDER BY i.issue_date DESC
    `

    return result.map((row) => ({
      id: row.id,
      invoiceNumber: row.invoice_number,
      organizationId: row.organization_id,
      guardianId: row.guardian_id,
      childId: row.child_id,
      childName: row.child_name,
      guardianName: row.guardian_name,
      issueDate: row.issue_date,
      dueDate: row.due_date,
      subtotal: Number.parseFloat(row.subtotal),
      taxRate: Number.parseFloat(row.tax_rate),
      taxAmount: Number.parseFloat(row.tax_amount),
      totalAmount: Number.parseFloat(row.total_amount),
      status: row.status,
      notes: row.notes,
      organizationName: row.organization_name,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

export async function getInvoiceItems(invoiceId: string): Promise<InvoiceItem[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return []
  }

  try {
    const result = await sql`
      SELECT * FROM invoice_items 
      WHERE invoice_id = ${invoiceId}
      ORDER BY created_at
    `

    return result.map((row) => ({
      id: row.id,
      invoiceId: row.invoice_id,
      serviceId: row.service_id,
      description: row.description,
      quantity: Number.parseFloat(row.quantity),
      rate: Number.parseFloat(row.rate),
      amount: Number.parseFloat(row.amount),
      serviceDate: row.service_date,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

export async function getChildrenByGuardian(guardianId: string): Promise<Child[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return []
  }

  try {
    const result = await sql`
      SELECT * FROM children 
      WHERE guardian_id = ${guardianId} AND is_active = true
      ORDER BY first_name, last_name
    `

    return result.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      dateOfBirth: row.date_of_birth,
      guardianId: row.guardian_id,
      organizationId: row.organization_id,
      enrollmentDate: row.enrollment_date,
      isActive: row.is_active,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

export async function getChildrenByOrganization(organizationId: string): Promise<Child[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return []
  }

  try {
    const result = await sql`
      SELECT 
        c.*,
        CONCAT(u.first_name, ' ', u.last_name) as guardian_name,
        u.email as guardian_email
      FROM children c
      JOIN users u ON c.guardian_id = u.id
      WHERE c.organization_id = ${organizationId} AND c.is_active = true
      ORDER BY c.first_name, c.last_name
    `

    return result.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      dateOfBirth: row.date_of_birth,
      guardianId: row.guardian_id,
      organizationId: row.organization_id,
      enrollmentDate: row.enrollment_date,
      isActive: row.is_active,
      guardianName: row.guardian_name,
      guardianEmail: row.guardian_email,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

export async function getServicesByOrganization(organizationId: string): Promise<Service[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return []
  }

  try {
    const result = await sql`
      SELECT * FROM services 
      WHERE organization_id = ${organizationId} AND is_active = true
      ORDER BY name
    `

    return result.map((row) => ({
      id: row.id,
      organizationId: row.organization_id,
      name: row.name,
      description: row.description,
      rate: Number.parseFloat(row.rate),
      billingFrequency: row.billing_frequency,
      isActive: row.is_active,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

export async function getPaymentsByInvoice(invoiceId: string): Promise<Payment[]> {
  const sql = await getDatabaseConnection()

  if (!sql) {
    return []
  }

  try {
    const result = await sql`
      SELECT * FROM payments 
      WHERE invoice_id = ${invoiceId}
      ORDER BY payment_date DESC
    `

    return result.map((row) => ({
      id: row.id,
      invoiceId: row.invoice_id,
      amount: Number.parseFloat(row.amount),
      paymentDate: row.payment_date,
      paymentMethod: row.payment_method,
      transactionId: row.transaction_id,
      notes: row.notes,
    }))
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

// Placeholder functions for database operations
export async function createInvoice(invoiceData: any): Promise<string> {
  console.log("Creating invoice:", invoiceData)
  return "new-invoice-id"
}

export async function updateInvoiceStatus(invoiceId: string, status: string): Promise<void> {
  console.log("Updating invoice status:", invoiceId, status)
}

export async function recordPayment(paymentData: any): Promise<void> {
  console.log("Recording payment:", paymentData)
}

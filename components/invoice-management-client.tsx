"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Eye, Download, Filter, ArrowUpDown, ArrowUp, ArrowDown, Mail } from "lucide-react"
import Link from "next/link"
import { InvoiceViewModal } from "@/components/invoice-view-modal"

interface Invoice {
  id: string
  invoiceNumber: string
  childName: string
  guardianName: string
  guardianEmail: string
  amount: number
  dueDate: string
  status: "sent" | "paid" | "overdue" | "reconciled"
  sentDate: string
  paidDate?: string
  reconciledDate?: string
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  notes: string
}

interface InvoiceManagementClientProps {
  organizationId: string
}

type SortField = "invoiceNumber" | "childName" | "guardianName" | "amount" | "dueDate" | "status"
type SortDirection = "asc" | "desc"

export function InvoiceManagementClient({ organizationId }: InvoiceManagementClientProps) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("dueDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Load invoices from localStorage on component mount
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [reconciledInvoices, setReconciledInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    // Load active invoices (non-reconciled)
    const savedInvoices = localStorage.getItem("childcareInvoices")
    if (savedInvoices) {
      const allInvoices = JSON.parse(savedInvoices)
      const activeInvoices = allInvoices.filter((inv: Invoice) => inv.status !== "reconciled")
      setInvoices(activeInvoices)
    } else {
      // Demo data for active invoices
      const demoInvoices = [
        {
          id: "1",
          invoiceNumber: "INV-2024-001",
          childName: "Emma Smith",
          guardianName: "John Smith",
          guardianEmail: "john.smith@email.com",
          amount: 1299.0,
          dueDate: "2024-01-15",
          status: "paid" as const,
          sentDate: "2024-01-01",
          paidDate: "2024-01-10",
          items: [{ description: "Full Day Care - January 2024", quantity: 20, rate: 65.0, amount: 1300.0 }],
          notes: "Thank you for your business!",
        },
        {
          id: "2",
          invoiceNumber: "INV-2024-002",
          childName: "Liam Brown",
          guardianName: "Emily Brown",
          guardianEmail: "emily.brown@email.com",
          amount: 866.0,
          dueDate: "2024-01-15",
          status: "overdue" as const,
          sentDate: "2024-01-01",
          items: [
            { description: "Half Day Care - January 2024", quantity: 15, rate: 40.0, amount: 600.0 },
            { description: "Late Pickup Fee", quantity: 3, rate: 10.0, amount: 30.0 },
          ],
          notes: "Please contact us regarding payment arrangements.",
        },
        {
          id: "3",
          invoiceNumber: "INV-2024-003",
          childName: "Sophia Wilson",
          guardianName: "David Wilson",
          guardianEmail: "david.wilson@email.com",
          amount: 1515.5,
          dueDate: "2024-02-15",
          status: "sent" as const,
          sentDate: "2024-02-01",
          items: [
            { description: "Full Day Care - February 2024", quantity: 22, rate: 65.0, amount: 1430.0 },
            { description: "Extra Activities", quantity: 1, rate: 85.5, amount: 85.5 },
          ],
          notes: "Payment due by the 15th of the month.",
        },
      ]
      setInvoices(demoInvoices)
      localStorage.setItem("childcareInvoices", JSON.stringify(demoInvoices))
    }

    // Load reconciled invoices
    const savedReconciledInvoices = localStorage.getItem("reconciledInvoices")
    if (savedReconciledInvoices) {
      setReconciledInvoices(JSON.parse(savedReconciledInvoices))
    }
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1 text-blue-600" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 text-blue-600" />
    )
  }

  const sortedInvoices = [...invoices].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "amount") {
      aValue = Number(aValue)
      bValue = Number(bValue)
    }

    if (sortField === "dueDate" || sortField === "sentDate") {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredInvoices = sortedInvoices.filter((invoice) => {
    if (statusFilter !== "all" && invoice.status !== statusFilter) return false
    if (
      searchTerm &&
      !`${invoice.invoiceNumber} ${invoice.childName} ${invoice.guardianName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "paid":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "reconciled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    const updatedInvoices = invoices
      .map((invoice) => {
        if (invoice.id === invoiceId) {
          const updatedInvoice = { ...invoice, status: newStatus as any }

          // If changing to reconciled, add reconciled date and move to reconciled list
          if (newStatus === "reconciled") {
            updatedInvoice.reconciledDate = new Date().toISOString().split("T")[0]

            // Add to reconciled invoices
            const currentReconciled = JSON.parse(localStorage.getItem("reconciledInvoices") || "[]")
            const newReconciledList = [...currentReconciled, updatedInvoice]
            localStorage.setItem("reconciledInvoices", JSON.stringify(newReconciledList))
            setReconciledInvoices(newReconciledList)

            // Remove from active invoices
            const remainingInvoices = invoices.filter((inv) => inv.id !== invoiceId)
            setInvoices(remainingInvoices)
            localStorage.setItem("childcareInvoices", JSON.stringify(remainingInvoices))

            alert(`Invoice ${updatedInvoice.invoiceNumber} has been moved to Reconciled Invoices`)
            return null // This invoice will be filtered out
          }

          return updatedInvoice
        }
        return invoice
      })
      .filter(Boolean) as Invoice[]

    // Update active invoices if not reconciled
    if (newStatus !== "reconciled") {
      setInvoices(updatedInvoices)
      localStorage.setItem("childcareInvoices", JSON.stringify(updatedInvoices))
      alert(`Invoice status changed to ${newStatus}`)
    }
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsViewModalOpen(true)
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Create a simple text representation of the invoice
    const invoiceText = `
INVOICE ${invoice.invoiceNumber}

Bill To: ${invoice.guardianName}
Email: ${invoice.guardianEmail}
Child: ${invoice.childName}

Invoice Date: ${formatDate(invoice.sentDate)}
Due Date: ${formatDate(invoice.dueDate)}

ITEMS:
${invoice.items
  .map(
    (item) =>
      `${item.description} - Qty: ${item.quantity} x ${formatCurrency(item.rate)} = ${formatCurrency(item.amount)}`,
  )
  .join("\n")}

TOTAL: ${formatCurrency(invoice.amount)}

Notes: ${invoice.notes}
    `.trim()

    const blob = new Blob([invoiceText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${invoice.invoiceNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSendReminder = (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId)
    alert(`Payment reminder sent for invoice ${invoice?.invoiceNumber}

Reminder email sent to: ${invoice?.guardianName}
Content: "Dear ${invoice?.guardianName}, this is a friendly reminder that your invoice ${invoice?.invoiceNumber} for ${invoice?.childName} is due on ${formatDate(invoice?.dueDate || "")}. Please log into your parent portal to view and pay your invoice. Thank you!"

You can customize this reminder content in Settings > Email Templates.`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Manage and track all active invoices</p>
        </div>
        <div className="flex space-x-2">
          <Link href="/childcare/invoices/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </Link>
          <Link href="/childcare/invoices/reconciled">
            <Button variant="outline">View Reconciled ({reconciledInvoices.length})</Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Active Invoices</div>
            <div className="text-2xl font-bold">{invoices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Sent</div>
            <div className="text-2xl font-bold text-blue-600">{invoices.filter((i) => i.status === "sent").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Overdue</div>
            <div className="text-2xl font-bold text-red-600">
              {invoices.filter((i) => i.status === "overdue").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Paid</div>
            <div className="text-2xl font-bold text-green-600">
              {invoices.filter((i) => i.status === "paid").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort("invoiceNumber")}
                >
                  <div className="flex items-center">Invoice #{getSortIcon("invoiceNumber")}</div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort("childName")}
                >
                  <div className="flex items-center">
                    Child
                    {getSortIcon("childName")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort("guardianName")}
                >
                  <div className="flex items-center">
                    Guardian
                    {getSortIcon("guardianName")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50 select-none" onClick={() => handleSort("amount")}>
                  <div className="flex items-center">
                    Amount
                    {getSortIcon("amount")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort("dueDate")}
                >
                  <div className="flex items-center">
                    Due Date
                    {getSortIcon("dueDate")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50 select-none" onClick={() => handleSort("status")}>
                  <div className="flex items-center">
                    Status
                    {getSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.childName}</TableCell>
                  <TableCell>{invoice.guardianName}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>
                    <Select value={invoice.status} onValueChange={(value) => handleStatusChange(invoice.id, value)}>
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="reconciled">Reconciled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        title="View invoice details"
                        onClick={() => handleViewInvoice(invoice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendReminder(invoice.id)}
                        title="Send payment reminder email"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        title="Download invoice PDF"
                        onClick={() => handleDownloadInvoice(invoice)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice View Modal */}
      <InvoiceViewModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} invoice={selectedInvoice} />

      {/* Split Invoice Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>💡 Split Invoice Feature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">For Separated Parents - Invoice Splitting Options:</h4>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Option 1:</strong> Create separate invoices for each parent with their portion (50/50, 60/40,
                etc.)
              </p>
              <p>
                <strong>Option 2:</strong> Send one invoice to primary parent with note about split arrangement
              </p>
              <p>
                <strong>Option 3:</strong> Use "Additional Notes" field to specify payment split instructions
              </p>
              <p>
                <strong>Coming Soon:</strong> Automatic invoice splitting feature with customizable percentages
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              Request Split Invoice Feature
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

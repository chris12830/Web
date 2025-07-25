"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, ArrowLeft, Undo } from "lucide-react"
import Link from "next/link"

interface ReconciledInvoice {
  id: string
  invoiceNumber: string
  childName: string
  guardianName: string
  guardianEmail: string
  amount: number
  paidDate?: string
  reconciledDate: string
  dueDate: string
  sentDate: string
  status: string
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  notes: string
}

interface ReconciledInvoicesClientProps {
  organizationId: string
}

export function ReconciledInvoicesClient({ organizationId }: ReconciledInvoicesClientProps) {
  const [reconciledInvoices, setReconciledInvoices] = useState<ReconciledInvoice[]>([])

  useEffect(() => {
    // Load reconciled invoices from localStorage
    const savedReconciledInvoices = localStorage.getItem("reconciledInvoices")
    if (savedReconciledInvoices) {
      setReconciledInvoices(JSON.parse(savedReconciledInvoices))
    } else {
      // Demo reconciled invoices
      const demoReconciled = [
        {
          id: "4",
          invoiceNumber: "INV-2024-004",
          childName: "Oliver Johnson",
          guardianName: "Sarah Johnson",
          guardianEmail: "sarah.johnson@email.com",
          amount: 1200.0,
          paidDate: "2024-02-10",
          reconciledDate: "2024-02-15",
          dueDate: "2024-02-15",
          sentDate: "2024-02-01",
          status: "reconciled",
          items: [{ description: "Monthly Care Package", quantity: 1, rate: 1200.0, amount: 1200.0 }],
          notes: "Monthly package includes all meals and activities.",
        },
        {
          id: "5",
          invoiceNumber: "INV-2024-005",
          childName: "Ava Davis",
          guardianName: "Michael Davis",
          guardianEmail: "michael.davis@email.com",
          amount: 950.0,
          paidDate: "2024-01-28",
          reconciledDate: "2024-02-01",
          dueDate: "2024-01-30",
          sentDate: "2024-01-15",
          status: "reconciled",
          items: [
            { description: "Half Day Care - January 2024", quantity: 12, rate: 45.0, amount: 540.0 },
            { description: "Lunch Program", quantity: 12, rate: 15.0, amount: 180.0 },
          ],
          notes: "Great month! Thank you for your business.",
        },
      ]
      setReconciledInvoices(demoReconciled)
      localStorage.setItem("reconciledInvoices", JSON.stringify(demoReconciled))
    }
  }, [])

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

  const handleUnreconcile = (invoiceId: string) => {
    const invoice = reconciledInvoices.find((inv) => inv.id === invoiceId)
    if (!invoice) return

    if (confirm(`Are you sure you want to move invoice ${invoice.invoiceNumber} back to active invoices?`)) {
      // Remove from reconciled invoices
      const updatedReconciled = reconciledInvoices.filter((inv) => inv.id !== invoiceId)
      setReconciledInvoices(updatedReconciled)
      localStorage.setItem("reconciledInvoices", JSON.stringify(updatedReconciled))

      // Add back to active invoices with paid status
      const activeInvoices = JSON.parse(localStorage.getItem("childcareInvoices") || "[]")
      const invoiceToRestore = { ...invoice, status: "paid", reconciledDate: undefined }
      const updatedActive = [...activeInvoices, invoiceToRestore]
      localStorage.setItem("childcareInvoices", JSON.stringify(updatedActive))

      alert(`Invoice ${invoice.invoiceNumber} has been moved back to active invoices`)
    }
  }

  const handleDownloadInvoice = (invoice: ReconciledInvoice) => {
    const invoiceText = `
RECONCILED INVOICE ${invoice.invoiceNumber}

Bill To: ${invoice.guardianName}
Email: ${invoice.guardianEmail}
Child: ${invoice.childName}

Invoice Date: ${formatDate(invoice.sentDate)}
Due Date: ${formatDate(invoice.dueDate)}
Paid Date: ${formatDate(invoice.paidDate || invoice.reconciledDate)}
Reconciled Date: ${formatDate(invoice.reconciledDate)}

ITEMS:
${invoice.items
  .map(
    (item) =>
      `${item.description} - Qty: ${item.quantity} x ${formatCurrency(item.rate)} = ${formatCurrency(item.amount)}`,
  )
  .join("\n")}

TOTAL: ${formatCurrency(invoice.amount)}

Notes: ${invoice.notes}

STATUS: RECONCILED AND ARCHIVED
    `.trim()

    const blob = new Blob([invoiceText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${invoice.invoiceNumber}_RECONCILED.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/childcare/invoices">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reconciled Invoices</h1>
            <p className="text-gray-600">View all reconciled and archived invoices</p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Reconciled</div>
            <div className="text-2xl font-bold text-gray-800">{reconciledInvoices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Value</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(reconciledInvoices.reduce((sum, inv) => sum + inv.amount, 0))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">This Month</div>
            <div className="text-2xl font-bold text-blue-600">
              {
                reconciledInvoices.filter((inv) => new Date(inv.reconciledDate).getMonth() === new Date().getMonth())
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reconciled Invoices ({reconciledInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {reconciledInvoices.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">No reconciled invoices yet</div>
              <p className="text-sm text-gray-400">
                When you change an invoice status to "Reconciled", it will appear here
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Child</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Reconciled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reconciledInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.childName}</TableCell>
                    <TableCell>{invoice.guardianName}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>{formatDate(invoice.paidDate || invoice.reconciledDate)}</TableCell>
                    <TableCell>{formatDate(invoice.reconciledDate)}</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-100 text-gray-800">Reconciled</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" title="View invoice details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Download reconciled invoice"
                          onClick={() => handleDownloadInvoice(invoice)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Move back to active invoices"
                          onClick={() => handleUnreconcile(invoice.id)}
                        >
                          <Undo className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>📋 About Reconciled Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 text-sm">
              <p>
                <strong>Reconciled invoices</strong> are invoices that have been paid and processed completely.
              </p>
              <p>
                <strong>When to reconcile:</strong> After payment is received and all accounting is complete.
              </p>
              <p>
                <strong>Archive purpose:</strong> Keeps your active invoice list clean while maintaining records.
              </p>
              <p>
                <strong>Restore option:</strong> Use the undo button to move invoices back to active if needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

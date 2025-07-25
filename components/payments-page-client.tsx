"use client"

import { DemoBanner } from "@/components/demo-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, Calendar, DollarSign } from "lucide-react"
import type { Invoice } from "@/lib/database"
import { PaymentButton } from "@/components/payment-button"

interface PaymentsPageClientProps {
  invoices: Invoice[]
}

export function PaymentsPageClient({ invoices }: PaymentsPageClientProps) {
  // Demo payments data
  const payments = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      amount: 1299.0,
      paymentDate: "2024-01-10",
      paymentMethod: "Credit Card",
      transactionId: "TXN-001-2024",
      status: "completed",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      amount: 866.0,
      paymentDate: "2024-01-12",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN-002-2024",
      status: "completed",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      amount: 1299.0,
      paymentDate: "2024-02-15",
      paymentMethod: "Credit Card",
      transactionId: "TXN-003-2024",
      status: "pending",
    },
  ]

  const totalPaid = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const pendingPayments = payments.filter((p) => p.status === "pending").length

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DemoBanner />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
        <p className="text-gray-600">View and manage your payment history and methods</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Payment Methods</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Invoices */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Outstanding Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices
              .filter((invoice) => invoice.status === "pending")
              .map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-600">{invoice.childName}</p>
                    <p className="text-sm text-gray-500">Due: {formatDate(invoice.dueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatCurrency(invoice.totalAmount)}</p>
                    <PaymentButton
                      type="INVOICE_PAYMENT"
                      data={{
                        invoiceId: invoice.id,
                        amount: invoice.totalAmount,
                        description: `Childcare Invoice ${invoice.invoiceNumber} - ${invoice.childName}`,
                      }}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Pay Now
                    </PaymentButton>
                  </div>
                </div>
              ))}
            {invoices.filter((invoice) => invoice.status === "pending").length === 0 && (
              <p className="text-gray-500 text-center py-8">No outstanding invoices</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Payment History</CardTitle>
            <Button
              variant="outline"
              onClick={() =>
                alert(
                  "Exporting Payment History...\n\nGenerating CSV file with all payment records.\nDownload will start shortly.\n\n(Demo mode - CSV file would be downloaded)",
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Simulate receipt PDF generation and download
                        const link = document.createElement("a")
                        link.href =
                          "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFBheW1lbnQgUmVjZWlwdCkKL1Byb2R1Y2VyIChEZW1vIFJlY2VpcHQgR2VuZXJhdG9yKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMTAxMTIwMDAwWikKPj4KZW5kb2JqCnhyZWYKMCAxCjAwMDAwMDAwMDAgNjU1MzUgZiAKdHJhaWxlcgo8PAovU2l6ZSAxCi9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoxNzMKJSVFT0Y="
                        link.download = `receipt-${payment.transactionId}.pdf`
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)

                        alert(
                          `🧾 Payment Receipt Downloaded!

Receipt Details:
• Transaction ID: ${payment.transactionId}
• Invoice: ${payment.invoiceNumber}
• Amount Paid: ${formatCurrency(payment.amount)}
• Payment Date: ${formatDate(payment.paymentDate)}
• Payment Method: ${payment.paymentMethod}
• Status: ${payment.status}

The receipt PDF has been downloaded to your device.
(Demo mode - Real receipt would include complete transaction details)`,
                        )
                      }}
                      title="Download Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

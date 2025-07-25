"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Baby, Mail } from "lucide-react"

interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
}

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
  items: InvoiceItem[]
  notes: string
}

interface InvoiceViewModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: Invoice | null
}

export function InvoiceViewModal({ isOpen, onClose, invoice }: InvoiceViewModalProps) {
  if (!invoice) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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

  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0)
  const taxRate = 13 // 13% tax rate
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Invoice Details</span>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </Badge>
              <Badge variant="outline">{invoice.invoiceNumber}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Bill To:</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{invoice.guardianName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{invoice.guardianEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <Baby className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Child: {invoice.childName}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Invoice Details:</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Issue Date: {formatDate(invoice.sentDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Due Date: {formatDate(invoice.dueDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Invoice #: {invoice.invoiceNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services & Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                    <th className="px-4 py-3 text-center font-medium">Qty</th>
                    <th className="px-4 py-3 text-right font-medium">Rate</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(item.rate)}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Totals */}
          <div className="flex justify-end">
            <div className="w-80 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({taxRate}%):</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">{invoice.notes}</p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Sunshine Child Care Center</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Address:</strong> 123 Main Street, Anytown, ON K1A 0A6
                </p>
                <p>
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Email:</strong> info@sunshinechildcare.com
                </p>
              </div>
              <div>
                <p>
                  <strong>Hours:</strong> Monday - Friday: 7:00 AM - 6:00 PM
                </p>
                <p>
                  <strong>License #:</strong> CC-2024-001
                </p>
                <p>
                  <strong>Tax #:</strong> 123456789RT0001
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

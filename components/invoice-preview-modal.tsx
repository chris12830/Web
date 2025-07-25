"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Download, Send, Calendar, User, Baby } from "lucide-react"

interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
}

interface InvoicePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceData: {
    invoiceNumber: string
    childName: string
    guardianName: string
    guardianEmail: string
    ageRange: string
    invoiceDate: string
    dueDate: string
    items: InvoiceItem[]
    subtotal: number
    taxRate: number
    taxAmount: number
    total: number
    notes: string
    defaultNote: string
    sendCopyToAdmin: boolean
  }
  onSend: () => void
}

export function InvoicePreviewModal({ isOpen, onClose, invoiceData, onSend }: InvoicePreviewModalProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Invoice Preview</span>
            <Badge variant="outline">{invoiceData.invoiceNumber}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Bill To:</h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{invoiceData.guardianName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{invoiceData.guardianEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <Baby className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {invoiceData.childName} ({invoiceData.ageRange})
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Invoice Details:</h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Issue Date: {formatDate(invoiceData.invoiceDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Due Date: {formatDate(invoiceData.dueDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Invoice #: {invoiceData.invoiceNumber}</span>
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
                  {invoiceData.items.map((item, index) => (
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
                <span>{formatCurrency(invoiceData.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({invoiceData.taxRate}%):</span>
                <span>{formatCurrency(invoiceData.taxAmount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(invoiceData.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {(invoiceData.defaultNote || invoiceData.notes) && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Notes & Terms</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {invoiceData.defaultNote && <p className="text-sm">{invoiceData.defaultNote}</p>}
                {invoiceData.notes && <p className="text-sm">{invoiceData.notes}</p>}
              </div>
            </div>
          )}

          {/* Admin Copy Notice */}
          {invoiceData.sendCopyToAdmin && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm text-blue-700">A copy will be sent to: christmckinnon@gmail.com</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={onSend}>
                <Send className="h-4 w-4 mr-2" />
                Send Invoice
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

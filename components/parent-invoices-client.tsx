"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/utils"
import type { Invoice } from "@/types"
import { PaymentButton } from "@/components/payment-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, FileText, User, CreditCard, Building, Eye } from "lucide-react"
import { InvoiceViewModal } from "@/components/invoice-view-modal"

interface ParentInvoicesClientProps {
  invoices: Invoice[]
}

const ParentInvoicesClient: React.FC<ParentInvoicesClientProps> = ({ invoices }) => {
  const [mounted, setMounted] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewInvoice = (invoice: any) => {
    // Convert the invoice to the expected format
    const formattedInvoice = {
      ...invoice,
      items: [
        {
          description: `Childcare Services - ${invoice.childName}`,
          quantity: 1,
          rate: invoice.totalAmount,
          amount: invoice.totalAmount,
        },
      ],
      notes: "Thank you for choosing our childcare services!",
      guardianEmail: "parent@email.com", // This would come from the actual data
    }
    setSelectedInvoice(formattedInvoice)
    setIsViewModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Invoices</h1>
        <div className="text-sm text-gray-500">
          {invoices.length} {invoices.length === 1 ? "invoice" : "invoices"}
        </div>
      </div>

      {invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-500 text-center">
              You don't have any invoices at the moment. New invoices will appear here when they're created.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Invoice #{invoice.invoiceNumber}
                  </CardTitle>
                  <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Child</p>
                      <p className="font-medium">{invoice.childName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-lg">{formatCurrency(invoice.totalAmount)}</p>
                    </div>
                  </div>
                </div>

                {/* View Invoice Button */}
                <div className="pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)} className="mb-3">
                    <Eye className="w-4 h-4 mr-2" />
                    View Invoice Details
                  </Button>
                </div>

                {invoice.status?.toLowerCase() !== "paid" && (
                  <div className="pt-2 border-t space-y-4">
                    {/* Payment Methods */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Available Payment Methods:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <CreditCard className="w-3 h-3 text-blue-600" />
                          <span>Credit Card</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building className="w-3 h-3 text-green-600" />
                          <span>Bank EFT (Free)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-3 h-3 text-yellow-600" />
                          <span>Cash</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-3 h-3 text-purple-600" />
                          <span>Cheque</span>
                        </div>
                      </div>
                    </div>

                    <PaymentButton
                      type="INVOICE_PAYMENT"
                      data={{
                        invoiceId: invoice.id,
                        amount: invoice.totalAmount,
                        description: `Childcare Invoice ${invoice.invoiceNumber} - ${invoice.childName}`,
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Pay {formatCurrency(invoice.totalAmount)}
                    </PaymentButton>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Invoice View Modal */}
      <InvoiceViewModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} invoice={selectedInvoice} />
    </div>
  )
}

export { ParentInvoicesClient }
export default ParentInvoicesClient

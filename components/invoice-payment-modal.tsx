"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PaymentButton } from "@/components/payment-button"
import { CreditCard } from "lucide-react"

interface InvoicePaymentModalProps {
  invoice: {
    id: string
    invoiceNumber: string
    totalAmount: number
    childName: string
  }
  children: React.ReactNode
}

export function InvoicePaymentModal({ invoice, children }: InvoicePaymentModalProps) {
  const [open, setOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Pay Invoice</span>
          </DialogTitle>
          <DialogDescription>Complete payment for invoice {invoice.invoiceNumber}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Invoice Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Invoice:</span>
              <span className="font-medium">{invoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Child:</span>
              <span className="font-medium">{invoice.childName}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm text-gray-600">Total Amount:</span>
              <span className="text-lg font-bold text-green-600">{formatCurrency(invoice.totalAmount)}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <PaymentButton
              type="INVOICE_PAYMENT"
              data={{
                invoiceId: invoice.id,
                amount: invoice.totalAmount,
                description: `Childcare Invoice ${invoice.invoiceNumber} - ${invoice.childName}`,
              }}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Pay {formatCurrency(invoice.totalAmount)}
            </PaymentButton>

            <div className="text-center">
              <p className="text-xs text-gray-500">Secure payment powered by Stripe</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import type React from "react"
import type { Invoice } from "@/types"
import { PaymentButton } from "@/components/payment-button"

interface ParentInvoiceListProps {
  invoices: Invoice[]
}

const ParentInvoiceList: React.FC<ParentInvoiceListProps> = ({ invoices }) => {
  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {invoice.childName} - Invoice #{invoice.invoiceNumber}
            </h3>
            <p className="text-gray-600">Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p className="text-gray-600">Total Amount: ${invoice.totalAmount.toFixed(2)}</p>
            <p className="text-gray-600">Status: {invoice.status}</p>
          </div>
          <div>
            {invoice.status === "pending" && (
              <PaymentButton
                type="INVOICE_PAYMENT"
                data={{
                  invoiceId: invoice.id,
                  amount: invoice.totalAmount,
                  description: `Childcare Invoice ${invoice.invoiceNumber} - ${invoice.childName}`,
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Pay ${invoice.totalAmount.toFixed(2)}
              </PaymentButton>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ParentInvoiceList

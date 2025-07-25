import { requireRole } from "@/lib/auth"
import { getInvoicesByGuardian } from "@/lib/database"
import { PaymentsPageClient } from "@/components/payments-page-client"

export default async function PaymentsPage() {
  const user = await requireRole(["guardian"])
  const invoices = await getInvoicesByGuardian(user.id)

  return <PaymentsPageClient invoices={invoices} />
}

import { requireRole } from "@/lib/auth"
import { getInvoicesByGuardian } from "@/lib/database"
import { ParentInvoicesClient } from "@/components/parent-invoices-client"

export default async function ParentInvoicesPage() {
  const user = await requireRole(["guardian"])
  const invoices = await getInvoicesByGuardian(user.id)

  return <ParentInvoicesClient invoices={invoices} />
}

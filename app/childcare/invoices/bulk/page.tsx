import { requireRole } from "@/lib/auth"
import { BulkInvoiceClient } from "@/components/bulk-invoice-client"

export default async function BulkInvoicePage() {
  const user = await requireRole(["childcare_admin"])

  return <BulkInvoiceClient organizationId={user.organizationId} />
}

import { requireRole } from "@/lib/auth"
import { InvoiceCreateClient } from "@/components/invoice-create-client"
import { DemoBanner } from "@/components/demo-banner"

export default async function CreateInvoicePage() {
  const user = await requireRole(["childcare_admin"])

  return (
    <>
      <DemoBanner />
      <InvoiceCreateClient organizationId={user.organizationId!} />
    </>
  )
}

import { requireRole } from "@/lib/auth"
import { InvoiceManagementClient } from "@/components/invoice-management-client"
import { DemoBanner } from "@/components/demo-banner"

export default async function InvoicesPage() {
  const user = await requireRole(["childcare_admin"])

  return (
    <>
      <DemoBanner />
      <InvoiceManagementClient organizationId={user.organizationId!} />
    </>
  )
}

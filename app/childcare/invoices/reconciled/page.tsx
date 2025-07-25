import { requireRole } from "@/lib/auth"
import { ReconciledInvoicesClient } from "@/components/reconciled-invoices-client"
import { DemoBanner } from "@/components/demo-banner"

export default async function ReconciledInvoicesPage() {
  const user = await requireRole(["childcare_admin"])

  return (
    <>
      <DemoBanner />
      <ReconciledInvoicesClient organizationId={user.organizationId!} />
    </>
  )
}

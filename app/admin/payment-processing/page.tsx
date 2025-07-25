import { requireRole } from "@/lib/auth"
import { AdminPaymentProcessingClient } from "@/components/admin-payment-processing-client"

export default async function AdminPaymentProcessingPage() {
  const user = await requireRole(["system_admin"])

  return <AdminPaymentProcessingClient user={user} />
}

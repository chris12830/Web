import { requireRole } from "@/lib/auth"
import { PaymentSetupClient } from "@/components/payment-setup-client"

export default async function PaymentSetupPage() {
  const user = await requireRole(["childcare_admin"])

  return <PaymentSetupClient user={user} />
}

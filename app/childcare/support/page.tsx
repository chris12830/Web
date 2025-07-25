import { requireRole } from "@/lib/auth"
import { ChildcareSupportClient } from "@/components/childcare-support-client"

export default async function ChildcareSupportPage() {
  const user = await requireRole(["childcare_admin"])

  return <ChildcareSupportClient user={user} />
}

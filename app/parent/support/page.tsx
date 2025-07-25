import { requireRole } from "@/lib/auth"
import { ParentSupportClient } from "@/components/parent-support-client"

export default async function ParentSupportPage() {
  const user = await requireRole(["guardian"])

  return <ParentSupportClient user={user} />
}

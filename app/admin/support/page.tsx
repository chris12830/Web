import { requireRole } from "@/lib/auth"
import { AdminSupportClient } from "@/components/admin-support-client"

export default async function AdminSupportPage() {
  const user = await requireRole(["system_admin"])

  return <AdminSupportClient user={user} />
}

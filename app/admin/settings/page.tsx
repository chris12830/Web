import { requireRole } from "@/lib/auth"
import { AdminSettingsClient } from "@/components/admin-settings-client"

export default async function SettingsPage() {
  const user = await requireRole(["system_admin"])

  return <AdminSettingsClient />
}

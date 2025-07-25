import { requireRole } from "@/lib/auth"
import { EnhancedParentDashboard } from "@/components/enhanced-parent-dashboard"

export default async function ParentDashboard() {
  const user = await requireRole(["guardian"])

  return <EnhancedParentDashboard user={user} />
}

import { requireRole } from "@/lib/auth"
import { EnhancedSettings } from "@/components/enhanced-settings"
import { DemoBanner } from "@/components/demo-banner"

export default async function ChildcareSettingsPage() {
  const user = await requireRole(["childcare_admin"])

  return (
    <>
      <DemoBanner />
      <EnhancedSettings organizationName={user.organizationName || "Your Child Care Center"} />
    </>
  )
}

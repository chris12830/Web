import { requireRole } from "@/lib/auth"
import { EnhancedAgeRangeManager } from "@/components/enhanced-age-range-manager"
import { DemoBanner } from "@/components/demo-banner"

export default async function AgeRangesPage() {
  const user = await requireRole(["childcare_admin"])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DemoBanner />
      <EnhancedAgeRangeManager />
    </div>
  )
}

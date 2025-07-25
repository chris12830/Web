import { requireRole } from "@/lib/auth"
import { ChildrenPageClient } from "@/components/children-page-client"
import { DemoBanner } from "@/components/demo-banner"
import { getChildrenByOrganization } from "@/lib/database"

export default async function ChildrenPage() {
  const user = await requireRole(["childcare_admin"])

  // Get children from database
  const children = await getChildrenByOrganization(user.organizationId!)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DemoBanner />
      <ChildrenPageClient children={children} />
    </div>
  )
}

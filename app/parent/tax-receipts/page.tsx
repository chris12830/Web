import { requireRole } from "@/lib/auth"
import { TaxReceiptsPageClient } from "@/components/tax-receipts-page-client"

export default async function TaxReceiptsPage() {
  const user = await requireRole(["guardian"])

  return <TaxReceiptsPageClient />
}

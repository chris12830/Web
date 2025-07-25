import { requireRole } from "@/lib/auth"
import { EmailTemplatesClient } from "@/components/email-templates-client"

export default async function EmailTemplatesPage() {
  const user = await requireRole(["childcare_admin"])

  return <EmailTemplatesClient organizationId={user.organizationId || ""} />
}

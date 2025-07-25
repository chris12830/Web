import { requireRole } from "@/lib/auth"
import { DataExport } from "@/components/data-export"

export default async function DataExportPage() {
  const user = await requireRole(["childcare_admin"])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Data Export</h1>
        <p className="text-gray-600">Export all your invoice data for accounting and reporting</p>
      </div>
      <DataExport />
    </div>
  )
}

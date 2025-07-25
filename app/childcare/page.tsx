import { requireRole } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function ChildcareDashboard() {
  const user = await requireRole(["childcare_admin", "system_admin"])

  // Get current date and time
  const now = new Date()
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }

  const currentDate = now.toLocaleDateString("en-US", dateOptions)
  const currentTime = now.toLocaleTimeString("en-US", timeOptions)

  // Get business name from user context or default
  const businessName = user.organizationName || "Sunshine Child Care Center"

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to {businessName}</h1>
            <p className="text-lg text-gray-600 mt-2">
              {currentDate} at {currentTime}
            </p>
            <p className="text-gray-500 mt-1">Your complete childcare management dashboard</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Real-Time Invoice Status Data of Your Child Care Business
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <Link href="/childcare/invoices" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Invoices Sent This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">0</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/childcare/invoices?status=unpaid" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Invoices Unpaid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">0</div>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Income Billed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Income Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Income Owing This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$0</div>
          </CardContent>
        </Card>

        <Link href="/childcare/children" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Registered Children</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">0</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/childcare/invoices/create" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Create Invoice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Generate single or bulk invoices for families</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/childcare/invoices" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Invoice Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View, track, and manage all invoices</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/childcare/children" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Manage Children</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View and manage enrolled children</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/childcare/settings" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Business Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage your childcare business settings</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/childcare/support" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Support Center</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Get help and submit support tickets</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/childcare/payment-setup" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Payment Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configure payment methods for parents</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/childcare/data-export" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Export Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Export invoice data for accounting</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

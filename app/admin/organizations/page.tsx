import { requireRole } from "@/lib/auth"
import { AdminOrganizationsClient } from "@/components/admin-organizations-client"

export default async function AdminCustomersPage() {
  const user = await requireRole(["system_admin"])

  // Sample organizations data - in production this would come from database
  const organizations = [
    {
      id: "1",
      name: "Sunshine Childcare Center",
      address: "123 Main St, Toronto, ON M5V 3A8",
      phone: "(416) 555-0123",
      email: "admin@sunshinechildcare.com",
      userCount: 3,
      invoiceCount: 45,
      status: "active",
    },
    {
      id: "2",
      name: "Little Stars Daycare",
      address: "456 Oak Ave, Vancouver, BC V6B 2N9",
      phone: "(604) 555-0456",
      email: "info@littlestars.com",
      userCount: 2,
      invoiceCount: 28,
      status: "active",
    },
    {
      id: "3",
      name: "Rainbow Kids Academy",
      address: "789 Pine Rd, Calgary, AB T2P 1J9",
      phone: "(403) 555-0789",
      email: "contact@rainbowkids.ca",
      userCount: 5,
      invoiceCount: 67,
      status: "pending",
    },
  ]

  return <AdminOrganizationsClient organizations={organizations} />
}

import { requireRole } from "@/lib/auth"
import { AdminUsersClient } from "@/components/admin-users-client"

export default async function UsersPage() {
  const user = await requireRole(["system_admin"])

  // Demo users data
  const users = [
    {
      id: "1",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "admin@sunshinechildcare.com",
      role: "childcare_admin",
      organization: "Sunshine Childcare Center",
      phone: "(555) 123-4567",
      status: "active",
    },
    {
      id: "2",
      firstName: "Mike",
      lastName: "Davis",
      email: "admin@littlestars.com",
      role: "childcare_admin",
      organization: "Little Stars Daycare",
      phone: "(555) 987-6543",
      status: "active",
    },
    {
      id: "3",
      firstName: "John",
      lastName: "Smith",
      email: "parent1@email.com",
      role: "guardian",
      organization: "Sunshine Childcare Center",
      phone: "(555) 111-2222",
      status: "active",
    },
    {
      id: "4",
      firstName: "Emily",
      lastName: "Brown",
      email: "parent2@email.com",
      role: "guardian",
      organization: "Sunshine Childcare Center",
      phone: "(555) 333-4444",
      status: "active",
    },
  ]

  return <AdminUsersClient users={users} />
}

import type React from "react"
import { requireAuth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      <main>{children}</main>
    </div>
  )
}

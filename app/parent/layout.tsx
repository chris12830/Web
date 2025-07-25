"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LayoutDashboard, FileText, CreditCard, Receipt, HelpCircle, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/parent", icon: LayoutDashboard },
  { name: "Invoices", href: "/parent/invoices", icon: FileText },
  { name: "Payments", href: "/parent/payments", icon: CreditCard },
  { name: "Tax Receipts", href: "/parent/tax-receipts", icon: Receipt },
  { name: "Support", href: "/parent/support", icon: HelpCircle },
]

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [supportTicketCount, setSupportTicketCount] = useState(0)

  // Mock user data - in real app this would come from auth
  const user = {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    organizationName: "Sunshine Daycare",
    organizationId: "org_123",
  }

  // Check for unread support responses
  useEffect(() => {
    const tickets = localStorage.getItem("parentSupportTickets")
    if (tickets) {
      const allTickets = JSON.parse(tickets)
      const userTickets = allTickets.filter((ticket: any) => ticket.customerEmail === user.email)
      const unreadCount = userTickets.filter(
        (ticket: any) =>
          ticket.responses &&
          ticket.responses.length > 0 &&
          ticket.responses.some((response: any) => response.isSupport && !response.read),
      ).length
      setSupportTicketCount(unreadCount)
    }
  }, [user.email])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo and Branding */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Image src="/child-care-logo.png" alt="Child Care Invoice" width={32} height={32} className="rounded" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Child Care Invoice</h1>
              <p className="text-sm text-purple-600 font-medium">Parent Portal</p>
              <p className="text-xs text-gray-500">Family Account</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
                {item.name === "Support" && supportTicketCount > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {supportTicketCount}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-gray-500">Parent</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

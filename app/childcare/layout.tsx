"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Users,
  FileText,
  Mail,
  CreditCard,
  Download,
  Calendar,
  HelpCircle,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/childcare", icon: BarChart3 },
  { name: "Children", href: "/childcare/children", icon: Users },
  { name: "Invoices", href: "/childcare/invoices", icon: FileText },
  { name: "Bulk Invoices", href: "/childcare/invoices/bulk", icon: FileText },
  { name: "Email Templates", href: "/childcare/email-templates", icon: Mail },
  { name: "Payment Setup", href: "/childcare/payment-setup", icon: CreditCard },
  { name: "Data Export", href: "/childcare/data-export", icon: Download },
  { name: "Age Ranges", href: "/childcare/age-ranges", icon: Calendar },
  { name: "Support", href: "/childcare/support", icon: HelpCircle },
  { name: "Settings", href: "/childcare/settings", icon: Settings },
]

export default function ChildcareLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })
      if (response.ok) {
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r min-h-screen">
        <div className="p-6">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Image src="/child-care-logo.png" alt="Child Care Invoice" width={32} height={32} className="rounded" />
              <div className="font-bold text-lg text-gray-900">Child Care Invoice</div>
            </div>
            <div className="text-sm text-green-600 font-medium">Childcare Admin</div>
            <div className="text-xs text-gray-500">Business Management</div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="mt-8 pt-6 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-4 h-4 mr-3" />
                  Childcare Admin
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

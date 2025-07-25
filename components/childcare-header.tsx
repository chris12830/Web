"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import {
  Users,
  FileText,
  Mail,
  CreditCard,
  Download,
  Settings,
  HelpCircle,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

interface ChildcareHeaderProps {
  user: {
    firstName: string
    lastName: string
    organizationName?: string
  }
}

export function ChildcareHeader({ user }: ChildcareHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
      window.location.href = "/"
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center flex-1 space-x-12">
            {/* Logo and Business Name */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Logo size="sm" showText={false} />
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-gray-900 truncate max-w-48">
                  {user.organizationName || "Childcare Center"}
                </h1>
                <p className="text-xs text-gray-500">Child Care Invoice</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-12">
              <Link
                href="/childcare"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                href="/childcare/children"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Users className="w-4 h-4" />
                <span className="font-medium">Children</span>
              </Link>

              <Link
                href="/childcare/invoices"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="font-medium">Invoices</span>
              </Link>

              <Link
                href="/childcare/email-templates"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-medium">Email Templates</span>
              </Link>

              <Link
                href="/childcare/payment-setup"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">Payment Setup</span>
              </Link>

              <Link
                href="/childcare/data-export"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Data Export</span>
              </Link>

              <Link
                href="/childcare/settings"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="font-medium">Settings</span>
              </Link>

              <Link
                href="/childcare/support"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="font-medium">Support</span>
              </Link>
            </nav>
          </div>

          {/* Right section - User Menu */}
          <div className="flex items-center flex-shrink-0">
            <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2">
                  <User className="w-4 h-4" />
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-gray-500">Child Care Admin</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, FileText, CreditCard, Receipt, MessageSquare, ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"
import { ParentSupportModal } from "@/components/parent-support-modal"

interface ParentHeaderProps {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    organizationId?: string
    organizationName?: string
  }
}

export function ParentHeader({ user }: ParentHeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = "/"
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/parent" className="flex items-center space-x-3">
                <Logo size="sm" showText={false} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900 leading-tight">Parent Portal</span>
                  <span className="text-xs text-gray-500 leading-tight">
                    {user.organizationName || "Child Care Invoice"}
                  </span>
                </div>
              </Link>

              <nav className="hidden md:flex items-center space-x-1">
                <Link
                  href="/parent"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/parent/invoices"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
                >
                  <FileText className="w-4 h-4" />
                  <span>Invoices</span>
                </Link>
                <Link
                  href="/parent/payments"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Payments</span>
                </Link>
                <Link
                  href="/parent/tax-receipts"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Tax Receipts</span>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => setShowSupportModal(true)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Support</span>
                </Button>
              </nav>
            </div>

            {/* Right side - User Menu */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50 h-10">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 leading-tight">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">Parent</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Support Modal */}
      <ParentSupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} user={user} />
    </>
  )
}

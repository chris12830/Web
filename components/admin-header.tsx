"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Users, Building2, MessageSquare, CreditCard, ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"

interface AdminHeaderProps {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo and System Name */}
            <Link href="/admin" className="flex items-center space-x-3">
              <Logo size="sm" showText={false} />
              <div>
                <div className="text-lg font-bold text-gray-900 leading-tight">System Admin</div>
                <div className="text-xs text-gray-500 leading-tight">Child Care Invoice</div>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
              >
                <Users className="w-4 h-4" />
                <span>Users</span>
              </Link>
              <Link
                href="/admin/organizations"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
              >
                <Building2 className="w-4 h-4" />
                <span>Organizations</span>
              </Link>
              <Link
                href="/admin/support"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Support Center</span>
              </Link>
              <Link
                href="/admin/payment-processing"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
              >
                <CreditCard className="w-4 h-4" />
                <span>Payment Processing</span>
              </Link>
              <Link
                href="/admin/settings"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 flex items-center space-x-1"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50 h-10 px-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900 leading-tight">System Admin</div>
                    <div className="text-xs text-gray-500 leading-tight">System Administrator</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>System Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
  )
}

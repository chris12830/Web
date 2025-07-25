"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Building2,
  Users,
  Package,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  User,
  Bell,
} from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Customers", href: "/admin/organizations", icon: Building2 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Packages", href: "/admin/packages", icon: Package },
  { name: "Payment Processing", href: "/admin/payment-processing", icon: CreditCard },
  { name: "Support", href: "/admin/support", icon: HelpCircle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [notifications] = useState([
    {
      id: "1",
      type: "registration",
      title: "New customer registration",
      message: "Sunshine Daycare has signed up",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: "2",
      type: "support",
      title: "Payment processing issue",
      message: "Support ticket #1234 needs attention",
      time: "1 hour ago",
      unread: true,
    },
  ])

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

  const unreadCount = notifications.filter((n) => n.unread).length

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
            <div className="text-sm text-blue-600 font-medium">System Admin</div>
            <div className="text-xs text-gray-500">by Plan-It Inc.</div>
          </div>

          {/* Notifications */}
          {unreadCount > 0 && (
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    {unreadCount} new notification{unreadCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications
                    .filter((n) => n.unread)
                    .map((notification) => (
                      <div key={notification.id} className="text-xs text-blue-800">
                        <div className="font-medium">{notification.title}:</div>
                        <div>{notification.message}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              const showBadge = item.name === "Support" && unreadCount > 0

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start relative ${
                      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.name}
                    {showBadge && (
                      <Badge variant="destructive" className="ml-auto text-xs">
                        {unreadCount}
                      </Badge>
                    )}
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
                  Admin User
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

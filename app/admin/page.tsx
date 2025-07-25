"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminNotifications } from "@/components/admin-notifications"
import { Building2, Users, CreditCard, TrendingUp, Package, Bell } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Customers",
      value: "24",
      change: "+3 this month",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "156",
      change: "+12 this week",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "$4,280",
      change: "+8.2% from last month",
      icon: CreditCard,
      color: "text-purple-600",
    },
    {
      title: "Package Subscriptions",
      value: "24",
      change: "3 Basic, 18 Pro, 3 Enterprise",
      icon: Package,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage the Child Care Invoice platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <AdminNotifications />

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New customer registered</p>
                  <p className="text-xs text-gray-500">Sunshine Daycare - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Package className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Package upgraded</p>
                  <p className="text-xs text-gray-500">Little Stars Learning - Basic to Professional</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment processed</p>
                  <p className="text-xs text-gray-500">$20.00 - Professional Plan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Manage Customers</h3>
                <p className="text-sm text-gray-600">View and edit customer accounts</p>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Package Settings</h3>
                <p className="text-sm text-gray-600">Configure subscription packages</p>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">Payment Processing</h3>
                <p className="text-sm text-gray-600">Monitor payment systems</p>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <Bell className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <h3 className="font-medium">Support Tickets</h3>
                <p className="text-sm text-gray-600">Handle customer support</p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

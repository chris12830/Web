"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, CreditCard, Receipt, Calendar, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  organizationId: string
  organizationName: string
}

interface ParentDashboardProps {
  user: User
}

export function EnhancedParentDashboard({ user }: ParentDashboardProps) {
  const [dashboardData, setDashboardData] = useState({
    recentInvoices: [
      {
        id: "INV-001",
        amount: 450.0,
        dueDate: "2024-01-15",
        status: "pending",
        description: "Monthly Childcare - December 2023",
      },
      {
        id: "INV-002",
        amount: 450.0,
        dueDate: "2023-12-15",
        status: "paid",
        description: "Monthly Childcare - November 2023",
      },
      {
        id: "INV-003",
        amount: 450.0,
        dueDate: "2023-11-15",
        status: "paid",
        description: "Monthly Childcare - October 2023",
      },
    ],
    upcomingPayments: [
      {
        id: "PAY-001",
        amount: 450.0,
        dueDate: "2024-02-15",
        description: "Monthly Childcare - January 2024",
      },
    ],
    children: [
      {
        id: "1",
        name: "Emma Johnson",
        ageGroup: "Toddler (2-3 years)",
        enrollmentDate: "2023-09-01",
      },
      {
        id: "2",
        name: "Liam Johnson",
        ageGroup: "Preschool (4-5 years)",
        enrollmentDate: "2023-09-01",
      },
    ],
    stats: {
      totalInvoices: 12,
      paidInvoices: 10,
      pendingInvoices: 2,
      totalPaid: 4500.0,
      pendingAmount: 900.0,
    },
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
        <p className="text-purple-100">Manage your children's invoices and payments for {user.organizationName}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalInvoices}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.stats.paidInvoices} paid, {dashboardData.stats.pendingInvoices} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.stats.totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.stats.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.stats.pendingInvoices} invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Children Enrolled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.children.length}</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Your latest invoices and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(invoice.status)}
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-gray-600">{invoice.description}</p>
                      <p className="text-xs text-gray-500">Due: {invoice.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${invoice.amount.toFixed(2)}</p>
                    <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/parent/invoices">
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Invoices
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Children */}
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Children</CardTitle>
            <CardDescription>Your children currently enrolled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.children.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-600">{child.ageGroup}</p>
                    <p className="text-xs text-gray-500">Enrolled: {child.enrollmentDate}</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/parent/invoices">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <FileText className="w-6 h-6" />
                <span>View Invoices</span>
              </Button>
            </Link>
            <Link href="/parent/payments">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <CreditCard className="w-6 h-6" />
                <span>Payment History</span>
              </Button>
            </Link>
            <Link href="/parent/tax-receipts">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Receipt className="w-6 h-6" />
                <span>Tax Receipts</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

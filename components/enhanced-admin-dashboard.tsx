"use client"
import { Logo } from "@/components/logo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, Home, User, DollarSign, Search } from "lucide-react"
import { useState } from "react"

const EnhancedAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = {
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Logo size="sm" showText={true} />
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <a
                href="#"
                className="flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
              >
                <Home className="mr-4 h-6 w-6" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100"
              >
                <User className="mr-4 h-6 w-6" />
                Children
              </a>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100"
              >
                <DollarSign className="mr-4 h-6 w-6" />
                Invoices
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Logo size="sm" showText={true} />
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <a
                  href="#"
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100"
                >
                  <Home className="mr-3 h-6 w-6" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
                >
                  <User className="mr-3 h-6 w-6" />
                  Children
                </a>
                <a
                  href="#"
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
                >
                  <DollarSign className="mr-3 h-6 w-6" />
                  Invoices
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Children</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">50</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Staff</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">10</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EnhancedAdminDashboard
// allow named import as well
export { EnhancedAdminDashboard }

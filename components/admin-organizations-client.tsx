"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  Building2,
  Users,
  FileText,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  CheckCircle,
  LinkIcon,
} from "lucide-react"
import { AddOrganizationDialog } from "@/components/add-organization-dialog"

interface Organization {
  id: string
  name: string
  address: string
  phone: string
  email: string
  userCount: number
  invoiceCount: number
  status: "active" | "inactive" | "pending"
}

interface AdminOrganizationsClientProps {
  organizations?: Organization[]
}

export function AdminOrganizationsClient({ organizations: initialOrganizations = [] }: AdminOrganizationsClientProps) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load organizations data from database and localStorage
  useEffect(() => {
    const loadOrganizations = async () => {
      setLoading(true)
      try {
        // Load from localStorage first (for demo purposes)
        const savedOrgs = localStorage.getItem("adminOrganizations")
        let allOrgs: Organization[] = []

        if (savedOrgs) {
          allOrgs = JSON.parse(savedOrgs)
        }

        // Add any new organizations from signup
        const newSignups = localStorage.getItem("newSignups")
        if (newSignups) {
          const signupData = JSON.parse(newSignups)
          for (const signup of signupData) {
            if (signup.role === "childcare_admin" && !allOrgs.find((org) => org.email === signup.email)) {
              const newOrg: Organization = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: signup.businessName || `${signup.firstName} ${signup.lastName}'s Business`,
                address:
                  `${signup.streetAddress || ""}, ${signup.city || ""}, ${signup.province || ""} ${signup.postalCode || ""}`.trim(),
                phone: signup.phone || "",
                email: signup.email,
                userCount: 1,
                invoiceCount: 0,
                status: "active",
              }
              allOrgs.push(newOrg)
            }
          }
          // Clear processed signups
          localStorage.removeItem("newSignups")
          localStorage.setItem("adminOrganizations", JSON.stringify(allOrgs))
        }

        // If no organizations exist, create some demo data
        if (allOrgs.length === 0) {
          const mockOrganizations: Organization[] = [
            {
              id: "1",
              name: "Sunshine Childcare Center",
              address: "123 Main St, Toronto, ON M5V 3A8",
              phone: "(416) 555-0123",
              email: "admin@sunshinechildcare.com",
              userCount: 3,
              invoiceCount: 45,
              status: "active",
            },
            {
              id: "2",
              name: "Little Stars Daycare",
              address: "456 Oak Ave, Vancouver, BC V6B 2N9",
              phone: "(604) 555-0456",
              email: "info@littlestars.com",
              userCount: 2,
              invoiceCount: 28,
              status: "active",
            },
            {
              id: "3",
              name: "Rainbow Kids Academy",
              address: "789 Pine Rd, Calgary, AB T2P 1J9",
              phone: "(403) 555-0789",
              email: "contact@rainbowkids.ca",
              userCount: 5,
              invoiceCount: 67,
              status: "pending",
            },
          ]
          allOrgs = mockOrganizations
          localStorage.setItem("adminOrganizations", JSON.stringify(allOrgs))
        }

        setOrganizations(allOrgs)
      } catch (error) {
        console.error("Error loading organizations:", error)
      }
      setLoading(false)
    }

    loadOrganizations()
  }, [])

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleAddOrganization = (newOrg: Omit<Organization, "id" | "userCount" | "invoiceCount" | "status">) => {
    const organization: Organization = {
      ...newOrg,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      userCount: 0,
      invoiceCount: 0,
      status: "pending",
    }

    const updatedOrgs = [...organizations, organization]
    setOrganizations(updatedOrgs)
    localStorage.setItem("adminOrganizations", JSON.stringify(updatedOrgs))
    console.log("New organization added:", organization)
  }

  const generateParentAccessLink = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId)
    if (org) {
      const baseUrl = window.location.origin
      const accessLink = `${baseUrl}/parent/signup?provider=${encodeURIComponent(org.name)}&email=${encodeURIComponent(org.email)}`

      // Copy to clipboard
      navigator.clipboard
        .writeText(accessLink)
        .then(() => {
          alert(
            `Parent Access Link Generated and Copied to Clipboard!\n\nLink: ${accessLink}\n\nShare this link with parents so they can:\n• Create their parent accounts\n• View and pay invoices\n• Access their child's information\n\nThe link will automatically associate them with "${org.name}".`,
          )
        })
        .catch(() => {
          alert(
            `Parent Access Link Generated!\n\nLink: ${accessLink}\n\nShare this link with parents so they can:\n• Create their parent accounts\n• View and pay invoices\n• Access their child's information\n\nThe link will automatically associate them with "${org.name}".`,
          )
        })
    }
  }

  const handleEditOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId)
    if (org) {
      alert(
        `Edit Organization: ${org.name}\n\nThis would open an edit form with the organization's current information.\n\nOrganization Details:\n- Email: ${org.email}\n- Phone: ${org.phone}\n- Address: ${org.address}`,
      )
    }
  }

  const handleDeleteOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId)
    if (
      org &&
      confirm(
        `Are you sure you want to delete "${org.name}"?\n\nThis action cannot be undone and will remove all associated data.`,
      )
    ) {
      const updatedOrgs = organizations.filter((o) => o.id !== orgId)
      setOrganizations(updatedOrgs)
      localStorage.setItem("adminOrganizations", JSON.stringify(updatedOrgs))
      alert(`"${org.name}" has been successfully deleted.`)
    }
  }

  const handleActivateOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId)
    if (
      org &&
      confirm(
        `Activate "${org.name}"?\n\nThis will allow the organization to access their account and start using the system.`,
      )
    ) {
      const updatedOrgs = organizations.map((org) => (org.id === orgId ? { ...org, status: "active" as const } : org))
      setOrganizations(updatedOrgs)
      localStorage.setItem("adminOrganizations", JSON.stringify(updatedOrgs))
      alert(`"${org.name}" has been successfully activated!`)
    }
  }

  const handleViewDetails = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId)
    if (org) {
      alert(
        `Organization Details: ${org.name}\n\n` +
          `Status: ${org.status.toUpperCase()}\n` +
          `Email: ${org.email}\n` +
          `Phone: ${org.phone}\n` +
          `Address: ${org.address}\n` +
          `Users: ${org.userCount}\n` +
          `Invoices: ${org.invoiceCount}\n\n` +
          `This would open a detailed view with full organization information, user management, and invoice history.`,
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading customers...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage all childcare organizations and their accounts</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{organizations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {organizations.reduce((sum, org) => sum + org.userCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">
                  {organizations.reduce((sum, org) => sum + org.invoiceCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {organizations.filter((org) => org.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search customers by name, email, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Organizations ({filteredOrganizations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrganizations.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? "No customers found matching your search." : "No customers found."}
              </p>
              <p className="text-sm text-gray-400">
                {searchTerm ? "Try adjusting your search terms." : "Add your first customer to get started."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{org.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {org.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {org.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {org.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-gray-400" />
                        {org.userCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1 text-gray-400" />
                        {org.invoiceCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(org.status)}>
                        {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(org.id)}>
                            <Building2 className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generateParentAccessLink(org.id)}>
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Generate Parent Access Link
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditOrganization(org.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Organization
                          </DropdownMenuItem>
                          {org.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleActivateOrganization(org.id)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate Account
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Users className="w-4 h-4 mr-2" />
                            Manage Users
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            View Invoices
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteOrganization(org.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddOrganizationDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddOrganization} />
    </div>
  )
}

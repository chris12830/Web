"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PackageFeature {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface PackageType {
  id: string
  name: string
  price: number
  description: string
  features: PackageFeature[]
  isActive: boolean
  maxInvoices: number
  maxChildren: number
}

interface Customer {
  id: string
  name: string
  email: string
  currentPackage: string
  status: string
  joinDate: string
}

export default function PackageManagementPage() {
  const [packages, setPackages] = useState<PackageType[]>([
    {
      id: "basic",
      name: "Basic Plan",
      price: 9,
      description: "Perfect for small child care centers",
      maxInvoices: 100,
      maxChildren: 50,
      isActive: true,
      features: [
        { id: "invoices", name: "Invoice Management", description: "Create and manage invoices", enabled: true },
        { id: "parent_portal", name: "Parent Portal", description: "Parent access to invoices", enabled: true },
        { id: "basic_reporting", name: "Basic Reporting", description: "Standard reports", enabled: true },
        { id: "support", name: "Support", description: "Email support", enabled: true },
        { id: "tax_receipts", name: "Tax Receipts", description: "Generate tax receipts", enabled: false },
        { id: "custom_branding", name: "Custom Branding", description: "Add your logo and colors", enabled: false },
        { id: "advanced_reporting", name: "Advanced Reporting", description: "Detailed analytics", enabled: false },
        { id: "api_access", name: "API Access", description: "Developer API access", enabled: false },
      ],
    },
    {
      id: "professional",
      name: "Professional Plan",
      price: 20,
      description: "Ideal for growing child care businesses",
      maxInvoices: 200,
      maxChildren: 200,
      isActive: true,
      features: [
        { id: "invoices", name: "Invoice Management", description: "Create and manage invoices", enabled: true },
        { id: "parent_portal", name: "Parent Portal", description: "Parent access to invoices", enabled: true },
        { id: "basic_reporting", name: "Basic Reporting", description: "Standard reports", enabled: true },
        { id: "support", name: "Priority Support", description: "Priority email support", enabled: true },
        { id: "tax_receipts", name: "Tax Receipts", description: "Generate tax receipts", enabled: true },
        { id: "custom_branding", name: "Custom Branding", description: "Add your logo and colors", enabled: true },
        { id: "advanced_reporting", name: "Advanced Reporting", description: "Detailed analytics", enabled: true },
        { id: "api_access", name: "API Access", description: "Developer API access", enabled: false },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 0,
      description: "For high-volume child care organizations",
      maxInvoices: -1,
      maxChildren: -1,
      isActive: true,
      features: [
        { id: "invoices", name: "Invoice Management", description: "Create and manage invoices", enabled: true },
        { id: "parent_portal", name: "Parent Portal", description: "Parent access to invoices", enabled: true },
        { id: "basic_reporting", name: "Basic Reporting", description: "Standard reports", enabled: true },
        { id: "support", name: "Priority Support", description: "Priority email support", enabled: true },
        { id: "tax_receipts", name: "Tax Receipts", description: "Generate tax receipts", enabled: true },
        { id: "custom_branding", name: "Custom Branding", description: "Add your logo and colors", enabled: true },
        { id: "advanced_reporting", name: "Advanced Reporting", description: "Detailed analytics", enabled: true },
        { id: "api_access", name: "API Access", description: "Developer API access", enabled: true },
        {
          id: "multi_location",
          name: "Multi-location Support",
          description: "Manage multiple locations",
          enabled: true,
        },
        {
          id: "custom_integrations",
          name: "Custom Integrations",
          description: "Custom API integrations",
          enabled: true,
        },
      ],
    },
  ])

  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "Sunshine Daycare",
      email: "admin@sunshinedaycare.com",
      currentPackage: "professional",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Little Stars Learning",
      email: "info@littlestars.com",
      currentPackage: "basic",
      status: "Active",
      joinDate: "2024-02-20",
    },
  ])

  const [editingPackage, setEditingPackage] = useState<string | null>(null)

  const handleFeatureToggle = (packageId: string, featureId: string) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === packageId
          ? {
              ...pkg,
              features: pkg.features.map((feature) =>
                feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature,
              ),
            }
          : pkg,
      ),
    )
  }

  const handlePackageUpdate = (packageId: string, updates: Partial<PackageType>) => {
    setPackages((prev) => prev.map((pkg) => (pkg.id === packageId ? { ...pkg, ...updates } : pkg)))
  }

  const savePackage = (packageId: string) => {
    setEditingPackage(null)
    // Here you would save to database
    console.log("Saving package:", packageId)
  }

  const getPackageName = (packageId: string) => {
    return packages.find((pkg) => pkg.id === packageId)?.name || packageId
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
          <p className="text-gray-600">Manage subscription packages and customer assignments</p>
        </div>
      </div>

      <Tabs defaultValue="packages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="packages" className="flex items-center space-x-2">
            <span>Packages</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center space-x-2">
            <span>Customer Assignments</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="space-y-6">
          <div className="grid gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{pkg.name}</span>
                      <Badge variant={pkg.isActive ? "default" : "secondary"}>
                        {pkg.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingPackage === pkg.id ? (
                      <>
                        <Button size="sm" onClick={() => savePackage(pkg.id)}>
                          <span>Save</span>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingPackage(null)}>
                          <span>Cancel</span>
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setEditingPackage(pkg.id)}>
                        <span>Edit</span>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {editingPackage === pkg.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`price-${pkg.id}`}>Price ($)</Label>
                        <Input
                          id={`price-${pkg.id}`}
                          type="number"
                          value={pkg.price}
                          onChange={(e) => handlePackageUpdate(pkg.id, { price: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`max-invoices-${pkg.id}`}>Max Invoices</Label>
                        <Input
                          id={`max-invoices-${pkg.id}`}
                          type="number"
                          value={pkg.maxInvoices === -1 ? "" : pkg.maxInvoices}
                          placeholder="Unlimited"
                          onChange={(e) =>
                            handlePackageUpdate(pkg.id, {
                              maxInvoices: e.target.value === "" ? -1 : Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`max-children-${pkg.id}`}>Max Children</Label>
                        <Input
                          id={`max-children-${pkg.id}`}
                          type="number"
                          value={pkg.maxChildren === -1 ? "" : pkg.maxChildren}
                          placeholder="Unlimited"
                          onChange={(e) =>
                            handlePackageUpdate(pkg.id, {
                              maxChildren: e.target.value === "" ? -1 : Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Price: </span>
                        {pkg.price === 0 ? "Custom Pricing" : `$${pkg.price}/month`}
                      </div>
                      <div>
                        <span className="font-medium">Max Invoices: </span>
                        {pkg.maxInvoices === -1 ? "Unlimited" : pkg.maxInvoices}
                      </div>
                      <div>
                        <span className="font-medium">Max Children: </span>
                        {pkg.maxChildren === -1 ? "Unlimited" : pkg.maxChildren}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-3">Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pkg.features.map((feature) => (
                        <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{feature.name}</div>
                            <div className="text-sm text-gray-600">{feature.description}</div>
                          </div>
                          <Switch
                            checked={feature.enabled}
                            onCheckedChange={() => handleFeatureToggle(pkg.id, feature.id)}
                            disabled={editingPackage !== pkg.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Package Assignments</CardTitle>
              <p className="text-gray-600">Manage which package each customer is subscribed to</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Current Package</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getPackageName(customer.currentPackage)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <Select defaultValue={customer.currentPackage}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.map((pkg) => (
                              <SelectItem key={pkg.id} value={pkg.id}>
                                {pkg.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

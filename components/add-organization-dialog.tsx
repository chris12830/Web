"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Organization {
  id: string
  name: string
  address: string
  phone: string
  email: string
  userCount: number
  invoiceCount: number
  status: string
}

interface AddOrganizationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (organization: Omit<Organization, "id" | "userCount" | "invoiceCount" | "status">) => void
}

export function AddOrganizationDialog({ open, onOpenChange, onAdd }: AddOrganizationDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    province: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.address || !formData.phone || !formData.email || !formData.adminEmail) {
        alert("Please fill in all required fields.")
        return
      }

      // Create organization object
      const newOrganization = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      }

      // Call the onAdd function
      onAdd(newOrganization)

      // Reset form
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        adminFirstName: "",
        adminLastName: "",
        adminEmail: "",
        province: "",
      })

      // Close dialog
      onOpenChange(false)

      // Show success message
      alert("Customer organization created successfully!")
    } catch (error) {
      console.error("Error creating organization:", error)
      alert("Error creating organization. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canadianProvinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Customer Organization</DialogTitle>
          <DialogDescription>Create a new childcare organization account. Fill in the details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organization Name */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="orgName">Organization Name *</Label>
              <Input
                id="orgName"
                placeholder="Happy Kids Daycare"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="orgAddress">Street Address *</Label>
              <Textarea
                id="orgAddress"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={2}
                required
              />
            </div>

            {/* Province */}
            <div className="space-y-2">
              <Label htmlFor="province">Province *</Label>
              <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {canadianProvinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="orgPhone">Phone Number *</Label>
              <Input
                id="orgPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="orgEmail">Organization Email *</Label>
              <Input
                id="orgEmail"
                type="email"
                placeholder="admin@happykids.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="orgWebsite">Website (Optional)</Label>
              <Input
                id="orgWebsite"
                type="url"
                placeholder="https://happykids.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="orgDescription">Description (Optional)</Label>
            <Textarea
              id="orgDescription"
              placeholder="Brief description of the childcare center..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          {/* Admin Details */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Primary Administrator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminFirstName">First Name *</Label>
                <Input
                  id="adminFirstName"
                  placeholder="Jane"
                  value={formData.adminFirstName}
                  onChange={(e) => handleInputChange("adminFirstName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminLastName">Last Name *</Label>
                <Input
                  id="adminLastName"
                  placeholder="Smith"
                  value={formData.adminLastName}
                  onChange={(e) => handleInputChange("adminLastName", e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="adminEmail">Admin Email *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="jane@happykids.com"
                  value={formData.adminEmail}
                  onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Customer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

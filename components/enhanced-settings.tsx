"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Upload, Save, Building2, DollarSign, MapPin, Phone, ImageIcon } from "lucide-react"

interface OrganizationSettings {
  name: string
  contactName: string
  email: string
  phone: string
  address: {
    number: string
    street: string
    city: string
    provinceState: string
    country: string
    postalZipCode: string
  }
  logo: string | null
  fees: {
    childCareFee: number
    clothingFee: number
    lateFee: number
    otherFee: number
    otherFeeDescription: string
  }
  taxSettings: {
    taxRate: number
    taxNumber: string
  }
  licenseNumber?: string
}

export function EnhancedSettings({ organizationName }: { organizationName: string }) {
  const [settings, setSettings] = useState<OrganizationSettings>({
    name: organizationName || "Sunshine Child Care Center",
    contactName: "Sarah Johnson",
    email: "admin@sunshinechildcare.com",
    phone: "(555) 123-4567",
    address: {
      number: "123",
      street: "Main Street",
      city: "Anytown",
      provinceState: "Ontario",
      country: "Canada",
      postalZipCode: "K1A 0A6",
    },
    logo: null,
    fees: {
      childCareFee: 25.0,
      clothingFee: 15.0,
      lateFee: 10.0,
      otherFee: 0.0,
      otherFeeDescription: "",
    },
    taxSettings: {
      taxRate: 13.0,
      taxNumber: "123456789RT0001",
    },
    licenseNumber: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("organizationSettings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
        if (parsedSettings.logo) {
          setLogoPreview(parsedSettings.logo)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }
  }, [])

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogoPreview(result)
        setSettings((prev) => ({ ...prev, logo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save settings to localStorage
      localStorage.setItem("organizationSettings", JSON.stringify(settings))

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      alert(`Settings saved successfully!

Organization: ${settings.name}
Contact: ${settings.contactName}
Email: ${settings.email}
Phone: ${settings.phone}
Address: ${settings.address.number} ${settings.address.street}, ${settings.address.city}
${settings.logo ? "Logo: Updated" : "Logo: No logo uploaded"}

All settings have been saved and will be used for invoices and system branding.`)
    } catch (error) {
      alert("Failed to save settings. Please try again.")
      console.error("Save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Settings</h1>
          <p className="text-gray-600">Manage your child care center's information and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact & Address</TabsTrigger>
          <TabsTrigger value="fees">Fees & Pricing</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Organization Information</span>
              </CardTitle>
              <CardDescription>Basic information about your child care center</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={settings.name}
                    onChange={(e) => setSettings((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your Child Care Center Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Primary Contact Name</Label>
                  <Input
                    id="contactName"
                    value={settings.contactName}
                    onChange={(e) => setSettings((prev) => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Contact person's full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxNumber">Tax/Business Number</Label>
                <Input
                  id="taxNumber"
                  value={settings.taxSettings.taxNumber}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      taxSettings: { ...prev.taxSettings, taxNumber: e.target.value },
                    }))
                  }
                  placeholder="Your business tax number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Government Child Care License Number</Label>
                <Input
                  id="licenseNumber"
                  value={settings.licenseNumber || ""}
                  onChange={(e) => setSettings((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                  placeholder="Your government child care license number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.01"
                  value={settings.taxSettings.taxRate}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      taxSettings: { ...prev.taxSettings, taxRate: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  placeholder="13.00"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Contact Information</span>
              </CardTitle>
              <CardDescription>How parents and guardians can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@yourchildcare.com"
                  />
                  <p className="text-sm text-gray-600">This email will be used for invoice copies</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Address Information</span>
              </CardTitle>
              <CardDescription>Your child care center's physical address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Number</Label>
                  <Input
                    id="number"
                    value={settings.address.number}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        address: { ...prev.address, number: e.target.value },
                      }))
                    }
                    placeholder="123"
                  />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    value={settings.address.street}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        address: { ...prev.address, street: e.target.value },
                      }))
                    }
                    placeholder="Main Street"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={settings.address.city}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value },
                      }))
                    }
                    placeholder="Anytown"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provinceState">Province/State</Label>
                  <Input
                    id="provinceState"
                    value={settings.address.provinceState}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        address: { ...prev.address, provinceState: e.target.value },
                      }))
                    }
                    placeholder="Ontario"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={settings.address.country}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        address: { ...prev.address, country: e.target.value },
                      }))
                    }
                    placeholder="Canada"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalZipCode">Postal Code/ZIP Code</Label>
                  <Input
                    id="postalZipCode"
                    value={settings.address.postalZipCode}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        address: { ...prev.address, postalZipCode: e.target.value },
                      }))
                    }
                    placeholder="K1A 0A6"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Additional Fees</span>
              </CardTitle>
              <CardDescription>Configure additional fees that can be added to invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="childCareFee">Child Care Fee ($)</Label>
                  <Input
                    id="childCareFee"
                    type="number"
                    step="0.01"
                    value={settings.fees.childCareFee}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        fees: { ...prev.fees, childCareFee: Number.parseFloat(e.target.value) || 0 },
                      }))
                    }
                    placeholder="25.00"
                  />
                  <p className="text-sm text-gray-600">Standard child care service fee</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clothingFee">Clothing Fee ($)</Label>
                  <Input
                    id="clothingFee"
                    type="number"
                    step="0.01"
                    value={settings.fees.clothingFee}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        fees: { ...prev.fees, clothingFee: Number.parseFloat(e.target.value) || 0 },
                      }))
                    }
                    placeholder="15.00"
                  />
                  <p className="text-sm text-gray-600">Fee for clothing changes or supplies</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lateFee">Late Fee ($)</Label>
                  <Input
                    id="lateFee"
                    type="number"
                    step="0.01"
                    value={settings.fees.lateFee}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        fees: { ...prev.fees, lateFee: Number.parseFloat(e.target.value) || 0 },
                      }))
                    }
                    placeholder="10.00"
                  />
                  <p className="text-sm text-gray-600">Fee for late pickup or payment</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherFee">Other Fee ($)</Label>
                  <Input
                    id="otherFee"
                    type="number"
                    step="0.01"
                    value={settings.fees.otherFee}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        fees: { ...prev.fees, otherFee: Number.parseFloat(e.target.value) || 0 },
                      }))
                    }
                    placeholder="0.00"
                  />
                  <p className="text-sm text-gray-600">Miscellaneous fee amount</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherFeeDescription">Other Fee Description</Label>
                <Textarea
                  id="otherFeeDescription"
                  value={settings.fees.otherFeeDescription}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      fees: { ...prev.fees, otherFeeDescription: e.target.value },
                    }))
                  }
                  placeholder="Describe what the other fee covers..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Fee Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Child Care:</span>
                    <span className="font-bold ml-2">${settings.fees.childCareFee}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Clothing:</span>
                    <span className="font-bold ml-2">${settings.fees.clothingFee}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Late Fee:</span>
                    <span className="font-bold ml-2">${settings.fees.lateFee}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Other:</span>
                    <span className="font-bold ml-2">${settings.fees.otherFee}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Organization Logo</span>
              </CardTitle>
              <CardDescription>Upload your logo to appear on invoices and throughout the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Upload Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-600">Recommended: PNG or JPG, max 2MB, square format works best</p>
                  </div>

                  {logoPreview && (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setLogoPreview(null)
                          setSettings((prev) => ({ ...prev, logo: null }))
                          // Clear the file input
                          const fileInput = document.getElementById("logo") as HTMLInputElement
                          if (fileInput) {
                            fileInput.value = ""
                          }
                        }}
                      >
                        Remove Logo
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <Label>Logo Preview</Label>
                  <div className="mt-2 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center min-h-[200px]">
                    {logoPreview ? (
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-2 flex items-center justify-center bg-white rounded-lg border shadow-sm">
                          <img
                            src={logoPreview || "/placeholder.svg"}
                            alt="Logo Preview"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              console.error("Logo preview error:", e)
                              // Fallback to default logo if image fails to load
                              setLogoPreview(null)
                              setSettings((prev) => ({ ...prev, logo: null }))
                            }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">Your uploaded logo</p>
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Logo will be saved when you click "Save All Changes"
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-2 flex items-center justify-center bg-white rounded-lg border">
                          <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">No logo uploaded</p>
                        <p className="text-xs text-gray-500">Upload a custom logo above</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Logo Usage</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Invoice headers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Email notifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Parent portal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>System branding</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

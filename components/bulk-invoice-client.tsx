"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, DollarSign, Send, ArrowLeft, ArrowRight, CheckCircle, Mail, FileText, Baby, User } from "lucide-react"

interface Child {
  id: string
  name: string
  age: number
  ageGroup: string
  parentName: string
  parentEmail: string
}

interface SelectedFamily {
  parentName: string
  parentEmail: string
  children: Child[]
}

interface ServiceOption {
  id: string
  name: string
  rate: number
  description: string
}

const mockChildren: Child[] = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 2,
    ageGroup: "Infant",
    parentName: "Sarah Johnson",
    parentEmail: "sarah.johnson@email.com",
  },
  {
    id: "2",
    name: "Liam Smith",
    age: 18,
    ageGroup: "Toddler",
    parentName: "Mike Smith",
    parentEmail: "mike.smith@email.com",
  },
  {
    id: "3",
    name: "Olivia Brown",
    age: 36,
    ageGroup: "Preschool",
    parentName: "Lisa Brown",
    parentEmail: "lisa.brown@email.com",
  },
  {
    id: "4",
    name: "Noah Davis",
    age: 48,
    ageGroup: "Pre-K",
    parentName: "John Davis",
    parentEmail: "john.davis@email.com",
  },
  {
    id: "5",
    name: "Ava Wilson",
    age: 12,
    ageGroup: "Infant",
    parentName: "Emily Wilson",
    parentEmail: "emily.wilson@email.com",
  },
  {
    id: "6",
    name: "Lucas Miller",
    age: 24,
    ageGroup: "Toddler",
    parentName: "David Miller",
    parentEmail: "david.miller@email.com",
  },
  {
    id: "7",
    name: "Sophia Garcia",
    age: 42,
    ageGroup: "Preschool",
    parentName: "Maria Garcia",
    parentEmail: "maria.garcia@email.com",
  },
  {
    id: "8",
    name: "Mason Rodriguez",
    age: 54,
    ageGroup: "Pre-K",
    parentName: "Carlos Rodriguez",
    parentEmail: "carlos.rodriguez@email.com",
  },
]

const serviceOptions: ServiceOption[] = [
  {
    id: "monthly_infant",
    name: "Monthly Care - Infant",
    rate: 1400,
    description: "Full-time monthly care for infants (0-18 months)",
  },
  {
    id: "monthly_toddler",
    name: "Monthly Care - Toddler",
    rate: 1200,
    description: "Full-time monthly care for toddlers (18 months - 3 years)",
  },
  {
    id: "monthly_preschool",
    name: "Monthly Care - Preschool",
    rate: 1100,
    description: "Full-time monthly care for preschoolers (3-4 years)",
  },
  {
    id: "monthly_prek",
    name: "Monthly Care - Pre-K",
    rate: 1000,
    description: "Full-time monthly care for pre-kindergarten (4-5 years)",
  },
  { id: "custom", name: "Custom Rate", rate: 0, description: "Set a custom rate for specific services" },
]

const ageGroupIcons = {
  Infant: Baby,
  Toddler: User,
  Preschool: User,
  "Pre-K": User,
}

export function BulkInvoiceClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedChildren, setSelectedChildren] = useState<string[]>([])
  const [selectedService, setSelectedService] = useState<string>("")
  const [customRate, setCustomRate] = useState<number>(0)
  const [dueDate, setDueDate] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [sendCopy, setSendCopy] = useState<boolean>(false)
  const [businessEmail, setBusinessEmail] = useState<string>("admin@sunshinechildcare.com")

  // Load business email from organization settings
  useEffect(() => {
    const loadBusinessEmail = () => {
      try {
        const savedSettings = localStorage.getItem("organizationSettings")
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          if (parsedSettings.email) {
            setBusinessEmail(parsedSettings.email)
          }
        }
      } catch (error) {
        console.error("Error loading business email:", error)
      }
    }

    loadBusinessEmail()
  }, [])

  // Group children by parent
  const groupedFamilies = mockChildren.reduce(
    (acc, child) => {
      const key = `${child.parentName}-${child.parentEmail}`
      if (!acc[key]) {
        acc[key] = {
          parentName: child.parentName,
          parentEmail: child.parentEmail,
          children: [],
        }
      }
      acc[key].children.push(child)
      return acc
    },
    {} as Record<string, SelectedFamily>,
  )

  const families = Object.values(groupedFamilies)

  // Get selected families
  const selectedFamilies = families.filter((family) =>
    family.children.some((child) => selectedChildren.includes(child.id)),
  )

  // Calculate totals
  const selectedService_obj = serviceOptions.find((s) => s.id === selectedService)
  const rate = selectedService === "custom" ? customRate : selectedService_obj?.rate || 0
  const totalAmount = selectedChildren.length * rate
  const tax = totalAmount * 0.13 // 13% HST
  const grandTotal = totalAmount + tax

  // Group children by age group for display
  const childrenByAgeGroup = mockChildren.reduce(
    (acc, child) => {
      if (!acc[child.ageGroup]) {
        acc[child.ageGroup] = []
      }
      acc[child.ageGroup].push(child)
      return acc
    },
    {} as Record<string, Child[]>,
  )

  const handleSelectAll = () => {
    if (selectedChildren.length === mockChildren.length) {
      setSelectedChildren([])
    } else {
      setSelectedChildren(mockChildren.map((child) => child.id))
    }
  }

  const handleSelectByAgeGroup = (ageGroup: string) => {
    const ageGroupChildren = childrenByAgeGroup[ageGroup]
    const ageGroupIds = ageGroupChildren.map((child) => child.id)
    const allSelected = ageGroupIds.every((id) => selectedChildren.includes(id))

    if (allSelected) {
      setSelectedChildren((prev) => prev.filter((id) => !ageGroupIds.includes(id)))
    } else {
      setSelectedChildren((prev) => [...new Set([...prev, ...ageGroupIds])])
    }
  }

  const handleChildToggle = (childId: string) => {
    setSelectedChildren((prev) => (prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSendInvoices = () => {
    alert(`Bulk invoices sent successfully!

${selectedFamilies.length} families will receive invoices
${selectedChildren.length} children included
Service: ${selectedService_obj?.name || "Custom Rate"}
Rate: $${rate} per child
Total Amount: $${grandTotal.toFixed(2)}
Due Date: ${dueDate}
${sendCopy ? `Copy sent to: ${businessEmail}` : "No copy sent"}

All invoices have been generated and sent to parents.`)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Invoice Generation</h1>
          <p className="text-gray-600">Create and send invoices to multiple families at once</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Step {currentStep} of 3
        </Badge>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
          </div>
          <span className="ml-2 font-medium">Select Families</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-300"></div>
        <div className={`flex items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
          </div>
          <span className="ml-2 font-medium">Configure Invoice</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-300"></div>
        <div className={`flex items-center ${currentStep >= 3 ? "text-blue-600" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            "3"
          </div>
          <span className="ml-2 font-medium">Review & Send</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Step 1: Select Families */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Select Families and Children
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleSelectAll}
                    variant={selectedChildren.length === mockChildren.length ? "default" : "outline"}
                    size="sm"
                  >
                    {selectedChildren.length === mockChildren.length ? "Deselect All" : "Select All"}
                  </Button>
                  {Object.keys(childrenByAgeGroup).map((ageGroup) => {
                    const ageGroupChildren = childrenByAgeGroup[ageGroup]
                    const ageGroupIds = ageGroupChildren.map((child) => child.id)
                    const allSelected = ageGroupIds.every((id) => selectedChildren.includes(id))
                    const IconComponent = ageGroupIcons[ageGroup as keyof typeof ageGroupIcons]

                    return (
                      <Button
                        key={ageGroup}
                        onClick={() => handleSelectByAgeGroup(ageGroup)}
                        variant={allSelected ? "default" : "outline"}
                        size="sm"
                        className="flex items-center"
                      >
                        <IconComponent className="w-4 h-4 mr-1" />
                        {ageGroup} ({ageGroupChildren.length})
                      </Button>
                    )
                  })}
                </div>

                <div className="space-y-6">
                  {Object.entries(childrenByAgeGroup).map(([ageGroup, children]) => (
                    <div key={ageGroup}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        {React.createElement(ageGroupIcons[ageGroup as keyof typeof ageGroupIcons], {
                          className: "w-5 h-5 mr-2",
                        })}
                        {ageGroup} ({children.length} children)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {children.map((child) => (
                          <div
                            key={child.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedChildren.includes(child.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleChildToggle(child.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                checked={selectedChildren.includes(child.id)}
                                onChange={() => handleChildToggle(child.id)}
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{child.name}</p>
                                <p className="text-sm text-gray-600">{child.age} months old</p>
                                <p className="text-sm text-gray-500">Parent: {child.parentName}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Configure Invoice */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Configure Invoice Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="service">Service Type</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500">
                              {service.id !== "custom" ? `$${service.rate}/month` : service.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedService === "custom" && (
                  <div>
                    <Label htmlFor="customRate">Custom Rate ($)</Label>
                    <Input
                      id="customRate"
                      type="number"
                      value={customRate}
                      onChange={(e) => setCustomRate(Number.parseFloat(e.target.value) || 0)}
                      placeholder="Enter custom rate"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="notes">Invoice Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional notes for the invoice..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="sendCopy" checked={sendCopy} onCheckedChange={setSendCopy} />
                  <Label htmlFor="sendCopy" className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Send copy to my business email
                  </Label>
                </div>

                {sendCopy && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="businessEmail">Business Email</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="your-business@email.com"
                    />
                    <p className="text-sm text-gray-600">
                      You can update your default business email in Settings → Contact & Address
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Send */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Review and Send Invoices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Invoice Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Service:</span>
                      <span className="ml-2 font-medium">{selectedService_obj?.name || "Custom Rate"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Rate per child:</span>
                      <span className="ml-2 font-medium">${rate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Children:</span>
                      <span className="ml-2 font-medium">{selectedChildren.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Due Date:</span>
                      <span className="ml-2 font-medium">{dueDate || "Not set"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Families Receiving Invoices</h3>
                  <div className="space-y-3">
                    {selectedFamilies.map((family, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{family.parentName}</p>
                            <p className="text-sm text-gray-600">{family.parentEmail}</p>
                            <p className="text-sm text-gray-500">
                              Children:{" "}
                              {family.children
                                .filter((child) => selectedChildren.includes(child.id))
                                .map((child) => child.name)
                                .join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              $
                              {(
                                family.children.filter((child) => selectedChildren.includes(child.id)).length *
                                rate *
                                1.13
                              ).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {family.children.filter((child) => selectedChildren.includes(child.id)).length} child(ren)
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {notes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Invoice Notes</h3>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{notes}</p>
                    </div>
                  </div>
                )}

                {sendCopy && (
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800">
                      A copy of all invoices will be sent to: <strong>{businessEmail}</strong>
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Selected Children:</span>
                  <span className="font-medium">{selectedChildren.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Families:</span>
                  <span className="font-medium">{selectedFamilies.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rate per child:</span>
                  <span className="font-medium">${rate}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">HST (13%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {currentStep === 1 && (
                  <Button onClick={handleNext} className="w-full" disabled={selectedChildren.length === 0}>
                    Continue to Configure
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}

                {currentStep === 2 && (
                  <div className="space-y-2">
                    <Button onClick={handleBack} variant="outline" className="w-full bg-transparent">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Selection
                    </Button>
                    <Button onClick={handleNext} className="w-full" disabled={!selectedService || !dueDate}>
                      Review Invoices
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-2">
                    <Button onClick={handleBack} variant="outline" className="w-full bg-transparent">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Configure
                    </Button>
                    <Button onClick={handleSendInvoices} className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send All Invoices
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

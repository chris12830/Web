"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Download, Mail, Building2, Upload, X } from "lucide-react"
import jsPDF from "jspdf"

interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface ContractorDetails {
  name: string
  address: string
  email: string
  phone: string
}

interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  notes: string
}

interface CompanyDetails {
  name: string
  tagline: string
  logo: string | null
}

export default function InvoiceGenerator() {
  const [company, setCompany] = useState<CompanyDetails>({
    name: "Your Company Name",
    tagline: "Professional Services",
    logo: null,
  })

  const [contractor, setContractor] = useState<ContractorDetails>({
    name: "",
    address: "",
    email: "",
    phone: "",
  })

  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    notes: "",
  })

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ])

  const [taxRate, setTaxRate] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setLineItems([...lineItems, newItem])
  }

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id))
    }
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCompany({ ...company, logo: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setCompany({ ...company, logo: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const generatePDF = () => {
    const doc = new jsPDF()

    // Set font
    doc.setFont("helvetica")

    // Header
    doc.setFontSize(24)
    doc.setTextColor(40, 40, 40)
    doc.text("INVOICE", 20, 30)

    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text(`Invoice #${invoice.invoiceNumber}`, 20, 40)

    // Company info
    const companyYPos = 60

    // Add logo if available
    if (company.logo) {
      try {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)

          const imgData = canvas.toDataURL("image/jpeg", 0.8)
          doc.addImage(imgData, "JPEG", 20, companyYPos - 10, 15, 15)

          // Adjust company name position
          doc.setFontSize(16)
          doc.setTextColor(40, 40, 40)
          doc.text(company.name, 40, companyYPos)
          doc.setFontSize(10)
          doc.setTextColor(100, 100, 100)
          doc.text(company.tagline, 40, companyYPos + 8)
        }
        img.src = company.logo
      } catch (error) {
        console.error("Error adding logo to PDF:", error)
      }
    } else {
      doc.setFontSize(16)
      doc.setTextColor(40, 40, 40)
      doc.text(company.name, 20, companyYPos)
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(company.tagline, 20, companyYPos + 8)
    }

    // Invoice details (right side)
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("Invoice Date:", 140, 60)
    doc.text("Due Date:", 140, 68)

    doc.setTextColor(40, 40, 40)
    doc.text(formatDate(invoice.date), 170, 60)
    doc.text(formatDate(invoice.dueDate), 170, 68)

    // Bill To section
    doc.setFontSize(12)
    doc.setTextColor(40, 40, 40)
    doc.text("Bill To:", 20, 90)

    doc.setFontSize(10)
    let yPos = 100
    if (contractor.name) {
      doc.text(contractor.name, 20, yPos)
      yPos += 8
    }
    if (contractor.address) {
      const addressLines = contractor.address.split("\n")
      addressLines.forEach((line) => {
        doc.text(line, 20, yPos)
        yPos += 6
      })
      yPos += 2
    }
    if (contractor.email) {
      doc.text(contractor.email, 20, yPos)
      yPos += 8
    }
    if (contractor.phone) {
      doc.text(contractor.phone, 20, yPos)
      yPos += 8
    }

    // Line items table
    yPos += 10
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)

    // Table headers
    doc.text("Description", 20, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Rate", 140, yPos)
    doc.text("Amount", 170, yPos)

    // Table header line
    yPos += 2
    doc.setDrawColor(200, 200, 200)
    doc.line(20, yPos, 190, yPos)
    yPos += 8

    // Table rows
    doc.setTextColor(40, 40, 40)
    lineItems.forEach((item) => {
      if (item.description || item.quantity > 0 || item.rate > 0) {
        // Handle long descriptions
        const description = item.description || "No description"
        const splitDescription = doc.splitTextToSize(description, 90)

        doc.text(splitDescription, 20, yPos)
        doc.text(item.quantity.toString(), 120, yPos)
        doc.text(`$${item.rate.toFixed(2)}`, 140, yPos)
        doc.text(formatCurrency(item.amount), 170, yPos)

        yPos += Math.max(8, splitDescription.length * 6)
      }
    })

    // Totals section
    yPos += 10
    doc.setDrawColor(200, 200, 200)
    doc.line(120, yPos, 190, yPos)
    yPos += 8

    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("Subtotal:", 140, yPos)
    doc.setTextColor(40, 40, 40)
    doc.text(formatCurrency(subtotal), 170, yPos)
    yPos += 8

    if (taxRate > 0) {
      doc.setTextColor(100, 100, 100)
      doc.text(`Tax (${taxRate}%):`, 140, yPos)
      doc.setTextColor(40, 40, 40)
      doc.text(formatCurrency(taxAmount), 170, yPos)
      yPos += 8
    }

    // Total line
    doc.setDrawColor(200, 200, 200)
    doc.line(120, yPos, 190, yPos)
    yPos += 8

    doc.setFontSize(12)
    doc.setTextColor(40, 40, 40)
    doc.text("Total:", 140, yPos)
    doc.setFont("helvetica", "bold")
    doc.text(formatCurrency(total), 170, yPos)

    // Notes section
    if (invoice.notes) {
      yPos += 20
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text("Notes:", 20, yPos)
      yPos += 8

      doc.setTextColor(40, 40, 40)
      const noteLines = doc.splitTextToSize(invoice.notes, 170)
      doc.text(noteLines, 20, yPos)
    }

    // Save the PDF
    doc.save(`invoice-${invoice.invoiceNumber}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome Message */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Create New Invoice</h2>
                <p className="text-gray-600">Fill in the details below to generate your professional invoice</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header */}
        <Card className="border-0 shadow-md overflow-hidden">
          <CardContent className="p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                {company.logo ? (
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg transform transition-all duration-200 hover:scale-105">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
                  <p className="text-gray-600">{company.tagline}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
                <p className="text-gray-600 mt-1">#{invoice.invoiceNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-gray-900">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-name" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="company-name"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  placeholder="Enter your company name"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="company-tagline" className="text-sm font-medium text-gray-700">
                  Tagline
                </Label>
                <Input
                  id="company-tagline"
                  value={company.tagline}
                  onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                  placeholder="Enter your company tagline"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Company Logo</Label>
              <div className="mt-1 flex items-center gap-4">
                {company.logo ? (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-gray-300"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Change Logo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeLogo}
                        className="border-gray-300 text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-gray-300 border-dashed h-16 px-6"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Recommended: Square image, max 2MB (PNG, JPG, SVG)</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contractor Details */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-gray-900">Bill To</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contractor-name" className="text-sm font-medium text-gray-700">
                  Contractor Name
                </Label>
                <Input
                  id="contractor-name"
                  value={contractor.name}
                  onChange={(e) => setContractor({ ...contractor, name: e.target.value })}
                  placeholder="Enter contractor name"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="contractor-address" className="text-sm font-medium text-gray-700">
                  Address
                </Label>
                <Textarea
                  id="contractor-address"
                  value={contractor.address}
                  onChange={(e) => setContractor({ ...contractor, address: e.target.value })}
                  placeholder="Enter contractor address"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contractor-email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="contractor-email"
                    type="email"
                    value={contractor.email}
                    onChange={(e) => setContractor({ ...contractor, email: e.target.value })}
                    placeholder="email@example.com"
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="contractor-phone" className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <Input
                    id="contractor-phone"
                    value={contractor.phone}
                    onChange={(e) => setContractor({ ...contractor, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-gray-900">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="invoice-number" className="text-sm font-medium text-gray-700">
                  Invoice Number
                </Label>
                <Input
                  id="invoice-number"
                  value={invoice.invoiceNumber}
                  onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoice-date" className="text-sm font-medium text-gray-700">
                    Invoice Date
                  </Label>
                  <Input
                    id="invoice-date"
                    type="date"
                    value={invoice.date}
                    onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="due-date" className="text-sm font-medium text-gray-700">
                    Due Date
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={invoice.dueDate}
                    onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tax-rate" className="text-sm font-medium text-gray-700">
                  Tax Rate (%)
                </Label>
                <Input
                  id="tax-rate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  placeholder="0"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Items */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg font-medium text-gray-900">Line Items</CardTitle>
              <Button
                onClick={addLineItem}
                size="sm"
                className="bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-md transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:-mx-6">
              <div className="inline-block min-w-full align-middle px-4 sm:px-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-700 font-medium">Description</TableHead>
                      <TableHead className="text-gray-700 font-medium w-20 sm:w-24">Qty</TableHead>
                      <TableHead className="text-gray-700 font-medium w-28 sm:w-32">Price/Rate</TableHead>
                      <TableHead className="text-gray-700 font-medium w-28 sm:w-32">Amount</TableHead>
                      <TableHead className="w-10 sm:w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lineItems.map((item) => (
                      <TableRow key={item.id} className="border-gray-200">
                        <TableCell className="py-3">
                          <Input
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                            placeholder="Description of work performed"
                            className="border-0 p-0 h-auto focus-visible:ring-0 focus:border-0"
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, "quantity", Number(e.target.value))}
                            className="border-0 p-0 h-auto focus-visible:ring-0 focus:border-0"
                            min="0"
                            step="0.01"
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateLineItem(item.id, "rate", Number(e.target.value))}
                            className="border-0 p-0 h-auto focus-visible:ring-0 focus:border-0"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </TableCell>
                        <TableCell className="font-medium py-3">{formatCurrency(item.amount)}</TableCell>
                        <TableCell className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLineItem(item.id)}
                            disabled={lineItems.length === 1}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Totals and Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Notes */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-gray-900">Notes & Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={invoice.notes}
                onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
                placeholder="Payment terms, additional notes, or special instructions..."
                rows={6}
                className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </CardContent>
          </Card>

          {/* Totals */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-gray-900">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax ({taxRate}%)</span>
                  <span className="font-medium">{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <Separator className="bg-gray-200" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                variant="outline"
                className="flex items-center border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                onClick={generatePDF}
              >
                <Download className="w-4 h-4 mr-2" />
                Download as PDF
              </Button>
              <Button className="flex items-center bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-md transition-all duration-200">
                <Mail className="w-4 h-4 mr-2" />
                Send via Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

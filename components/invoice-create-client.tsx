"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, FileText, DollarSign, Mail, Eye } from "lucide-react"
import Link from "next/link"
import { InvoicePreviewModal } from "./invoice-preview-modal"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface Child {
  id: string
  name: string
  guardian: string
  ageRange: string
  email: string
}

interface FeeItem {
  id: string
  name: string
  rate: number
  description: string
}

interface InvoiceCreateClientProps {
  organizationId: string
}

export function InvoiceCreateClient({ organizationId }: InvoiceCreateClientProps) {
  const [invoiceType, setInvoiceType] = useState<"single" | "bulk">("single")
  const [selectedChild, setSelectedChild] = useState("")
  const [selectedChildren, setSelectedChildren] = useState<string[]>([])
  const [dueDate, setDueDate] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")
  const [defaultNote, setDefaultNote] = useState("Payment due within 30 days. Late fees may apply after due date.")
  const [sendCopyToAdmin, setSendCopyToAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [showPreview, setShowPreview] = useState(false)

  // Load organization settings to get admin email
  const loadOrganizationSettings = () => {
    const settings = localStorage.getItem("organizationSettings")
    if (settings) {
      const parsedSettings = JSON.parse(settings)
      return parsedSettings.email || "admin@yourchildcare.com"
    }
    return "admin@yourchildcare.com"
  }

  // Initialize admin email from organization settings
  useState(() => {
    setAdminEmail(loadOrganizationSettings())
  })

  // Demo data for fees & pricing
  const feeItems: FeeItem[] = [
    { id: "1", name: "Monthly Full-Time Care", rate: 1200.0, description: "Full-time childcare services" },
    { id: "2", name: "Monthly Part-Time Care", rate: 800.0, description: "Part-time childcare services" },
    { id: "3", name: "Monthly Infant Care", rate: 1400.0, description: "Specialized infant care" },
    { id: "4", name: "Child Care Fee", rate: 25.0, description: "Additional childcare fee" },
    { id: "5", name: "Clothing Fee", rate: 15.0, description: "Clothing changes or supplies" },
    { id: "6", name: "Late Fee", rate: 10.0, description: "Late pickup or payment fee" },
    { id: "7", name: "Extended Hours", rate: 15.0, description: "After-hours care per hour" },
    { id: "8", name: "Field Trip Fee", rate: 20.0, description: "Educational field trip" },
  ]

  // Demo children data with age ranges
  const children: Child[] = [
    { id: "1", name: "Emma Smith", guardian: "John Smith", ageRange: "2-3 years", email: "john.smith@email.com" },
    { id: "2", name: "Liam Brown", guardian: "Emily Brown", ageRange: "1-18 months", email: "emily.brown@email.com" },
    {
      id: "3",
      name: "Sophia Wilson",
      guardian: "David Wilson",
      ageRange: "6-12 months",
      email: "david.wilson@email.com",
    },
    {
      id: "4",
      name: "Oliver Johnson",
      guardian: "Sarah Johnson",
      ageRange: "3-4 years",
      email: "sarah.johnson@email.com",
    },
    { id: "5", name: "Ava Davis", guardian: "Michael Davis", ageRange: "4-5 years", email: "michael.davis@email.com" },
    {
      id: "6",
      name: "Noah Miller",
      guardian: "Jessica Miller",
      ageRange: "2-3 years",
      email: "jessica.miller@email.com",
    },
  ]

  const addItemFromFees = (feeId: string) => {
    const fee = feeItems.find((f) => f.id === feeId)
    if (!fee) return

    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: fee.name,
      quantity: 1,
      rate: fee.rate,
      amount: fee.rate,
    }

    setItems([...items, newItem])
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "rate") {
            updated.amount = updated.quantity * updated.rate
          }
          return updated
        }
        return item
      }),
    )
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const addCustomItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setItems([...items, newItem])
  }

  const toggleChildSelection = (childId: string) => {
    if (selectedChildren.includes(childId)) {
      setSelectedChildren(selectedChildren.filter((id) => id !== childId))
    } else {
      setSelectedChildren([...selectedChildren, childId])
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxRate = 13.0 // HST in Ontario
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount

  const generateInvoiceNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `INV-${year}${month}-${random}`
  }

  const handlePreviewInvoice = () => {
    if (invoiceType === "single" && selectedChild) {
      setShowPreview(true)
    }
  }

  const handleSendInvoice = () => {
    const finalNotes = [defaultNote, notes].filter(Boolean).join("\n\n")

    if (invoiceType === "single") {
      const child = children.find((c) => c.id === selectedChild)
      alert(`Invoice Sent Successfully!

Invoice #: ${generateInvoiceNumber()}
Child: ${child?.name}
Guardian: ${child?.guardian}
Email: ${child?.email}
Items: ${items.length}
Subtotal: $${subtotal.toFixed(2)}
Tax (${taxRate}%): $${taxAmount.toFixed(2)}
Total: $${total.toFixed(2)}
Due Date: ${dueDate}
${sendCopyToAdmin ? `Copy sent to: ${adminEmail}` : ""}

Reminder email content:
"Dear ${child?.guardian}, your invoice for ${child?.name} is now due. Please log into your parent portal to view and pay your invoice. Thank you!"`)
    } else {
      const selectedChildrenData = children.filter((c) => selectedChildren.includes(c.id))
      const totalBulkAmount = total * selectedChildren.length

      alert(`Bulk Invoices Sent Successfully!

Selected Children: ${selectedChildren.length}
${selectedChildrenData.map((c) => `• ${c.name} – ${c.guardian} – ${c.ageRange}`).join("\n")}

Per Invoice:
Items: ${items.length}
Subtotal: $${subtotal.toFixed(2)}
Tax (${taxRate}%): $${taxAmount.toFixed(2)}
Total: $${total.toFixed(2)}

Total Bulk Amount: $${totalBulkAmount.toFixed(2)}
Due Date: ${dueDate}
${sendCopyToAdmin ? `Copy sent to: ${adminEmail}` : ""}`)
    }

    // Reset form
    setItems([])
    setSelectedChild("")
    setSelectedChildren([])
    setDueDate("")
    setNotes("")
    setSendCopyToAdmin(false)
    setShowPreview(false)
  }

  const getPreviewData = () => {
    const child = children.find((c) => c.id === selectedChild)
    return {
      invoiceNumber: generateInvoiceNumber(),
      childName: child?.name || "",
      guardianName: child?.guardian || "",
      guardianEmail: child?.email || "",
      ageRange: child?.ageRange || "",
      invoiceDate,
      dueDate,
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
      defaultNote,
      sendCopyToAdmin,
      adminEmail,
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
          <p className="text-gray-600">Generate single or bulk invoices for families</p>
        </div>
        <Link href="/childcare">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button
                  variant={invoiceType === "single" ? "default" : "outline"}
                  onClick={() => setInvoiceType("single")}
                >
                  Single Invoice
                </Button>
                <Button variant={invoiceType === "bulk" ? "default" : "outline"} onClick={() => setInvoiceType("bulk")}>
                  Bulk Invoices
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Child/Children Selection */}
          <Card>
            <CardHeader>
              <CardTitle>{invoiceType === "single" ? "Select Child" : "Select Children"}</CardTitle>
            </CardHeader>
            <CardContent>
              {invoiceType === "single" ? (
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a child" />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name} – {child.guardian} – {child.ageRange}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">
                    Select multiple children for bulk invoicing ({selectedChildren.length} selected)
                  </p>
                  <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedChildren.includes(child.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => toggleChildSelection(child.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{child.name}</span>
                            <span className="text-gray-600"> – {child.guardian}</span>
                            <span className="text-gray-500"> – {child.ageRange}</span>
                          </div>
                          {selectedChildren.includes(child.id) && <Badge variant="default">Selected</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Invoice Items</span>
                <div className="flex space-x-2">
                  <Select onValueChange={addItemFromFees}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add from Fees & Pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      {feeItems.map((fee) => (
                        <SelectItem key={fee.id} value={fee.id}>
                          {fee.name} - ${fee.rate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addCustomItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Custom Item
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items added. Use the dropdown above to add items from Fees & Pricing or add a custom item.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-20">Qty</TableHead>
                      <TableHead className="w-32">Rate</TableHead>
                      <TableHead className="w-24">Amount</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Item description"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                            min="1"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) => updateItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                            min="0"
                            max="10000"
                            placeholder="Up to $10,000"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">${item.amount.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removeItem(item.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="defaultNote">Default Note (appears on all invoices)</Label>
                <Textarea
                  id="defaultNote"
                  value={defaultNote}
                  onChange={(e) => setDefaultNote(e.target.value)}
                  placeholder="Enter terms and conditions or default notes for all invoices"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add specific notes for this invoice"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sendCopy" checked={sendCopyToAdmin} onCheckedChange={setSendCopyToAdmin} />
                  <Label htmlFor="sendCopy" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Send copy to my business email
                  </Label>
                </div>

                {sendCopyToAdmin && (
                  <div>
                    <Label htmlFor="adminEmail">Business Email Address</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="Enter your business email address"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      This email can be updated in Settings → Contact & Address
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoiceType === "bulk" && (
                <div className="pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span>Selected Children:</span>
                    <span className="font-semibold">{selectedChildren.length}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total{invoiceType === "bulk" ? " (per invoice)" : ""}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {invoiceType === "bulk" && selectedChildren.length > 0 && (
                  <div className="flex justify-between font-bold text-lg text-blue-600 border-t pt-2">
                    <span>Bulk Total:</span>
                    <span>${(total * selectedChildren.length).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {invoiceType === "single" && (
                  <Button
                    onClick={handlePreviewInvoice}
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled={items.length === 0 || !dueDate || !selectedChild}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Invoice
                  </Button>
                )}

                <Button
                  onClick={handleSendInvoice}
                  className="w-full"
                  disabled={
                    items.length === 0 ||
                    !dueDate ||
                    (invoiceType === "single" && !selectedChild) ||
                    (invoiceType === "bulk" && selectedChildren.length === 0)
                  }
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {invoiceType === "single" ? "Send Invoice" : `Send ${selectedChildren.length} Invoices`}
                </Button>
              </div>

              {invoiceType === "bulk" && selectedChildren.length > 0 && (
                <div className="text-xs text-gray-600 mt-2">
                  This will create {selectedChildren.length} individual invoices with the same items and due date.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      <InvoicePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        invoiceData={getPreviewData()}
        onSend={handleSendInvoice}
      />
    </div>
  )
}

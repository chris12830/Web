"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Calendar, DollarSign } from "lucide-react"

interface TaxReceipt {
  id: string
  receiptNumber: string
  year: number
  childName: string
  totalAmount: number
  issuedDate: string
  status: "available" | "downloaded"
}

export function TaxReceiptsPageClient() {
  const [selectedYear, setSelectedYear] = useState("2024")

  // Sample tax receipts data
  const [taxReceipts, setTaxReceipts] = useState<TaxReceipt[]>([
    {
      id: "1",
      receiptNumber: "TR-2024-001",
      year: 2024,
      childName: "Emma Smith",
      totalAmount: 15588.0,
      issuedDate: "2024-01-31",
      status: "available",
    },
    {
      id: "2",
      receiptNumber: "TR-2023-001",
      year: 2023,
      childName: "Emma Smith",
      totalAmount: 14200.0,
      issuedDate: "2023-01-31",
      status: "downloaded",
    },
  ])

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

  const handleDownloadReceipt = (receipt: TaxReceipt) => {
    // Create a tax receipt document
    const receiptContent = `
TAX RECEIPT FOR CHILDCARE EXPENSES
${receipt.receiptNumber}

Issued to: John Smith
Child: ${receipt.childName}
Tax Year: ${receipt.year}

CHILDCARE EXPENSES SUMMARY:
Total Paid in ${receipt.year}: ${formatCurrency(receipt.totalAmount)}

This receipt is for income tax purposes and confirms the amount paid for childcare services.

Sunshine Child Care Center
123 Main Street, Anytown, ON K1A 0A6
Phone: (555) 123-4567
License #: CC-2024-001
Tax #: 123456789RT0001

Receipt Date: ${formatDate(receipt.issuedDate)}
    `.trim()

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Tax-Receipt-${receipt.receiptNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Update status to downloaded
    setTaxReceipts((prev) => prev.map((r) => (r.id === receipt.id ? { ...r, status: "downloaded" as const } : r)))

    alert(`Tax receipt ${receipt.receiptNumber} has been downloaded successfully!`)
  }

  const filteredReceipts = taxReceipts.filter(
    (receipt) => selectedYear === "all" || receipt.year.toString() === selectedYear,
  )

  const availableYears = [...new Set(taxReceipts.map((r) => r.year))].sort((a, b) => b - a)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Receipts</h1>
          <p className="text-gray-600">Download your annual childcare tax receipts for income tax purposes</p>
        </div>
      </div>

      {/* Year Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter by Year</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tax Receipts List */}
      <div className="grid gap-4">
        {filteredReceipts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tax receipts found</h3>
              <p className="text-gray-500 text-center">
                Tax receipts will be available after the end of each tax year.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredReceipts.map((receipt) => (
            <Card key={receipt.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Tax Receipt {receipt.year}
                  </CardTitle>
                  <Badge variant={receipt.status === "downloaded" ? "secondary" : "default"}>
                    {receipt.status === "downloaded" ? "Downloaded" : "Available"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Receipt Number</p>
                      <p className="font-medium">{receipt.receiptNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Tax Year</p>
                      <p className="font-medium">{receipt.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium text-lg">{formatCurrency(receipt.totalAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Child: {receipt.childName}</p>
                      <p className="text-sm text-gray-600">Issued: {formatDate(receipt.issuedDate)}</p>
                    </div>
                    <Button onClick={() => handleDownloadReceipt(receipt)} className="bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>About Tax Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Tax receipts are issued annually by January 31st for the previous tax year</p>
            <p>• These receipts can be used to claim childcare expenses on your income tax return</p>
            <p>• Keep these receipts for your records as they may be required by tax authorities</p>
            <p>• Contact us if you need a replacement receipt or have questions about your childcare expenses</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

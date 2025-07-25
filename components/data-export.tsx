"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Download, FileSpreadsheet, Calculator } from "lucide-react"

export function DataExport() {
  const [exportType, setExportType] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const exportOptions = [
    { value: "excel", label: "Excel/Sheets", icon: FileSpreadsheet, description: "Export to Excel or Google Sheets" },
    { value: "qbo", label: "QuickBooks Online", icon: Calculator, description: "Export to QuickBooks Online" },
    { value: "csv", label: "CSV", icon: FileSpreadsheet, description: "Comma-separated values file" },
  ]

  const generateSampleData = () => {
    return [
      {
        InvoiceNumber: "INV-2024-001",
        ChildName: "Emma Smith",
        GuardianName: "John Smith",
        GuardianEmail: "john.smith@email.com",
        Amount: 1299.0,
        DueDate: "2024-01-15",
        Status: "Paid",
        SentDate: "2024-01-01",
        PaidDate: "2024-01-10",
        AgeRange: "Toddlers",
        Services: "Full Day Care - January 2024",
      },
      {
        InvoiceNumber: "INV-2024-002",
        ChildName: "Liam Brown",
        GuardianName: "Emily Brown",
        GuardianEmail: "emily.brown@email.com",
        Amount: 866.0,
        DueDate: "2024-01-15",
        Status: "Overdue",
        SentDate: "2024-01-01",
        PaidDate: "",
        AgeRange: "Preschoolers",
        Services: "Half Day Care - January 2024",
      },
      {
        InvoiceNumber: "INV-2024-003",
        ChildName: "Sophia Wilson",
        GuardianName: "David Wilson",
        GuardianEmail: "david.wilson@email.com",
        Amount: 1515.5,
        DueDate: "2024-02-15",
        Status: "Sent",
        SentDate: "2024-02-01",
        PaidDate: "",
        AgeRange: "Infants",
        Services: "Full Day Care + Extras - February 2024",
      },
    ]
  }

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return ""

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Escape commas and quotes in CSV
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    return csvContent
  }

  const convertToQBO = (data: any[]) => {
    // QBO format (simplified IIF format)
    let qboContent = "!TRNS\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO\n"

    data.forEach((invoice) => {
      qboContent += `INVOICE\t${invoice.SentDate}\tAccounts Receivable\t${invoice.GuardianName}\t${invoice.Amount}\t${invoice.Services}\n`
    })

    return qboContent
  }

  const convertToExcel = (data: any[]) => {
    // Create a simple tab-separated format that Excel can read
    if (data.length === 0) return ""

    const headers = Object.keys(data[0])
    const excelContent = [
      headers.join("\t"),
      ...data.map((row) => headers.map((header) => row[header]).join("\t")),
    ].join("\n")

    return excelContent
  }

  const handleExport = () => {
    if (!exportType) {
      alert("Please select an export format")
      return
    }

    const sampleData = generateSampleData()
    let content = ""
    let mimeType = ""
    let fileExtension = ""

    switch (exportType) {
      case "csv":
        content = convertToCSV(sampleData)
        mimeType = "text/csv"
        fileExtension = "csv"
        break
      case "excel":
        content = convertToExcel(sampleData)
        mimeType = "application/vnd.ms-excel"
        fileExtension = "xls"
        break
      case "qbo":
        content = convertToQBO(sampleData)
        mimeType = "application/vnd.intuit.qbo"
        fileExtension = "iif"
        break
      default:
        alert("Invalid export format")
        return
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `childcare-data-export-${exportType}-${new Date().toISOString().split("T")[0]}.${fileExtension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert(
      `Data exported successfully to ${exportType.toUpperCase()} format!\n\nFile contains ${sampleData.length} sample invoice records.`,
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Export All Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Export Format</Label>
          <div className="grid grid-cols-1 gap-3">
            {exportOptions.map((option) => (
              <div
                key={option.value}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  exportType === option.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setExportType(option.value)}
              >
                <div className="flex items-center space-x-3">
                  <option.icon className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <Button onClick={handleExport} className="w-full" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </CardContent>
    </Card>
  )
}

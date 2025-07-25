"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Download, FileSpreadsheet, Calculator, Building2, FileText } from "lucide-react"
import { useState } from "react"

interface ExportAccountingProps {
  organizationId?: string
  invoices?: any[]
}

export function ExportAccounting({ organizationId, invoices = [] }: ExportAccountingProps) {
  const [exportFormat, setExportFormat] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const exportFormats = [
    { value: "quickbooks", label: "QuickBooks Online", icon: Calculator, description: "Direct import to QuickBooks" },
    { value: "xero", label: "Xero", icon: Building2, description: "Compatible with Xero accounting" },
    { value: "sage", label: "Sage 50", icon: FileText, description: "Sage 50 compatible format" },
    { value: "excel", label: "Excel/CSV", icon: FileSpreadsheet, description: "Universal spreadsheet format" },
  ]

  const handleExport = async () => {
    if (!exportFormat) return

    setIsExporting(true)

    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create export data based on format
      const exportData = {
        format: exportFormat,
        dateRange: { start: startDate, end: endDate },
        invoices: invoices.length,
        timestamp: new Date().toISOString(),
      }

      // Trigger download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `childcare-invoices-${exportFormat}-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      alert(`Successfully exported ${invoices.length} invoices to ${exportFormat.toUpperCase()} format!`)
    } catch (error) {
      alert("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export to Accounting Software</span>
        </CardTitle>
        <CardDescription>
          Export your invoice data to popular accounting platforms for seamless bookkeeping
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Export Format</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportFormats.map((format) => (
              <div
                key={format.value}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  exportFormat === format.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setExportFormat(format.value)}
              >
                <div className="flex items-center space-x-3">
                  <format.icon className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{format.label}</div>
                    <div className="text-sm text-gray-600">{format.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Quick Date Ranges</Label>
          <Select
            value={dateRange}
            onValueChange={(value) => {
              setDateRange(value)
              const today = new Date()
              const currentYear = today.getFullYear()
              const currentMonth = today.getMonth()

              switch (value) {
                case "this-month":
                  setStartDate(new Date(currentYear, currentMonth, 1).toISOString().split("T")[0])
                  setEndDate(today.toISOString().split("T")[0])
                  break
                case "last-month":
                  setStartDate(new Date(currentYear, currentMonth - 1, 1).toISOString().split("T")[0])
                  setEndDate(new Date(currentYear, currentMonth, 0).toISOString().split("T")[0])
                  break
                case "this-year":
                  setStartDate(new Date(currentYear, 0, 1).toISOString().split("T")[0])
                  setEndDate(today.toISOString().split("T")[0])
                  break
                case "last-year":
                  setStartDate(new Date(currentYear - 1, 0, 1).toISOString().split("T")[0])
                  setEndDate(new Date(currentYear - 1, 11, 31).toISOString().split("T")[0])
                  break
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Export Summary</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Total Invoices: {invoices.length}</p>
            <p>
              • Format: {exportFormat ? exportFormats.find((f) => f.value === exportFormat)?.label : "Not selected"}
            </p>
            <p>• Date Range: {startDate && endDate ? `${startDate} to ${endDate}` : "Not specified"}</p>
          </div>
        </div>

        <Button onClick={handleExport} disabled={!exportFormat || isExporting} className="w-full" size="lg">
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

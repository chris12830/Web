"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { CreditCard, Building, DollarSign, Settings, TrendingUp } from "lucide-react"

interface PaymentProcessor {
  id: string
  name: string
  type: "stripe" | "square" | "paypal"
  status: "active" | "inactive" | "pending"
  apiKey: string
  secretKey: string
  webhookUrl: string
  processingFee: number
}

export function AdminPaymentProcessingClient({ user }: { user: any }) {
  const [processors, setProcessors] = useState<PaymentProcessor[]>([
    {
      id: "1",
      name: "Primary Stripe Account",
      type: "stripe",
      status: "active",
      apiKey: "pk_live_xxxxxxxxxxxx",
      secretKey: "sk_live_xxxxxxxxxxxx",
      webhookUrl: "https://api.childcareinvoice.com/webhooks/stripe",
      processingFee: 2.9,
    },
    {
      id: "2",
      name: "Backup Square Account",
      type: "square",
      status: "inactive",
      apiKey: "sq_live_xxxxxxxxxxxx",
      secretKey: "sq_secret_xxxxxxxxxxxx",
      webhookUrl: "https://api.childcareinvoice.com/webhooks/square",
      processingFee: 2.6,
    },
  ])

  const [newProcessor, setNewProcessor] = useState({
    name: "",
    type: "stripe" as const,
    apiKey: "",
    secretKey: "",
    processingFee: 2.9,
  })

  const handleAddProcessor = () => {
    const processor: PaymentProcessor = {
      id: Date.now().toString(),
      ...newProcessor,
      status: "pending",
      webhookUrl: `https://api.childcareinvoice.com/webhooks/${newProcessor.type}`,
    }

    setProcessors([...processors, processor])
    setNewProcessor({
      name: "",
      type: "stripe",
      apiKey: "",
      secretKey: "",
      processingFee: 2.9,
    })

    alert("Payment processor added successfully!")
  }

  const toggleProcessorStatus = (id: string) => {
    setProcessors(
      processors.map((p) => (p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const activeProcessors = processors.filter((p) => p.status === "active").length
  const totalRevenue = 12450
  const thisMonthTransactions = 186

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Processing Management</h1>
        <p className="text-gray-600">Configure credit card processing for Child Care Businesses</p>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
              Active Processors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeProcessors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-green-600" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{thisMonthTransactions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Building className="w-4 h-4 mr-2 text-orange-600" />
              Connected Businesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Existing Processors */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Processors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processors.map((processor) => (
                  <TableRow key={processor.id}>
                    <TableCell className="font-medium">{processor.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{processor.type.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(processor.status)}>{processor.status}</Badge>
                    </TableCell>
                    <TableCell>{processor.processingFee}%</TableCell>
                    <TableCell>
                      <Switch
                        checked={processor.status === "active"}
                        onCheckedChange={() => toggleProcessorStatus(processor.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add New Processor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Add Payment Processor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="processorName">Processor Name</Label>
              <Input
                id="processorName"
                value={newProcessor.name}
                onChange={(e) => setNewProcessor({ ...newProcessor, name: e.target.value })}
                placeholder="e.g., Main Stripe Account"
              />
            </div>

            <div>
              <Label htmlFor="processorType">Processor Type</Label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newProcessor.type}
                onChange={(e) => setNewProcessor({ ...newProcessor, type: e.target.value as any })}
              >
                <option value="stripe">Stripe</option>
                <option value="square">Square</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={newProcessor.apiKey}
                onChange={(e) => setNewProcessor({ ...newProcessor, apiKey: e.target.value })}
                placeholder="pk_live_..."
                type="password"
              />
            </div>

            <div>
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input
                id="secretKey"
                value={newProcessor.secretKey}
                onChange={(e) => setNewProcessor({ ...newProcessor, secretKey: e.target.value })}
                placeholder="sk_live_..."
                type="password"
              />
            </div>

            <div>
              <Label htmlFor="processingFee">Processing Fee (%)</Label>
              <Input
                id="processingFee"
                type="number"
                step="0.1"
                value={newProcessor.processingFee}
                onChange={(e) => setNewProcessor({ ...newProcessor, processingFee: Number.parseFloat(e.target.value) })}
                placeholder="2.9"
              />
            </div>

            <Button
              onClick={handleAddProcessor}
              className="w-full"
              disabled={!newProcessor.name || !newProcessor.apiKey || !newProcessor.secretKey}
            >
              Add Payment Processor
            </Button>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Setup Instructions</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>1. Create account with your chosen payment processor</li>
                <li>2. Obtain API keys from your processor dashboard</li>
                <li>3. Configure webhook URLs for payment notifications</li>
                <li>4. Test the integration before going live</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

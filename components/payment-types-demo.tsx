"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Repeat, Settings, DollarSign } from "lucide-react"

export function PaymentTypesDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const paymentTypes = [
    {
      id: "subscription",
      title: "SaaS Subscription",
      description: "Monthly recurring payments for childcare centers",
      icon: Repeat,
      example: {
        amount: "$59/month",
        plan: "Professional Plan",
        features: ["Up to 200 children", "Advanced reporting", "Priority support"],
      },
      code: `// Subscription Payment
const subscriptionData = {
  plan: "PROFESSIONAL",
  organizationName: "Little Stars Daycare"
}

<PaymentButton 
  type="SUBSCRIPTION" 
  data={subscriptionData}
>
  Subscribe to Professional Plan
</PaymentButton>`,
    },
    {
      id: "invoice",
      title: "Invoice Payment",
      description: "One-time payments for childcare invoices",
      icon: DollarSign,
      example: {
        amount: "$450.00",
        invoice: "INV-2024-001",
        child: "Emma Johnson",
      },
      code: `// Invoice Payment
const invoiceData = {
  invoiceId: "inv_123",
  amount: 450.00,
  description: "Childcare Invoice INV-2024-001"
}

<PaymentButton 
  type="INVOICE_PAYMENT" 
  data={invoiceData}
>
  Pay Invoice
</PaymentButton>`,
    },
    {
      id: "setup",
      title: "Save Payment Method",
      description: "Store payment methods for future use",
      icon: Settings,
      example: {
        purpose: "Future Payments",
        security: "Tokenized Storage",
        usage: "Auto-pay invoices",
      },
      code: `// Setup Payment Method
<PaymentButton 
  type="SETUP_PAYMENT_METHOD" 
  data={{}}
>
  Add Payment Method
</PaymentButton>`,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Types in Your System</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="subscription" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {paymentTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id}>
                  {type.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {paymentTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <TabsContent key={type.id} value={type.id} className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{type.title}</h3>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Example Usage</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {Object.entries(type.example).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">{key}:</span>
                            <Badge variant="outline">{value}</Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Code Example</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                          <code>{type.code}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

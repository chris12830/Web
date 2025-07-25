"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Banknote, Building, FileText, Save } from "lucide-react"

export function PaymentMethodConfig() {
  const [paymentMethods, setPaymentMethods] = useState({
    cash: { enabled: true, instructions: "Please bring exact change to the front desk." },
    bankEft: { enabled: true, instructions: "Bank details will be provided upon request." },
    credit: { enabled: true, instructions: "Secure online payments via Stripe." },
    cheque: { enabled: false, instructions: "Make cheques payable to Sunshine Child Care." },
  })

  const handleToggle = (method: string) => {
    setPaymentMethods((prev) => ({
      ...prev,
      [method]: { ...prev[method], enabled: !prev[method].enabled },
    }))
  }

  const handleInstructionsChange = (method: string, instructions: string) => {
    setPaymentMethods((prev) => ({
      ...prev,
      [method]: { ...prev[method], instructions },
    }))
  }

  const handleSave = () => {
    alert("Payment method settings saved successfully!")
  }

  const methodConfig = [
    { key: "cash", label: "Cash", icon: Banknote, description: "Accept cash payments" },
    { key: "bankEft", label: "Bank EFT", icon: Building, description: "Electronic fund transfers" },
    { key: "credit", label: "Credit Card", icon: CreditCard, description: "Online credit card payments" },
    { key: "cheque", label: "Cheque", icon: FileText, description: "Paper cheque payments" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {methodConfig.map((method) => (
          <div key={method.key} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <method.icon className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-base font-medium">{method.label}</Label>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
              <Switch checked={paymentMethods[method.key].enabled} onCheckedChange={() => handleToggle(method.key)} />
            </div>

            {paymentMethods[method.key].enabled && (
              <div className="space-y-2">
                <Label htmlFor={`${method.key}-instructions`}>Instructions for Parents</Label>
                <Textarea
                  id={`${method.key}-instructions`}
                  value={paymentMethods[method.key].instructions}
                  onChange={(e) => handleInstructionsChange(method.key, e.target.value)}
                  placeholder="Enter instructions for parents..."
                  rows={2}
                />
              </div>
            )}
          </div>
        ))}

        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Payment Settings
        </Button>
      </CardContent>
    </Card>
  )
}

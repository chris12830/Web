"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Building, DollarSign, FileText, Save } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  enabled: boolean
  processingFee?: string
}

export function PaymentSetupClient({ user }: { user: any }) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "credit",
      name: "Credit Card",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, American Express - Processed securely online",
      enabled: true,
      processingFee: "2.9% + $0.30",
    },
    {
      id: "bank_eft",
      name: "Bank EFT",
      icon: <Building className="w-5 h-5" />,
      description: "Electronic fund transfer directly from bank account (sent by parent via email)",
      enabled: true,
      processingFee: "Free",
    },
    {
      id: "cash",
      name: "Cash",
      icon: <DollarSign className="w-5 h-5" />,
      description: "Physical cash payments at your facility",
      enabled: true,
      processingFee: "No fees",
    },
    {
      id: "cheque",
      name: "Cheque",
      icon: <FileText className="w-5 h-5" />,
      description: "Traditional paper cheques",
      enabled: false,
      processingFee: "No fees",
    },
  ])

  const [isSaving, setIsSaving] = useState(false)

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method)),
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Payment methods updated successfully!")
    } catch (error) {
      alert("Failed to save payment methods. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const enabledMethods = paymentMethods.filter((method) => method.enabled)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Setup</h1>
          <p className="text-gray-600">Configure which payment methods are available to parents and guardians</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Payment Methods Configuration */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Available Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">{method.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  {method.processingFee && (
                    <p
                      className={`text-xs mt-1 ${method.processingFee === "Free" ? "text-green-600 font-medium" : "text-gray-500"}`}
                    >
                      Processing fee: {method.processingFee}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={method.enabled ? "default" : "secondary"}>
                  {method.enabled ? "Enabled" : "Disabled"}
                </Badge>
                <Switch checked={method.enabled} onCheckedChange={() => togglePaymentMethod(method.id)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Parent Invoice Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Available Payment Methods:</h4>
            {enabledMethods.length === 0 ? (
              <p className="text-gray-500">No payment methods enabled</p>
            ) : (
              <div className="space-y-2">
                {enabledMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    {method.icon}
                    <span className="font-medium">{method.name}</span>
                    <span className="text-sm text-gray-600">- {method.description}</span>
                    {method.processingFee === "Free" && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        FREE
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            This is how payment methods will appear on invoices sent to parents and guardians.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

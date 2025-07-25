"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CreditCard, Database, CheckCircle, AlertCircle } from "lucide-react"

export function StripeFlowDiagram() {
  const steps = [
    {
      id: 1,
      title: "User Clicks Pay",
      description: "Parent clicks 'Pay Invoice' button",
      component: "PaymentButton.tsx",
      icon: CreditCard,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Create Payment Session",
      description: "API creates Stripe checkout session",
      component: "/api/create-payment-session",
      icon: Database,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Redirect to Stripe",
      description: "User redirected to secure Stripe checkout",
      component: "Stripe Checkout",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Payment Processing",
      description: "Stripe processes the payment securely",
      component: "Stripe Infrastructure",
      icon: CheckCircle,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 5,
      title: "Webhook Notification",
      description: "Stripe sends payment confirmation",
      component: "/api/webhooks/stripe",
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 6,
      title: "Update Database",
      description: "Mark invoice as paid in database",
      component: "Database Update",
      icon: Database,
      color: "bg-green-100 text-green-600",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6" />
            <span>Stripe Payment Flow in Your System</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{step.title}</h3>
                      <Badge variant="outline">{step.component}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && <ArrowRight className="w-5 h-5 text-gray-400" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, CreditCard, Server, CheckCircle } from "lucide-react"

export function StripeSecurityInfo() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "PCI DSS Compliant",
      description: "Stripe handles all sensitive card data, keeping you compliant",
      status: "Built-in",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All payment data is encrypted in transit and at rest",
      status: "Automatic",
    },
    {
      icon: Eye,
      title: "No Card Data Storage",
      description: "Your server never sees or stores actual card numbers",
      status: "Secure",
    },
    {
      icon: CreditCard,
      title: "Tokenization",
      description: "Card details are replaced with secure tokens",
      status: "Protected",
    },
    {
      icon: Server,
      title: "Webhook Verification",
      description: "All webhook events are cryptographically verified",
      status: "Verified",
    },
    {
      icon: CheckCircle,
      title: "Fraud Detection",
      description: "Advanced machine learning prevents fraudulent transactions",
      status: "AI-Powered",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-green-600" />
          <span>Security & Compliance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{feature.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

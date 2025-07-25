"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Star, Building2, Users, FileText, Zap, AlertCircle } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

// Check if Stripe key is available
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
console.log("Stripe key available:", !!stripePublishableKey)

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

const plans = [
  {
    id: "STARTER",
    name: "Starter",
    price: 29,
    description: "Perfect for small childcare centers",
    features: ["Up to 50 children", "Unlimited invoices", "Parent portal access", "Basic reporting", "Email support"],
    popular: false,
    icon: Building2,
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: 59,
    description: "Ideal for growing childcare businesses",
    features: [
      "Up to 200 children",
      "Unlimited invoices",
      "Parent portal access",
      "Advanced reporting",
      "Tax receipt generation",
      "Priority support",
      "Custom branding",
    ],
    popular: true,
    icon: Users,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: 99,
    description: "For large childcare organizations",
    features: [
      "Unlimited children",
      "Unlimited invoices",
      "Parent portal access",
      "Advanced reporting",
      "Tax receipt generation",
      "Priority support",
      "Custom branding",
      "API access",
      "Multi-location support",
    ],
    popular: false,
    icon: Zap,
  },
]

export function PricingClient() {
  const [loading, setLoading] = useState<string | null>(null)
  const [organizationName, setOrganizationName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    setLoading(planId)
    setError(null)

    // Basic validation
    if (!organizationName.trim()) {
      setError("Please enter your organization name")
      setLoading(null)
      return
    }

    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      setError("Please enter a valid email address")
      setLoading(null)
      return
    }

    if (!stripePromise) {
      setError("Payment system is not configured. Please contact support.")
      setLoading(null)
      return
    }

    try {
      console.log("Starting payment process for plan:", planId)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planId,
          organizationName: organizationName.trim(),
          customerEmail: customerEmail.trim(),
        }),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        throw new Error(errorData.details || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Response data:", data)

      // Prefer the direct URL when we’re inside an iframe (v0 preview)
      if (data?.url) {
        // Open in a new tab to avoid iframe-navigation restrictions
        window.open(data.url as string, "_blank", "noopener,noreferrer")
        return
      }

      // Fallback to Stripe.js redirect for normal deployments
      if (data?.sessionId) {
        const stripe = await stripePromise
        if (!stripe) throw new Error("Stripe failed to load")

        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId as string,
        })
        if (stripeError) throw stripeError
      } else {
        throw new Error("No sessionId or url returned from server")
      }
    } catch (error) {
      console.error("Payment Error:", error)
      setError(error instanceof Error ? error.message : "Payment failed. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Customer Information Form */}
        <div className="max-w-md mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Your Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                type="text"
                placeholder="e.g., Sunshine Daycare"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Email Address *</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="your@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card
                key={plan.id}
                className={`relative border-0 shadow-xl transition-all duration-200 hover:shadow-2xl ${
                  plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1 flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Most Popular</span>
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id || !stripePromise}
                    className={`w-full py-3 transition-all duration-200 ${
                      plan.popular
                        ? "bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {loading === plan.id ? "Processing..." : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Debug Information */}
        {!stripePublishableKey && (
          <div className="mt-8 max-w-2xl mx-auto p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800 text-sm">
                <strong>Setup Required:</strong> Stripe publishable key is missing. Please add
                NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.
              </p>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Child Care Invoice?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Setup</h3>
              <p className="text-gray-600">Get started in minutes with our intuitive setup process</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Parent Portal</h3>
              <p className="text-gray-600">Parents can view invoices and make payments online</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tax Receipts</h3>
              <p className="text-gray-600">Automatic tax receipt generation for parents</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade security and encryption to protect your data.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer support?</h3>
              <p className="text-gray-600">
                Yes, all plans include support. Professional and Enterprise plans get priority support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

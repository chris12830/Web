"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { SocialShare } from "@/components/social-share"
import { CheckCircle, Users, FileText, CreditCard, ArrowRight, Zap, Shield, HelpCircle, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"
import { loginAction } from "./actions/auth"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function HomePage() {
  const [state, action, isPending] = useActionState(loginAction, null)
  const [showLogin, setShowLogin] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = (planId: string, price: number) => {
    setSelectedPlan(planId)
    // Redirect to payment with plan details
    window.location.href = `/pricing?plan=${planId}&price=${price}`
  }

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Professional Invoicing",
      description: "Create beautiful, professional invoices with your logo and branding",
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Parent Portal",
      description: "Give parents 24/7 access to invoices, payments, and tax receipts",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      title: "Secure Payments",
      description: "Accept credit cards, bank transfers with Stripe integration",
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Tax Compliance",
      description: "Automated tax receipts and accounting software integration",
    },
  ]

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 9,
      yearlyPrice: 99,
      period: "month",
      description: "Perfect for small child care centers",
      features: ["Up to 100 invoices per month", "Parent portal access", "Basic reporting", "Support"],
      popular: false,
      buttonText: "Start Free Trial",
    },
    {
      id: "professional",
      name: "Professional Plan",
      price: 20,
      yearlyPrice: 200,
      period: "month",
      description: "Ideal for growing child care businesses",
      features: [
        "Up to 200 invoices per month",
        "Advanced age-based pricing",
        "Accounting software integration",
        "Automated tax receipts",
        "Priority support",
        "Custom branding",
      ],
      popular: true,
      buttonText: "Start Free Trial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: null,
      yearlyPrice: null,
      period: "custom",
      description: "For high-volume child care organizations",
      features: [
        "More than 200 invoices per month",
        "Multi-location support",
        "Advanced analytics",
        "API access",
        "Custom integrations",
      ],
      popular: false,
      buttonText: "Contact Support",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with Login */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showText={true} />
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("https://www.planitinc.ca", "_blank")}
                className="text-gray-600 hover:text-gray-900"
              >
                Plan-It Inc
              </Button>
              <Link href="/about">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  About
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("mailto:support@childcareinvoice.com?subject=Child Care Invoice Support", "_blank")
                }
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
              <Button variant="outline" onClick={() => setShowLogin(!showLogin)}>
                Sign In
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Logo size="md" showText={false} />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
              <CardDescription className="text-gray-600">Access your Child Care Invoice account</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={action} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {state?.error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{state.error}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowLogin(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    {isPending ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <Logo size="xl" showText={true} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              A Complete and Simple Invoicing and Billing Solution for All{" "}
              <span className="text-blue-600">Child Care Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Manage your invoices, track your payments, reconcile your payments and provide guardians/parents with
              access to their invoices and payments history. Reduce your administration burden with this simple to setup
              and use child care invoice system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                onClick={() => (window.location.href = "/signup")}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent"
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex justify-center mb-16">
            <SocialShare />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Child Care Centers Love Our Platform
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to streamline your billing and reduce administrative work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-100 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your child care center</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular ? "border-blue-500 border-2 shadow-lg" : "border-0 shadow-md"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    {plan.price ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600">/{plan.period}</span>
                        {plan.yearlyPrice && (
                          <div className="text-sm text-gray-600 mt-1">
                            or ${plan.yearlyPrice}/year (save ${plan.price * 12 - plan.yearlyPrice})
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">Custom Pricing</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    onClick={() => handlePlanSelect(plan.id, plan.price)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            See How Simple It Is for Child Care Business Owners
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-700">Interactive Demo Coming Soon</p>
                <p className="text-gray-600">See how easy it is to manage your child care invoicing</p>
              </div>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Getting Started?</h2>
            <p className="text-xl mb-8 text-blue-100">Our support team is here to help you every step of the way</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Thank you for contacting us! We'll respond within 24 hours.")
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Name</Label>
                      <Input id="contactName" required placeholder="Your full name" />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input id="contactEmail" type="email" required placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactOrganization">Child Care Business Name</Label>
                    <Input id="contactOrganization" placeholder="Your business name" />
                  </div>
                  <div>
                    <Label htmlFor="contactSubject">Subject</Label>
                    <Input id="contactSubject" required placeholder="How can we help?" />
                  </div>
                  <div>
                    <Label htmlFor="contactMessage">Message</Label>
                    <Textarea
                      id="contactMessage"
                      required
                      placeholder="Please describe your question or issue..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Plan-It Inc. All rights reserved. Child Care Invoice Management System.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

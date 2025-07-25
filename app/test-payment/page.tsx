"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function TestPaymentPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const results = []

    // Test 1: Check environment variables
    results.push({
      test: "Stripe Publishable Key",
      status: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      message: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        ? "✅ Key is present"
        : "❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing",
    })

    // Test 2: Test API endpoint
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: "STARTER",
          organizationName: "Test Organization",
          customerEmail: "test@example.com",
        }),
      })

      const data = await response.json()

      results.push({
        test: "API Endpoint",
        status: response.ok,
        message: response.ok
          ? `✅ API working - Session ID: ${data.sessionId?.substring(0, 20)}...`
          : `❌ API Error: ${data.error || "Unknown error"}`,
      })
    } catch (error) {
      results.push({
        test: "API Endpoint",
        status: false,
        message: `❌ Network Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    }

    // Test 3: Stripe library loading
    try {
      const { loadStripe } = await import("@stripe/stripe-js")
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

      results.push({
        test: "Stripe Library",
        status: !!stripe,
        message: stripe ? "✅ Stripe library loaded successfully" : "❌ Failed to load Stripe",
      })
    } catch (error) {
      results.push({
        test: "Stripe Library",
        status: false,
        message: `❌ Stripe Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    }

    setTestResults(results)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Payment System Diagnostics</CardTitle>
            <p className="text-gray-600">Test your Stripe integration setup</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={runTests} disabled={loading} className="w-full">
              {loading ? "Running Tests..." : "Run Diagnostic Tests"}
            </Button>

            {testResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Test Results:</h3>
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.status ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {result.status ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-medium">{result.test}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{result.message}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Add your Stripe keys to environment variables</li>
                <li>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...</li>
                <li>STRIPE_SECRET_KEY=sk_test_...</li>
                <li>Restart your development server</li>
                <li>Use test card: 4242424242424242</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

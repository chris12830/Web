"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Building2, Users, FileText } from "lucide-react"

export function SubscriptionSuccessClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (sessionId) {
      // Here you could verify the session with your backend
      // For now, we'll just simulate loading
      setTimeout(() => setLoading(false), 2000)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Child Care Invoice!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your subscription has been activated successfully. You can now start managing your childcare business.
          </p>

          {/* Next Steps */}
          <Card className="border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 text-left">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Set up your organization</h3>
                  <p className="text-gray-600">Complete your organization profile and settings</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 text-left">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Add children and parents</h3>
                  <p className="text-gray-600">Import or manually add children and their guardians</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 text-left">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create your first invoice</h3>
                  <p className="text-gray-600">Start billing parents with professional invoices</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/childcare")}
              className="bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-md"
            >
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push("/childcare/settings")} className="border-gray-300">
              Organization Settings
            </Button>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help you set up your childcare invoice system.
            </p>
            <Button variant="outline" className="border-gray-300">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

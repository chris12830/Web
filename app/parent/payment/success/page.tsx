"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

function PaymentSuccessContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Your invoice payment has been processed successfully. You will receive a confirmation email shortly.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/parent/invoices">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Invoices
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // Simulate receipt download
                const link = document.createElement("a")
                link.href =
                  "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFBheW1lbnQgUmVjZWlwdCkKL1Byb2R1Y2VyIChEZW1vIFJlY2VpcHQgR2VuZXJhdG9yKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMTAxMTIwMDAwWikKPj4KZW5kb2JqCnhyZWYKMCAxCjAwMDAwMDAwMDAgNjU1MzUgZiAKdHJhaWxlcgo8PAovU2l6ZSAxCi9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoxNzMKJSVFT0Y="
                link.download = "payment-receipt.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">Need help? Contact our support team at support@childcareinvoice.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}

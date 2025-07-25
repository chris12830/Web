"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle, Globe } from "lucide-react"
import { useState } from "react"

export function DomainSpecificSetup() {
  const [copied, setCopied] = useState(false)
  const webhookUrl = "https://childcareinvoice.com/api/webhooks/stripe"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Child Care Invoice - Webhook Setup
          </CardTitle>
          <CardDescription>Your domain: childcareinvoice.com</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Webhook URL */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🔗 Your Webhook Endpoint URL</h3>

            <div className="flex gap-2">
              <Input value={webhookUrl} readOnly className="font-mono text-sm bg-muted" />
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(webhookUrl)}>
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Copy this URL</strong> and paste it into your Stripe webhook configuration.
              </AlertDescription>
            </Alert>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">📋 Setup Instructions</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  1
                </span>
                <div className="flex-1">
                  <p className="font-medium">Open Stripe Dashboard</p>
                  <p className="text-sm text-muted-foreground">Go to Developers → Webhooks</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => window.open("https://dashboard.stripe.com/webhooks", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Stripe Webhooks
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <div className="flex-1">
                  <p className="font-medium">Add New Endpoint</p>
                  <p className="text-sm text-muted-foreground">Click "Add endpoint" button</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  3
                </span>
                <div className="flex-1">
                  <p className="font-medium">Paste Webhook URL</p>
                  <p className="text-sm text-muted-foreground">Use the URL copied above</p>
                  <code className="text-xs bg-muted p-1 rounded block mt-1">{webhookUrl}</code>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  4
                </span>
                <div className="flex-1">
                  <p className="font-medium">Select Events</p>
                  <p className="text-sm text-muted-foreground">Choose these events:</p>
                  <ul className="text-xs mt-2 space-y-1">
                    <li>• checkout.session.completed</li>
                    <li>• customer.subscription.updated</li>
                    <li>• customer.subscription.deleted</li>
                    <li>• invoice.payment_succeeded</li>
                    <li>• invoice.payment_failed</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  5
                </span>
                <div className="flex-1">
                  <p className="font-medium">Copy Webhook Secret</p>
                  <p className="text-sm text-muted-foreground">
                    After creating the webhook, copy the "Signing secret" and add it to your .env.local file
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hostinger Deployment Note */}
          <Alert>
            <AlertDescription>
              <strong>📝 Note:</strong> I see you're using Hostinger hosting. You'll need to deploy your Next.js
              application to your server first before the webhook URL will work. Consider using Vercel for easier
              Next.js deployment, or follow Hostinger's Node.js deployment guide.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

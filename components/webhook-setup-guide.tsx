"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle } from "lucide-react"

export function WebhookSetupGuide() {
  const [domain, setDomain] = useState("")
  const [copied, setCopied] = useState(false)

  const webhookUrl = domain ? `https://${domain}/api/webhooks/stripe` : ""
  const localWebhookUrl = "http://localhost:3000/api/webhooks/stripe"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔗 Webhook Endpoint Setup Guide</CardTitle>
          <CardDescription>Follow these steps to set up your Stripe webhook endpoint</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Find Your Domain */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 1: Determine Your Domain</h3>

            <Alert>
              <AlertDescription>
                <strong>For Development:</strong> Use localhost URL
                <br />
                <strong>For Production:</strong> Use your live website domain
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Development */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">🛠️ Development (Local)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label>Webhook URL:</Label>
                    <div className="flex gap-2">
                      <Input value={localWebhookUrl} readOnly className="font-mono text-sm" />
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(localWebhookUrl)}>
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Use this when testing locally with `npm run dev`</p>
                  </div>
                </CardContent>
              </Card>

              {/* Production */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">🚀 Production (Live)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Your Domain:</Label>
                    <Input
                      id="domain"
                      placeholder="yourdomain.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                    {webhookUrl && (
                      <div className="flex gap-2">
                        <Input value={webhookUrl} readOnly className="font-mono text-sm" />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(webhookUrl)}>
                          {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Step 2: Common Deployment Platforms */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 2: Common Deployment Platforms</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-black">▲</span> Vercel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Format:</strong>
                    <br />
                    <code className="text-xs bg-muted p-1 rounded">
                      https://your-app.vercel.app/api/webhooks/stripe
                    </code>
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Vercel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">🌐 Netlify</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Format:</strong>
                    <br />
                    <code className="text-xs bg-muted p-1 rounded">
                      https://your-app.netlify.app/api/webhooks/stripe
                    </code>
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => window.open("https://app.netlify.com/", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Netlify
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">🔗 Custom Domain</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Format:</strong>
                    <br />
                    <code className="text-xs bg-muted p-1 rounded">https://yourdomain.com/api/webhooks/stripe</code>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Use your own domain name</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Step 3: Stripe Dashboard Setup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Add to Stripe Dashboard</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                <span>Go to Stripe Dashboard → Developers → Webhooks</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open("https://dashboard.stripe.com/webhooks", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Stripe
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                <span>Click "Add endpoint"</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                <span>Paste your webhook URL</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  4
                </span>
                <span>Select events to listen for</span>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Required Events:</strong>
                <br />• checkout.session.completed
                <br />• customer.subscription.updated
                <br />• customer.subscription.deleted
                <br />• invoice.payment_succeeded
                <br />• invoice.payment_failed
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

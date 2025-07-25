"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, ExternalLink, Globe, Zap } from "lucide-react"

export function DomainVerification() {
  const checkDomain = () => {
    window.open("https://childcareinvoice.com", "_blank")
  }

  const checkSSL = () => {
    window.open("https://www.ssllabs.com/ssltest/analyze.html?d=childcareinvoice.com", "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Domain Connection Verification
          </CardTitle>
          <CardDescription>Verify your domain is properly connected</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* DNS Propagation Check */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🔍 DNS Propagation Check</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Check Domain</h4>
                  <Button onClick={checkDomain} className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit childcareinvoice.com
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Check SSL Certificate</h4>
                  <Button onClick={checkSSL} variant="outline" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Test SSL Security
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">✅ Verification Checklist</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Domain purchased on Hostinger</p>
                  <p className="text-sm text-muted-foreground">childcareinvoice.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">DNS records configured</p>
                  <p className="text-sm text-muted-foreground">A record: 76.76.19.61, CNAME: cname.vercel-dns.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Vercel deployment ready</p>
                  <p className="text-sm text-muted-foreground">Project deployed with environment variables</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Stripe webhook updated</p>
                  <p className="text-sm text-muted-foreground">https://childcareinvoice.com/api/webhooks/stripe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <Alert>
            <AlertDescription>
              <strong>⏰ DNS Propagation:</strong> It may take 24-48 hours for DNS changes to fully propagate worldwide.
              If your domain doesn't work immediately, wait a few hours and try again.
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertDescription>
              <strong>🔒 SSL Certificate:</strong> Vercel automatically provides SSL certificates. Your site will be
              available at both http:// and https:// (https is recommended).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

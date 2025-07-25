"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Cloud, CloudOff, ExternalLink, Settings } from "lucide-react"

export function HostingerCDNFix() {
  const openHostinger = () => {
    window.open("https://hpanel.hostinger.com", "_blank")
  }

  const openVercel = () => {
    window.open("https://vercel.com", "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Hostinger CDN Conflict Resolution
          </CardTitle>
          <CardDescription>Fix the "Cannot add A/AAAA record when CDN is enabled" error</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Problem Explanation */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Issue:</strong> Hostinger's CDN (Cloudflare) is preventing you from adding custom DNS records.
              This happens when the domain is proxied through Cloudflare.
            </AlertDescription>
          </Alert>

          {/* Solution Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🔧 Solution Steps</h3>

            <div className="grid gap-4">
              {/* Step 1 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      1
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">Access Hostinger Control Panel</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Login to your Hostinger account and navigate to domain settings
                      </p>
                      <Button onClick={openHostinger} size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Hostinger Panel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      2
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">Disable CDN/Cloudflare</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          • Go to <strong>Domains</strong> → <strong>childcareinvoice.com</strong>
                        </p>
                        <p>
                          • Find <strong>CDN</strong> or <strong>Cloudflare</strong> settings
                        </p>
                        <p>
                          • <strong>Turn OFF</strong> the CDN service
                        </p>
                        <p>• Wait 5-10 minutes for changes to apply</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <CloudOff className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">CDN: Disabled</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      3
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">Add DNS Records</h4>
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Type:</strong> A<br />
                            <strong>Name:</strong> @<br />
                            <strong>Value:</strong> 76.76.19.61
                            <br />
                            <strong>TTL:</strong> 14400
                          </p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Type:</strong> CNAME
                            <br />
                            <strong>Name:</strong> www
                            <br />
                            <strong>Value:</strong> cname.vercel-dns.com
                            <br />
                            <strong>TTL:</strong> 14400
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      4
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">Configure Vercel Domain</h4>
                      <p className="text-sm text-muted-foreground mb-3">Add your domain in Vercel dashboard</p>
                      <Button onClick={openVercel} size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Vercel Dashboard
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Alternative Solution */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🔄 Alternative: Keep CDN Enabled</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  If you must keep CDN enabled, set DNS records to "DNS Only" mode (gray cloud, not orange)
                </p>
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">DNS Only (Gray Cloud)</span>
                  <span className="text-xs text-muted-foreground">vs</span>
                  <Cloud className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Proxied (Orange Cloud)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Success Indicator */}
          <Alert>
            <Settings className="h-4 w-4" />
            <AlertDescription>
              <strong>✅ Success:</strong> Once CDN is disabled, you should be able to add DNS records without errors.
              Your domain will be live within 24-48 hours.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

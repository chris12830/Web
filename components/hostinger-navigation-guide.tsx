"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Globe, Settings, Shield, Zap, ExternalLink, ArrowRight } from "lucide-react"

export function HostingerNavigationGuide() {
  const openHostinger = () => {
    window.open("https://hpanel.hostinger.com", "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            Finding CDN/Cloudflare Settings in Hostinger
          </CardTitle>
          <CardDescription>Different locations where CDN settings might be located</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="locations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="locations">Possible Locations</TabsTrigger>
              <TabsTrigger value="alternative">Alternative Method</TabsTrigger>
              <TabsTrigger value="direct">Direct DNS Setup</TabsTrigger>
            </TabsList>

            <TabsContent value="locations" className="space-y-4">
              <div className="grid gap-4">
                {/* Location 1 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        1
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Domains Section
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            • <strong>Domains</strong> → <strong>childcareinvoice.com</strong>
                          </p>
                          <p>
                            • Look for <strong>"Manage"</strong> or <strong>"Settings"</strong> button
                          </p>
                          <p>
                            • Check for <strong>"CDN"</strong>, <strong>"Cloudflare"</strong>, or{" "}
                            <strong>"Performance"</strong> tabs
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location 2 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        2
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Website Section
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            • <strong>Website</strong> → <strong>childcareinvoice.com</strong>
                          </p>
                          <p>
                            • Look for <strong>"Optimize"</strong> or <strong>"Performance"</strong>
                          </p>
                          <p>
                            • Check <strong>"CDN"</strong> or <strong>"Speed Optimization"</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location 3 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        3
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Security/SSL Section
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            • <strong>SSL/Security</strong> section
                          </p>
                          <p>
                            • Look for <strong>"Cloudflare"</strong> integration
                          </p>
                          <p>
                            • Check <strong>"Proxy Status"</strong> settings
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location 4 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        4
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Advanced/DNS Zone
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            • <strong>Advanced</strong> → <strong>DNS Zone</strong>
                          </p>
                          <p>• Look for orange cloud icons (🟠) next to records</p>
                          <p>• These indicate Cloudflare proxy is enabled</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={openHostinger} className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Hostinger Control Panel
              </Button>
            </TabsContent>

            <TabsContent value="alternative" className="space-y-4">
              <Alert>
                <ArrowRight className="h-4 w-4" />
                <AlertDescription>
                  <strong>Can't find CDN settings?</strong> Try this alternative approach:
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">🔄 Alternative Method: Change Nameservers</h4>
                    <div className="space-y-3">
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium mb-2">Step 1: In Hostinger</p>
                        <p className="text-sm text-muted-foreground">
                          Go to <strong>Domains</strong> → <strong>DNS Zone</strong> → Look for{" "}
                          <strong>"Change Nameservers"</strong>
                        </p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium mb-2">Step 2: Use Vercel Nameservers</p>
                        <div className="font-mono text-xs space-y-1">
                          <p>ns1.vercel-dns.com</p>
                          <p>ns2.vercel-dns.com</p>
                        </div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium mb-2">Step 3: In Vercel</p>
                        <p className="text-sm text-muted-foreground">
                          Add domain and Vercel will handle all DNS automatically
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="direct" className="space-y-4">
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  <strong>Skip CDN entirely:</strong> Try adding DNS records directly - sometimes it works even with CDN
                  enabled.
                </AlertDescription>
              </Alert>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">🎯 Direct DNS Setup</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">1. Go to DNS Zone Editor:</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Domains</strong> → <strong>childcareinvoice.com</strong> → <strong>DNS Zone</strong>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">2. Delete existing A records (if any)</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">3. Add these records:</p>
                      <div className="space-y-2">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Type:</strong> A<br />
                            <strong>Name:</strong> @ <br />
                            <strong>Value:</strong> 76.76.19.61
                          </p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Type:</strong> CNAME
                            <br />
                            <strong>Name:</strong> www
                            <br />
                            <strong>Value:</strong> cname.vercel-dns.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <AlertDescription>
                        <strong>💡 Tip:</strong> If you still get the CDN error, try adding records one at a time, or
                        contact Hostinger support to disable CDN for your domain.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">🆘 Still Can't Find It?</h4>
          <p className="text-sm text-muted-foreground mb-3">Contact Hostinger support and ask them to:</p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Disable CDN/Cloudflare for childcareinvoice.com</li>
            <li>• Allow custom DNS records</li>
            <li>• Help you add A and CNAME records</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

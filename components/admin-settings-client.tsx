"use client"

import { DemoBanner } from "@/components/demo-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Settings, Database, Mail, Shield } from "lucide-react"

export function AdminSettingsClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DemoBanner />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <CardTitle>General Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="system-name">System Name</Label>
              <Input id="system-name" defaultValue="ChildCare Invoice" />
            </div>
            <div>
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@system.com" />
            </div>
            <div>
              <Label htmlFor="support-email">Support Email</Label>
              <Input id="support-email" type="email" defaultValue="support@system.com" />
            </div>
            <div>
              <Label htmlFor="system-description">System Description</Label>
              <Textarea
                id="system-description"
                defaultValue="Complete invoicing and billing solution for childcare businesses"
                rows={3}
              />
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert("General settings saved successfully!\n\n(Demo mode - Settings would be saved to database)")
              }
            >
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-gray-600" />
              <CardTitle>Database Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Database Status</Label>
                <p className="text-sm text-gray-600">Current connection status</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Connected</span>
              </div>
            </div>
            <div>
              <Label>Database URL</Label>
              <Input type="password" defaultValue="postgresql://***:***@***.neon.tech/***" disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-gray-600">Automatic daily backups</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert(
                  "Database connection test successful!\n\nConnection Status: ✅ Connected\nLatency: 45ms\nDatabase: PostgreSQL 14.2\n\n(Demo mode)",
                )
              }
            >
              Test Connection
            </Button>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <CardTitle>Email Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" placeholder="smtp.gmail.com" />
            </div>
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" type="number" placeholder="587" />
            </div>
            <div>
              <Label htmlFor="smtp-user">SMTP Username</Label>
              <Input id="smtp-user" type="email" placeholder="your-email@gmail.com" />
            </div>
            <div>
              <Label htmlFor="smtp-pass">SMTP Password</Label>
              <Input id="smtp-pass" type="password" placeholder="Your app password" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Email Notifications</Label>
                <p className="text-sm text-gray-600">Send system notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert(
                  "Email settings saved successfully!\n\nSMTP configuration updated.\nTest email will be sent to verify settings.\n\n(Demo mode)",
                )
              }
            >
              Save Email Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-gray-600" />
              <CardTitle>Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-gray-600">Auto logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="session-duration">Session Duration (hours)</Label>
              <Input id="session-duration" type="number" defaultValue="24" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Login Attempt Limit</Label>
                <p className="text-sm text-gray-600">Block after failed attempts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert(
                  "Security settings saved successfully!\n\nSecurity policies updated.\nAll users will be notified of changes.\n\n(Demo mode)",
                )
              }
            >
              Save Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { DemoBanner } from "@/components/demo-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, DollarSign, FileText, Bell } from "lucide-react"

interface ChildcareSettingsClientProps {
  organizationName?: string
}

export function ChildcareSettingsClient({ organizationName }: ChildcareSettingsClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DemoBanner />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
        <p className="text-gray-600">Manage your childcare center's settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Organization Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-gray-600" />
              <CardTitle>Organization Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" defaultValue={organizationName || "Sunshine Childcare Center"} />
            </div>
            <div>
              <Label htmlFor="org-address">Address</Label>
              <Textarea id="org-address" defaultValue="123 Main St, Anytown, ST 12345" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="org-phone">Phone</Label>
                <Input id="org-phone" defaultValue="(555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="org-email">Email</Label>
                <Input id="org-email" type="email" defaultValue="admin@sunshinechildcare.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="org-website">Website</Label>
              <Input id="org-website" defaultValue="https://sunshinechildcare.com" />
            </div>
            <div>
              <Label htmlFor="org-description">Description</Label>
              <Textarea
                id="org-description"
                defaultValue="A nurturing environment for children to learn and grow."
                rows={3}
              />
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert(
                  "Organization information saved successfully!\n\nAll changes have been updated.\nParents will see the updated information on their invoices.\n\n(Demo mode)",
                )
              }
            >
              Save Organization Info
            </Button>
          </CardContent>
        </Card>

        {/* Billing Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <CardTitle>Billing Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="USD">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" defaultValue="8.25" step="0.01" />
            </div>
            <div>
              <Label htmlFor="payment-terms">Payment Terms (days)</Label>
              <Input id="payment-terms" type="number" defaultValue="15" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Late Payment Fees</Label>
                <p className="text-sm text-gray-600">Charge fees for overdue payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="late-fee">Late Fee Amount ($)</Label>
              <Input id="late-fee" type="number" defaultValue="25.00" step="0.01" />
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert(
                  "Billing settings saved successfully!\n\nNew settings will apply to future invoices.\nExisting invoices remain unchanged.\n\n(Demo mode)",
                )
              }
            >
              Save Billing Settings
            </Button>
          </CardContent>
        </Card>

        {/* Invoice Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <CardTitle>Invoice Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
              <Input id="invoice-prefix" defaultValue="INV-" />
            </div>
            <div>
              <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
              <Textarea id="invoice-footer" defaultValue="Thank you for choosing our childcare services!" rows={3} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-generate Invoices</Label>
                <p className="text-sm text-gray-600">Automatically create monthly invoices</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="invoice-day">Invoice Generation Day</Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert(
                  "Invoice settings saved successfully!\n\nAuto-generation schedule updated.\nNew invoice template will be used for future invoices.\n\n(Demo mode)",
                )
              }
            >
              Save Invoice Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email notifications to parents</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Reminders</Label>
                <p className="text-sm text-gray-600">Send reminders for overdue payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="reminder-days">Reminder Days Before Due</Label>
              <Input id="reminder-days" type="number" defaultValue="3" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Send SMS notifications (requires setup)</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Admin Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications about system events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button
              className="w-full"
              onClick={() =>
                alert(
                  "Notification settings saved successfully!\n\nEmail and SMS preferences updated.\nParents will receive notifications according to new settings.\n\n(Demo mode)",
                )
              }
            >
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

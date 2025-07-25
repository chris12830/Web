"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Mail } from "lucide-react"
import Link from "next/link"

interface EmailTemplatesClientProps {
  organizationId: string
}

export function EmailTemplatesClient({ organizationId }: EmailTemplatesClientProps) {
  const [templates, setTemplates] = useState({
    paymentReminder: {
      subject: "Payment Reminder - Invoice Due",
      content: `Dear {guardian_name},

This is a friendly reminder that your invoice {invoice_number} for {child_name} is due on {due_date}.

Invoice Details:
- Amount: {invoice_amount}
- Due Date: {due_date}
- Child: {child_name}

Please log into your parent portal to view and pay your invoice.

Thank you for your prompt attention to this matter.

Best regards,
{organization_name}`,
    },
    invoiceSent: {
      subject: "New Invoice Available - {child_name}",
      content: `Dear {guardian_name},

A new invoice has been generated for {child_name}.

Invoice Details:
- Invoice Number: {invoice_number}
- Amount: {invoice_amount}
- Due Date: {due_date}

Please log into your parent portal to view and pay your invoice.

Thank you,
{organization_name}`,
    },
    paymentReceived: {
      subject: "Payment Received - Thank You",
      content: `Dear {guardian_name},

Thank you! We have received your payment for invoice {invoice_number}.

Payment Details:
- Amount Paid: {payment_amount}
- Payment Date: {payment_date}
- Child: {child_name}

Your account is now up to date.

Best regards,
{organization_name}`,
    },
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Email templates saved successfully!")
    } catch (error) {
      alert("Failed to save templates. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const updateTemplate = (type: keyof typeof templates, field: "subject" | "content", value: string) => {
    setTemplates((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }))
  }

  const availableVariables = [
    "{guardian_name}",
    "{child_name}",
    "{invoice_number}",
    "{invoice_amount}",
    "{due_date}",
    "{payment_amount}",
    "{payment_date}",
    "{organization_name}",
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-600">Customize email content sent to parents and guardians</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Templates
              </>
            )}
          </Button>
          <Link href="/childcare">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="paymentReminder" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="paymentReminder">Payment Reminder</TabsTrigger>
              <TabsTrigger value="invoiceSent">Invoice Sent</TabsTrigger>
              <TabsTrigger value="paymentReceived">Payment Received</TabsTrigger>
            </TabsList>

            <TabsContent value="paymentReminder" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Payment Reminder Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reminder-subject">Subject Line</Label>
                    <Input
                      id="reminder-subject"
                      value={templates.paymentReminder.subject}
                      onChange={(e) => updateTemplate("paymentReminder", "subject", e.target.value)}
                      placeholder="Email subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reminder-content">Email Content</Label>
                    <Textarea
                      id="reminder-content"
                      value={templates.paymentReminder.content}
                      onChange={(e) => updateTemplate("paymentReminder", "content", e.target.value)}
                      rows={12}
                      placeholder="Email content"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoiceSent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Invoice Sent Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sent-subject">Subject Line</Label>
                    <Input
                      id="sent-subject"
                      value={templates.invoiceSent.subject}
                      onChange={(e) => updateTemplate("invoiceSent", "subject", e.target.value)}
                      placeholder="Email subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sent-content">Email Content</Label>
                    <Textarea
                      id="sent-content"
                      value={templates.invoiceSent.content}
                      onChange={(e) => updateTemplate("invoiceSent", "content", e.target.value)}
                      rows={12}
                      placeholder="Email content"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paymentReceived" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Payment Received Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="received-subject">Subject Line</Label>
                    <Input
                      id="received-subject"
                      value={templates.paymentReceived.subject}
                      onChange={(e) => updateTemplate("paymentReceived", "subject", e.target.value)}
                      placeholder="Email subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="received-content">Email Content</Label>
                    <Textarea
                      id="received-content"
                      value={templates.paymentReceived.content}
                      onChange={(e) => updateTemplate("paymentReceived", "content", e.target.value)}
                      rows={12}
                      placeholder="Email content"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Available Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">
                  Use these variables in your email templates. They will be automatically replaced with actual values.
                </p>
                {availableVariables.map((variable) => (
                  <div
                    key={variable}
                    className="bg-gray-100 px-2 py-1 rounded text-sm font-mono cursor-pointer hover:bg-gray-200"
                    onClick={() => navigator.clipboard.writeText(variable)}
                    title="Click to copy"
                  >
                    {variable}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

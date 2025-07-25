"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * ContactForm – simple support/contact form
 * Sends an alert on submit (replace with real action when ready)
 */
export function ContactForm() {
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    // TODO: replace alert with server-action / API call to support system
    setTimeout(() => {
      alert("Thank you for contacting us! We’ll respond within 24 hours.")
      setIsSending(false)
    }, 800)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Contact Support</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" required placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" required placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <Label htmlFor="contact-business">Child Care Business Name</Label>
            <Input id="contact-business" placeholder="Your business name" />
          </div>

          <div>
            <Label htmlFor="contact-subject">Subject</Label>
            <Input id="contact-subject" required placeholder="How can we help?" />
          </div>

          <div>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" required rows={4} placeholder="Please describe your question or issue..." />
          </div>

          <Button type="submit" disabled={isSending} className="w-full bg-blue-600 hover:bg-blue-700">
            <Mail className="mr-2 h-4 w-4" />
            {isSending ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

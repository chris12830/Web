"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Send, X } from "lucide-react"

interface ParentSupportModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    organizationId?: string
    organizationName?: string
  }
}

export function ParentSupportModal({ isOpen, onClose, user }: ParentSupportModalProps) {
  const [ticket, setTicket] = useState({
    subject: "",
    message: "",
    priority: "medium" as const,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!ticket.subject.trim() || !ticket.message.trim()) return

    setIsSubmitting(true)

    try {
      const supportTicket = {
        id: Date.now().toString(),
        subject: ticket.subject,
        message: ticket.message,
        priority: ticket.priority,
        status: "open",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        responses: [],
        customerName: `${user.firstName} ${user.lastName}`,
        customerEmail: user.email,
        organization: user.organizationName || user.organizationId || "Unknown Organization",
        ticketType: "parent",
      }

      // Save to parent support tickets
      const existingTickets = localStorage.getItem("parentSupportTickets")
      const tickets = existingTickets ? JSON.parse(existingTickets) : []
      tickets.unshift(supportTicket)
      localStorage.setItem("parentSupportTickets", JSON.stringify(tickets))

      // Reset form
      setTicket({ subject: "", message: "", priority: "medium" })
      onClose()

      alert("Support ticket submitted successfully! Your childcare provider will respond soon.")
    } catch (error) {
      console.error("Error submitting ticket:", error)
      alert("Error submitting ticket. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Contact Support</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">Send a message to your childcare provider's support team</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              placeholder="Brief description of your issue or question"
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={ticket.priority} onValueChange={(value: any) => setTicket({ ...ticket, priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General question</SelectItem>
                <SelectItem value="medium">Medium - Need assistance</SelectItem>
                <SelectItem value="high">High - Urgent issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              placeholder="Please describe your issue or question in detail..."
              rows={5}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Your message will be sent to:</strong> {user.organizationName || "Your childcare provider"}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              You can expect a response within 24 hours during business days.
            </p>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!ticket.subject.trim() || !ticket.message.trim() || isSubmitting}
              className="flex-1"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

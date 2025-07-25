"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Send } from "lucide-react"

interface SupportButtonProps {
  userRole: "system_admin" | "childcare_admin" | "guardian"
  organizationName?: string
}

export function SupportButton({ userRole, organizationName }: SupportButtonProps) {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [category, setCategory] = useState("")

  const getSupportTarget = () => {
    switch (userRole) {
      case "childcare_admin":
        return "System Administrator"
      case "guardian":
        return `${organizationName} Support Team`
      default:
        return "Support Team"
    }
  }

  const getCategories = () => {
    if (userRole === "guardian") {
      return [
        "Billing Issue",
        "Payment Problem",
        "Invoice Question",
        "Account Access",
        "General Inquiry",
        "Technical Issue",
      ]
    } else {
      return [
        "Technical Issue",
        "Feature Request",
        "Bug Report",
        "Account Management",
        "System Configuration",
        "General Inquiry",
      ]
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate ticket number
    const ticketNumber = `TICK-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    alert(`Support Ticket Created Successfully!

Ticket Number: ${ticketNumber}
Subject: ${subject}
Priority: ${priority}
Category: ${category}
Assigned to: ${getSupportTarget()}

Your support request has been submitted and you will receive a response within 24 hours.

(Demo mode - In production, this would create a real support ticket)`)

    // Reset form
    setSubject("")
    setDescription("")
    setPriority("medium")
    setCategory("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4" />
          <span>Support</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </DialogTitle>
          <DialogDescription>Submit a support request to {getSupportTarget()}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {getCategories().map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide detailed information about your issue or question..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Clock, AlertCircle, CheckCircle } from "lucide-react"

interface SupportTicket {
  id: string
  customerName: string
  customerEmail: string
  organization: string
  subject: string
  message: string
  status: "open" | "in-progress" | "resolved" | "urgent"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
  responses: SupportResponse[]
}

interface SupportResponse {
  id: string
  author: string
  message: string
  timestamp: string
  isAdmin: boolean
}

export function AdminSupportClient({ user }: { user: any }) {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [tickets, setTickets] = useState<SupportTicket[]>([])

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const savedTickets = localStorage.getItem("supportTickets")
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    } else {
      // Initialize with demo data
      const demoTickets: SupportTicket[] = [
        {
          id: "1",
          customerName: "Sarah Johnson",
          customerEmail: "sarah@sunshinechildcare.com",
          organization: "Sunshine Child Care",
          subject: "Payment processing not working",
          message:
            "Hi, we're having trouble with credit card payments. Parents are getting error messages when trying to pay online.",
          status: "urgent",
          priority: "urgent",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
          responses: [],
        },
        {
          id: "2",
          customerName: "Mike Davis",
          customerEmail: "mike@littlestars.com",
          organization: "Little Stars Daycare",
          subject: "Bulk invoice feature request",
          message:
            "Could you add the ability to send the same invoice to multiple families at once? This would save us a lot of time each month.",
          status: "in-progress",
          priority: "medium",
          createdAt: "2024-01-14T14:20:00Z",
          updatedAt: "2024-01-14T16:45:00Z",
          responses: [
            {
              id: "r1",
              author: "Support Team",
              message:
                "Hi Mike, thanks for the suggestion! We're actually working on this feature and it should be available next month. I'll keep you updated on the progress.",
              timestamp: "2024-01-14T16:45:00Z",
              isAdmin: true,
            },
          ],
        },
      ]
      setTickets(demoTickets)
      localStorage.setItem("supportTickets", JSON.stringify(demoTickets))
    }
  }, [])

  // Save tickets to localStorage whenever tickets change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("supportTickets", JSON.stringify(tickets))
    }
  }, [tickets])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSendResponse = () => {
    if (!selectedTicket || !responseMessage.trim()) return

    const newResponse: SupportResponse = {
      id: Date.now().toString(),
      author: `${user.firstName} ${user.lastName}`,
      message: responseMessage,
      timestamp: new Date().toISOString(),
      isAdmin: true,
    }

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? {
            ...ticket,
            responses: [...ticket.responses, newResponse],
            status: "in-progress" as const,
            updatedAt: new Date().toISOString(),
          }
        : ticket,
    )

    setTickets(updatedTickets)
    setSelectedTicket({
      ...selectedTicket,
      responses: [...selectedTicket.responses, newResponse],
      status: "in-progress",
      updatedAt: new Date().toISOString(),
    })

    setResponseMessage("")
    alert("Response sent successfully!")
  }

  const updateTicketStatus = (ticketId: string, newStatus: SupportTicket["status"]) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() } : ticket,
    )
    setTickets(updatedTickets)

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus, updatedAt: new Date().toISOString() })
    }
  }

  const openTickets = tickets.filter((t) => t.status === "open").length
  const urgentTickets = tickets.filter((t) => t.status === "urgent").length
  const inProgressTickets = tickets.filter((t) => t.status === "in-progress").length

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Customer Support Center</h1>
        <p className="text-gray-600">Manage support tickets from Child Care Business customers</p>
      </div>

      {/* Support Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
              Urgent Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentTickets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
              Open Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{openTickets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-yellow-600" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inProgressTickets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Total Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{tickets.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Tickets List */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-sm">{ticket.customerName}</div>
                    <div className="flex gap-1">
                      <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>{ticket.status}</Badge>
                      <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{ticket.organization}</div>
                  <div className="text-sm font-medium truncate">{ticket.subject}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(ticket.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ticket Details - Made larger */}
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>{selectedTicket ? `Ticket #${selectedTicket.id}` : "Select a Ticket"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTicket ? (
              <div className="space-y-6 h-[600px] overflow-y-auto">
                {/* Ticket Info */}
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedTicket.subject}</h3>
                      <p className="text-sm text-gray-600">
                        From: {selectedTicket.customerName} ({selectedTicket.organization})
                      </p>
                      <p className="text-sm text-gray-600">Email: {selectedTicket.customerEmail}</p>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(selectedTicket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(selectedTicket.status)}>{selectedTicket.status}</Badge>
                      <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{selectedTicket.message}</p>
                  </div>
                </div>

                {/* Responses */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Conversation</h4>
                  {selectedTicket.responses.map((response) => (
                    <div
                      key={response.id}
                      className={`p-4 rounded-lg ${response.isAdmin ? "bg-blue-50 ml-4" : "bg-gray-50 mr-4"}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">
                          {response.isAdmin ? "👨‍💼 " : "👤 "}
                          {response.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(response.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{response.message}</p>
                    </div>
                  ))}
                </div>

                {/* Status Update */}
                <div className="space-y-2">
                  <Label>Update Status</Label>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateTicketStatus(selectedTicket.id, "in-progress")}
                    >
                      In Progress
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateTicketStatus(selectedTicket.id, "resolved")}
                    >
                      Resolve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateTicketStatus(selectedTicket.id, "urgent")}>
                      Mark Urgent
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateTicketStatus(selectedTicket.id, "open")}>
                      Reopen
                    </Button>
                  </div>
                </div>

                {/* Response Form */}
                <div className="space-y-4 border-t pt-4">
                  <Label htmlFor="response">Send Response</Label>
                  <Textarea
                    id="response"
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleSendResponse} disabled={!responseMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Response
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px]">
                <p className="text-gray-500 text-center">Select a ticket from the list to view details and respond</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

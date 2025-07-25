"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Plus, Clock, CheckCircle, Eye, Reply, User, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SupportTicket {
  id: string
  subject: string
  message: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
  responses: SupportResponse[]
  customerName: string
  customerEmail: string
  organization: string
  ticketType: "internal" | "parent"
}

interface SupportResponse {
  id: string
  author: string
  message: string
  timestamp: string
  isSupport: boolean
}

export function ChildcareSupportClient({ user }: { user: any }) {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    priority: "medium" as const,
  })
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [parentTickets, setParentTickets] = useState<SupportTicket[]>([])

  // Load tickets from localStorage on component mount
  useEffect(() => {
    // Load childcare internal tickets
    const savedTickets = localStorage.getItem("childcareSupportTickets")
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    }

    // Load parent tickets for this organization
    const allParentTickets = localStorage.getItem("parentSupportTickets")
    if (allParentTickets) {
      const parsed = JSON.parse(allParentTickets)
      const organizationTickets = parsed.filter(
        (ticket: SupportTicket) =>
          ticket.organization === user.organizationName || ticket.organization === user.organizationId,
      )
      setParentTickets(organizationTickets)
    }
  }, [user.organizationName, user.organizationId])

  // Save tickets to localStorage whenever tickets change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("childcareSupportTickets", JSON.stringify(tickets))
    }
  }, [tickets])

  const handleCreateTicket = () => {
    if (!newTicket.subject.trim() || !newTicket.message.trim()) return

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      ...newTicket,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      customerName: `${user.firstName} ${user.lastName}`,
      customerEmail: user.email,
      organization: user.organizationName || "Child Care Business",
      ticketType: "internal",
    }

    setTickets([ticket, ...tickets])
    setNewTicket({ subject: "", message: "", priority: "medium" })
    setShowNewTicket(false)
    alert("Support ticket created successfully!")
  }

  const handleReplyToParent = () => {
    if (!selectedTicket || !replyMessage.trim()) return

    const response: SupportResponse = {
      id: Date.now().toString(),
      author: `${user.firstName} ${user.lastName}`,
      message: replyMessage,
      timestamp: new Date().toISOString(),
      isSupport: true,
    }

    const updatedTicket = {
      ...selectedTicket,
      responses: [...selectedTicket.responses, response],
      status: "in-progress" as const,
      updatedAt: new Date().toISOString(),
    }

    // Update parent tickets
    const updatedParentTickets = parentTickets.map((ticket) =>
      ticket.id === selectedTicket.id ? updatedTicket : ticket,
    )
    setParentTickets(updatedParentTickets)

    // Update localStorage
    const allParentTickets = localStorage.getItem("parentSupportTickets")
    if (allParentTickets) {
      const parsed = JSON.parse(allParentTickets)
      const updated = parsed.map((ticket: SupportTicket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket))
      localStorage.setItem("parentSupportTickets", JSON.stringify(updated))
    }

    setReplyMessage("")
    setSelectedTicket(updatedTicket)
    alert("Reply sent to parent successfully!")
  }

  const handleUpdateTicketStatus = (ticketId: string, newStatus: "open" | "in-progress" | "resolved") => {
    const updatedParentTickets = parentTickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() } : ticket,
    )
    setParentTickets(updatedParentTickets)

    // Update localStorage
    const allParentTickets = localStorage.getItem("parentSupportTickets")
    if (allParentTickets) {
      const parsed = JSON.parse(allParentTickets)
      const updated = parsed.map((ticket: SupportTicket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() } : ticket,
      )
      localStorage.setItem("parentSupportTickets", JSON.stringify(updated))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
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
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const openParentTickets = parentTickets.filter((t) => t.status === "open").length
  const inProgressParentTickets = parentTickets.filter((t) => t.status === "in-progress").length
  const resolvedParentTickets = parentTickets.filter((t) => t.status === "resolved").length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600">Manage support tickets and help parents</p>
        </div>
        <Button onClick={() => setShowNewTicket(true)} disabled={showNewTicket}>
          <Plus className="w-4 h-4 mr-2" />
          New Internal Ticket
        </Button>
      </div>

      {/* Support Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
              Open Parent Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{openParentTickets}</div>
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
            <div className="text-2xl font-bold text-yellow-600">{inProgressParentTickets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolvedParentTickets}</div>
          </CardContent>
        </Card>
      </div>

      {/* New Internal Ticket Form */}
      {showNewTicket && (
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Create New Internal Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newTicket.priority}
                onValueChange={(value: any) => setNewTicket({ ...newTicket, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newTicket.message}
                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                placeholder="Please describe your issue in detail..."
                rows={4}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateTicket} disabled={!newTicket.subject.trim() || !newTicket.message.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
              <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tickets Tabs */}
      <Tabs defaultValue="parent-tickets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="parent-tickets">Parent Tickets ({parentTickets.length})</TabsTrigger>
          <TabsTrigger value="internal-tickets">Internal Tickets ({tickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="parent-tickets">
          <Card>
            <CardHeader>
              <CardTitle>Parent Support Tickets</CardTitle>
              <p className="text-sm text-gray-600">Support requests from parents in your organization</p>
            </CardHeader>
            <CardContent>
              {parentTickets.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No parent support tickets yet.</p>
                  <p className="text-sm text-gray-400">Parent tickets will appear here when submitted.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket #</TableHead>
                      <TableHead>Parent</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parentTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">#{ticket.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="font-medium">{ticket.customerName}</div>
                              <div className="text-xs text-gray-500">{ticket.customerEmail}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Select
                            value={ticket.status}
                            onValueChange={(value: any) => handleUpdateTicketStatus(ticket.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.responses.length}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                              <Reply className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internal-tickets">
          <Card>
            <CardHeader>
              <CardTitle>Internal Support Tickets</CardTitle>
              <p className="text-sm text-gray-600">Your internal support requests to system administrators</p>
            </CardHeader>
            <CardContent>
              {tickets.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No internal support tickets yet.</p>
                  <p className="text-sm text-gray-400">Create your first ticket using the button above.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket #</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">#{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{ticket.responses.length}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Ticket #{selectedTicket.id}</span>
                    <Badge className={getStatusColor(selectedTicket.status)}>{selectedTicket.status}</Badge>
                    <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                  </CardTitle>
                  <p className="text-lg font-medium mt-2">{selectedTicket.subject}</p>
                  {selectedTicket.ticketType === "parent" && (
                    <p className="text-sm text-gray-600">
                      From: {selectedTicket.customerName} ({selectedTicket.customerEmail})
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedTicket(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Original Message:</p>
                <p className="text-sm whitespace-pre-wrap">{selectedTicket.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Created: {new Date(selectedTicket.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedTicket.responses.length > 0 && (
                <div className="space-y-3">
                  <p className="font-medium">Conversation:</p>
                  {selectedTicket.responses.map((response) => (
                    <div
                      key={response.id}
                      className={`p-4 rounded-lg ${response.isSupport ? "bg-blue-50 border-l-4 border-blue-400" : "bg-gray-50 border-l-4 border-gray-400"}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium flex items-center space-x-2">
                          {response.isSupport ? (
                            <>
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-3 h-3 text-blue-600" />
                              </div>
                              <span>Support Team</span>
                            </>
                          ) : (
                            <>
                              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-gray-600" />
                              </div>
                              <span>{selectedTicket.customerName}</span>
                            </>
                          )}
                        </span>
                        <span className="text-xs text-gray-500">{new Date(response.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{response.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {selectedTicket.ticketType === "parent" && selectedTicket.status !== "resolved" && (
                <div className="border-t pt-4">
                  <Label htmlFor="reply">Reply to Parent</Label>
                  <Textarea
                    id="reply"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply to the parent..."
                    rows={4}
                    className="mt-2"
                  />
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={handleReplyToParent} disabled={!replyMessage.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                    <Button variant="outline" onClick={() => handleUpdateTicketStatus(selectedTicket.id, "resolved")}>
                      Mark as Resolved
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

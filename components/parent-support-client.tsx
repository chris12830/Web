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
import { MessageSquare, Send, Plus, Clock, CheckCircle, Eye, User, Calendar } from "lucide-react"
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
}

interface SupportResponse {
  id: string
  author: string
  message: string
  timestamp: string
  isSupport: boolean
  read?: boolean
}

export function ParentSupportClient({ user }: { user: any }) {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    priority: "medium" as const,
  })
  const [tickets, setTickets] = useState<SupportTicket[]>([])

  // Mock user data for demo
  const mockUser = {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    organizationName: "Sunshine Daycare",
    organizationId: "org_123",
  }

  const currentUser = user || mockUser

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const savedTickets = localStorage.getItem("parentSupportTickets")
    if (savedTickets) {
      const allTickets = JSON.parse(savedTickets)
      // Filter tickets for this user
      const userTickets = allTickets.filter((ticket: SupportTicket) => ticket.customerEmail === currentUser.email)
      setTickets(userTickets)
    }
  }, [currentUser.email])

  const handleCreateTicket = () => {
    if (!newTicket.subject.trim() || !newTicket.message.trim()) return

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      ...newTicket,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      customerName: `${currentUser.firstName} ${currentUser.lastName}`,
      customerEmail: currentUser.email,
      organization: currentUser.organizationName || "Child Care Business",
    }

    // Save to localStorage - this will be accessible by childcare admin
    const existingTickets = localStorage.getItem("parentSupportTickets")
    const allTickets = existingTickets ? JSON.parse(existingTickets) : []
    allTickets.unshift(ticket)
    localStorage.setItem("parentSupportTickets", JSON.stringify(allTickets))

    // Update local state
    setTickets([ticket, ...tickets])
    setNewTicket({ subject: "", message: "", priority: "medium" })
    setShowNewTicket(false)
    alert("Support ticket created successfully! Your childcare provider will respond soon.")
  }

  const markResponsesAsRead = (ticketId: string) => {
    const savedTickets = localStorage.getItem("parentSupportTickets")
    if (savedTickets) {
      const allTickets = JSON.parse(savedTickets)
      const updatedTickets = allTickets.map((ticket: SupportTicket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            responses: ticket.responses.map((response: SupportResponse) => ({
              ...response,
              read: true,
            })),
          }
        }
        return ticket
      })
      localStorage.setItem("parentSupportTickets", JSON.stringify(updatedTickets))

      // Update local state
      const userTickets = updatedTickets.filter((ticket: SupportTicket) => ticket.customerEmail === currentUser.email)
      setTickets(userTickets)
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

  const openTickets = tickets.filter((t) => t.status === "open").length
  const inProgressTickets = tickets.filter((t) => t.status === "in-progress").length
  const resolvedTickets = tickets.filter((t) => t.status === "resolved").length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600">Contact your childcare provider for assistance</p>
        </div>
        <Button onClick={() => setShowNewTicket(true)} disabled={showNewTicket}>
          <Plus className="w-4 h-4 mr-2" />
          New Support Ticket
        </Button>
      </div>

      {/* Support Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolvedTickets}</div>
          </CardContent>
        </Card>
      </div>

      {/* New Ticket Form */}
      {showNewTicket && (
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Create New Support Ticket</CardTitle>
            <p className="text-sm text-gray-600">Send a message to {currentUser.organizationName}</p>
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
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Tickets ({tickets.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({openTickets})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTickets})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedTickets})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Support Tickets</CardTitle>
              <p className="text-sm text-gray-600">Your complete support ticket history</p>
            </CardHeader>
            <CardContent>
              {tickets.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No support tickets yet.</p>
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
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{ticket.responses.length}</span>
                            {ticket.responses.some((r) => r.isSupport && !r.read) && (
                              <Badge variant="destructive" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedTicket(ticket)
                              markResponsesAsRead(ticket.id)
                            }}
                          >
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

        <TabsContent value="open">
          <Card>
            <CardHeader>
              <CardTitle>Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket #</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets
                    .filter((t) => t.status === "open")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">#{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket #</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets
                    .filter((t) => t.status === "in-progress")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">#{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>{new Date(ticket.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket #</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Resolved</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets
                    .filter((t) => t.status === "resolved")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">#{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>{new Date(ticket.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
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
                  <p className="text-sm text-gray-600">To: {selectedTicket.organization}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedTicket(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Your Message:</p>
                <p className="text-sm whitespace-pre-wrap">{selectedTicket.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Sent: {new Date(selectedTicket.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedTicket.responses.length > 0 && (
                <div className="space-y-3">
                  <p className="font-medium">Responses from Support:</p>
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
                              <span>You</span>
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

              {selectedTicket.status === "open" && selectedTicket.responses.length === 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Your ticket has been received and is waiting for a response from the support team.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

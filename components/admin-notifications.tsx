"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, User, Mail, Phone, Building2, Package, Check, X, Eye } from "lucide-react"

interface AdminNotification {
  id: string
  type: string
  title: string
  message: string
  data: any
  timestamp: string
  isRead: boolean
  actions: string[]
}

export function AdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [selectedNotification, setSelectedNotification] = useState<AdminNotification | null>(null)

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem("adminNotifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    setNotifications(updatedNotifications)
    localStorage.setItem("adminNotifications", JSON.stringify(updatedNotifications))
  }

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter((n) => n.id !== notificationId)
    setNotifications(updatedNotifications)
    localStorage.setItem("adminNotifications", JSON.stringify(updatedNotifications))
  }

  const handleActivateUser = (notification: AdminNotification) => {
    alert(`User Activated Successfully!

${notification.data.name} from ${notification.data.businessName} has been activated.

Account Details:
• Email: ${notification.data.email}
• Package: ${notification.data.selectedPackage}
• Business Type: ${notification.data.businessType}

An activation email has been sent to the user.`)

    markAsRead(notification.id)
  }

  const handleContactUser = (notification: AdminNotification) => {
    const subject = `Welcome to Child Care Invoice - Account Setup`
    const body = `Hello ${notification.data.name},

Thank you for signing up for Child Care Invoice! We're excited to help you streamline your childcare business operations.

Your account details:
- Business: ${notification.data.businessName}
- Package: ${notification.data.selectedPackage}
- Email: ${notification.data.email}

We'll have your account activated within 24 hours. In the meantime, feel free to reply to this email if you have any questions.

Best regards,
Child Care Invoice Support Team`

    window.open(
      `mailto:${notification.data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    )
    markAsRead(notification.id)
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Admin Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${notification.isRead ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" onClick={() => setSelectedNotification(notification)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                <div className="flex space-x-2">
                  {notification.actions.includes("activate") && (
                    <Button size="sm" onClick={() => handleActivateUser(notification)} className="text-xs">
                      <Check className="w-3 h-3 mr-1" />
                      Activate
                    </Button>
                  )}
                  {notification.actions.includes("contact") && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleContactUser(notification)}
                      className="text-xs"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Contact
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {/* Notification Detail Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedNotification.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedNotification(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedNotification.data.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{selectedNotification.data.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedNotification.data.phone || "Not provided"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span>{selectedNotification.data.businessName}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>{selectedNotification.data.selectedPackage} Plan</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Business Type:</p>
                      <p className="text-sm text-gray-600">{selectedNotification.data.businessType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Children Enrolled:</p>
                      <p className="text-sm text-gray-600">
                        {selectedNotification.data.numberOfChildren || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Address:</p>
                  <p className="text-sm text-gray-600">{selectedNotification.data.address}</p>
                </div>

                {selectedNotification.data.currentSoftware && (
                  <div>
                    <p className="text-sm font-medium">Current Software:</p>
                    <p className="text-sm text-gray-600">{selectedNotification.data.currentSoftware}</p>
                  </div>
                )}

                {selectedNotification.data.additionalNotes && (
                  <div>
                    <p className="text-sm font-medium">Additional Notes:</p>
                    <p className="text-sm text-gray-600">{selectedNotification.data.additionalNotes}</p>
                  </div>
                )}

                <div className="flex space-x-2 pt-4 border-t">
                  <Button onClick={() => handleActivateUser(selectedNotification)}>
                    <Check className="w-4 h-4 mr-2" />
                    Activate User
                  </Button>
                  <Button variant="outline" onClick={() => handleContactUser(selectedNotification)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Twitter, Linkedin, MessageCircle, Mail, Share2 } from "lucide-react"
import { useState } from "react"

export function SocialShare() {
  const [isOpen, setIsOpen] = useState(false)

  const shareUrl = "https://childcareinvoice.com"
  const shareText =
    "Check out Child Care Invoice - the complete invoicing solution for child care businesses! Simple, powerful, and effective. #ChildCare #Invoicing #SmallBusiness"

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent("Child Care Invoice - Amazing Invoicing Solution")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Share2 className="w-5 h-5" />
          <span>Love Our Service?</span>
        </CardTitle>
        <CardDescription>Help other child care businesses discover our amazing invoicing solution!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("facebook")}
            className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            <span>Facebook</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("twitter")}
            className="flex items-center space-x-2 hover:bg-sky-50 hover:border-sky-300"
          >
            <Twitter className="w-4 h-4 text-sky-500" />
            <span>Twitter</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("linkedin")}
            className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300"
          >
            <Linkedin className="w-4 h-4 text-blue-700" />
            <span>LinkedIn</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("whatsapp")}
            className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-300"
          >
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span>WhatsApp</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("email")}
            className="flex items-center space-x-2 hover:bg-gray-50 hover:border-gray-300 col-span-2"
          >
            <Mail className="w-4 h-4 text-gray-600" />
            <span>Share via Email</span>
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Thank you for helping us grow! 🚀</p>
        </div>
      </CardContent>
    </Card>
  )
}

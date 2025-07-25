"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
  showSupport?: boolean
}

export function Logo({ size = "md", className, showText = true, showSupport = false }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <Image
        src="/child-care-logo.png"
        alt="Child Care Invoice by Plan-It Inc."
        width={size === "xl" ? 96 : size === "lg" ? 64 : size === "md" ? 48 : 32}
        height={size === "xl" ? 96 : size === "lg" ? 64 : size === "md" ? 48 : 32}
        className={cn("object-contain", sizeClasses[size])}
        priority
      />
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold text-gray-900", textSizeClasses[size])}>Child Care Invoice</span>
          <span className={cn("text-gray-600 text-xs", size === "xl" && "text-sm")}>by Plan-It Inc.</span>
        </div>
      )}
      {showSupport && (
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 ml-4"
          onClick={() => window.open("mailto:support@plan-it.ca?subject=Child Care Invoice Support", "_blank")}
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Get Support
        </Button>
      )}
    </div>
  )
}

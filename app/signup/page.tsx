"use client"

import { useState } from "react"
import { useActionState } from "react"
import { createAccount } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, User, Building, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(createAccount, null)
  const [selectedRole, setSelectedRole] = useState("")

  const roleOptions = [
    {
      value: "system_admin",
      title: "System Administrator",
      description: "Manage entire platform, users, organizations, and system settings",
      icon: User,
    },
    {
      value: "childcare_admin",
      title: "Childcare Business Owner/Administrator",
      description: "Manage your childcare business, create invoices, handle billing",
      icon: Building,
    },
    {
      value: "guardian",
      title: "Parent/Guardian",
      description: "View invoices, make payments, manage your child's account",
      icon: Users,
    },
  ]

  if (state?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-900">Account Created!</CardTitle>
            <CardDescription className="text-green-700">{state.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                You can now sign in with your email and password to access your dashboard.
              </p>
              <Link href="/" className="w-full">
                <Button className="w-full">Go to Sign In</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">Choose your account type and get started</p>
        </div>

        <form action={formAction} className="space-y-8">
          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Account Type</CardTitle>
              <CardDescription>Choose the type of account you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roleOptions.map((role) => {
                  const Icon = role.icon
                  return (
                    <div
                      key={role.value}
                      className={`relative cursor-pointer rounded-lg border p-4 hover:bg-gray-50 ${
                        selectedRole === role.value
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedRole(role.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-gray-600" />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{role.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={selectedRole === role.value}
                        onChange={() => setSelectedRole(role.value)}
                        className="absolute top-4 right-4"
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Enter your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" type="text" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" type="text" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input id="password" name="password" type="password" required />
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedRole === "childcare_admin"
                  ? "Business Address"
                  : selectedRole === "system_admin"
                    ? "Work Address"
                    : "Home Address"}
              </CardTitle>
              <CardDescription>
                {selectedRole === "childcare_admin"
                  ? "Enter your business location details"
                  : "Enter your address information (optional)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input id="streetAddress" name="streetAddress" type="text" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" type="text" />
                </div>
                <div>
                  <Label htmlFor="province">Province/State</Label>
                  <Input id="province" name="province" type="text" />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal/Zip Code</Label>
                  <Input id="postalCode" name="postalCode" type="text" />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" type="text" defaultValue="Canada" />
              </div>
            </CardContent>
          </Card>

          {/* Business Information - Only for Childcare Admin */}
          {selectedRole === "childcare_admin" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Tell us about your childcare business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input id="businessName" name="businessName" type="text" required />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select name="businessType">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Business Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Child Care Centre">Child Care Centre</SelectItem>
                        <SelectItem value="Child Care Preschool">Child Care Preschool</SelectItem>
                        <SelectItem value="Child Care Home Business">Child Care Home Business</SelectItem>
                        <SelectItem value="Child Care Multi-Location">Child Care Multi-Location</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="numberOfChildren">Number of Children You Care For</Label>
                    <Select name="numberOfChildren">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 children</SelectItem>
                        <SelectItem value="11-25">11-25 children</SelectItem>
                        <SelectItem value="26-50">26-50 children</SelectItem>
                        <SelectItem value="51-100">51-100 children</SelectItem>
                        <SelectItem value="100+">100+ children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currentSoftware">Current Software/System Used</Label>
                    <Input
                      id="currentSoftware"
                      name="currentSoftware"
                      type="text"
                      placeholder="e.g., Excel, QuickBooks, Paper-based"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Package Selection</CardTitle>
                  <CardDescription>Choose the package that best fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select name="selectedPackage">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic - $29/month</SelectItem>
                      <SelectItem value="Professional">Professional - $59/month</SelectItem>
                      <SelectItem value="Enterprise">Enterprise - $99/month</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Help us serve you better</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                    <Select name="hearAboutUs">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Google Search">Google Search</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Referral">Referral from Friend/Colleague</SelectItem>
                        <SelectItem value="Industry Publication">Industry Publication</SelectItem>
                        <SelectItem value="Trade Show">Trade Show/Conference</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes or Questions</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      placeholder="Tell us about any specific needs or questions you have..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Child Information - Only for Parents */}
          {selectedRole === "guardian" && (
            <Card>
              <CardHeader>
                <CardTitle>Child Information</CardTitle>
                <CardDescription>Tell us about your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="childName">Child's Name</Label>
                  <Input id="childName" name="childName" type="text" />
                </div>
                <div>
                  <Label htmlFor="childAge">Child's Age</Label>
                  <Select name="childAge">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Age Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-6 months">0-6 months</SelectItem>
                      <SelectItem value="6-12 months">6-12 months</SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="2-3 years">2-3 years</SelectItem>
                      <SelectItem value="3-4 years">3-4 years</SelectItem>
                      <SelectItem value="4-5 years">4-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="childcareProvider">Childcare Provider Name</Label>
                  <Input
                    id="childcareProvider"
                    name="childcareProvider"
                    type="text"
                    placeholder="Name of your childcare center or provider"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {state?.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" disabled={isPending || !selectedRole} className="w-full max-w-md">
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/" className="text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

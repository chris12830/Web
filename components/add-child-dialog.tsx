"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Child {
  id?: string
  firstName: string
  lastName: string
  dateOfBirth: string
  guardianName: string
  guardianEmail: string
  ageRange: string
  enrollmentDate: string
  isActive: boolean
}

interface AddChildDialogProps {
  children: React.ReactNode
  onAdd?: (child: Omit<Child, "id">) => void
}

export function AddChildDialog({ children, onAdd }: AddChildDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    guardianName: "",
    guardianEmail: "",
    ageRange: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    isActive: true,
  })

  // Age ranges from the system
  const ageRanges = [
    { id: "1", name: "Infants", minAge: 0, maxAge: 12 },
    { id: "2", name: "Toddlers", minAge: 13, maxAge: 24 },
    { id: "3", name: "Preschoolers", minAge: 25, maxAge: 48 },
    { id: "4", name: "School Age", minAge: 49, maxAge: 144 },
  ]

  const calculateAgeInMonths = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    return (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth())
  }

  const getSuggestedAgeRange = (dateOfBirth: string) => {
    const ageInMonths = calculateAgeInMonths(dateOfBirth)
    const suggestedRange = ageRanges.find((range) => ageInMonths >= range.minAge && ageInMonths <= range.maxAge)
    return suggestedRange?.name || ""
  }

  const handleDateOfBirthChange = (dateOfBirth: string) => {
    const suggestedAgeRange = getSuggestedAgeRange(dateOfBirth)
    setFormData({
      ...formData,
      dateOfBirth,
      ageRange: suggestedAgeRange,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.ageRange) {
      alert("Please fill in all required fields.")
      return
    }

    const newChild: Omit<Child, "id"> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      guardianName: formData.guardianName,
      guardianEmail: formData.guardianEmail,
      ageRange: formData.ageRange,
      enrollmentDate: formData.enrollmentDate,
      isActive: formData.isActive,
    }

    if (onAdd) {
      onAdd(newChild)
    }

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      guardianName: "",
      guardianEmail: "",
      ageRange: "",
      enrollmentDate: new Date().toISOString().split("T")[0],
      isActive: true,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Child</DialogTitle>
          <DialogDescription>
            Add a new child to your childcare program. Fill in their information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleDateOfBirthChange(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ageRange">Age Range Group *</Label>
              <Select
                value={formData.ageRange}
                onValueChange={(value) => setFormData({ ...formData, ageRange: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age range group" />
                </SelectTrigger>
                <SelectContent>
                  {ageRanges.map((range) => (
                    <SelectItem key={range.id} value={range.name}>
                      {range.name} ({range.minAge === 0 ? "0" : range.minAge}-{range.maxAge} months)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.dateOfBirth && (
                <p className="text-sm text-gray-600">
                  Child's age: {Math.floor(calculateAgeInMonths(formData.dateOfBirth) / 12)} years{" "}
                  {calculateAgeInMonths(formData.dateOfBirth) % 12} months
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="guardianName">Guardian Name</Label>
              <Input
                id="guardianName"
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                placeholder="Parent/Guardian full name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="guardianEmail">Guardian Email</Label>
              <Input
                id="guardianEmail"
                type="email"
                value={formData.guardianEmail}
                onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                placeholder="parent@email.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.isActive ? "active" : "inactive"}
                onValueChange={(value) => setFormData({ ...formData, isActive: value === "active" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Child</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

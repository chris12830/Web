"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Baby } from "lucide-react"
import type { AgeRange } from "@/lib/age-ranges"

interface AgeRangeManagerProps {
  ageRanges: AgeRange[]
}

export function AgeRangeManager({ ageRanges }: AgeRangeManagerProps) {
  const [open, setOpen] = useState(false)
  const [editingRange, setEditingRange] = useState<AgeRange | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatAgeRange = (minMonths: number, maxMonths: number) => {
    const minYears = Math.floor(minMonths / 12)
    const minRemainingMonths = minMonths % 12
    const maxYears = Math.floor(maxMonths / 12)
    const maxRemainingMonths = maxMonths % 12

    const formatAge = (years: number, months: number) => {
      if (years === 0) return `${months}mo`
      if (months === 0) return `${years}y`
      return `${years}y ${months}mo`
    }

    return `${formatAge(minYears, minRemainingMonths)} - ${formatAge(maxYears, maxRemainingMonths)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const ageRangeData = {
      name: formData.get("name") as string,
      minAgeMonths: Number.parseInt(formData.get("minAgeMonths") as string),
      maxAgeMonths: Number.parseInt(formData.get("maxAgeMonths") as string),
      monthlyRate: Number.parseFloat(formData.get("monthlyRate") as string),
      description: formData.get("description") as string,
    }

    alert(`${editingRange ? "Updated" : "Created"} Age Range:

Name: ${ageRangeData.name}
Age Range: ${formatAgeRange(ageRangeData.minAgeMonths, ageRangeData.maxAgeMonths)}
Monthly Rate: ${formatCurrency(ageRangeData.monthlyRate)}
Description: ${ageRangeData.description}

(Demo mode - Would save to database)`)

    setOpen(false)
    setEditingRange(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Baby className="w-5 h-5" />
              <span>Age Range Pricing</span>
            </CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingRange(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Age Range
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingRange ? "Edit Age Range" : "Add New Age Range"}</DialogTitle>
                  <DialogDescription>Configure pricing based on child age ranges in months</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Age Range Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={editingRange?.name}
                      placeholder="e.g., Infant Care (6-18 months)"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minAgeMonths">Min Age (months)</Label>
                      <Input
                        id="minAgeMonths"
                        name="minAgeMonths"
                        type="number"
                        min="0"
                        max="72"
                        defaultValue={editingRange?.minAgeMonths}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxAgeMonths">Max Age (months)</Label>
                      <Input
                        id="maxAgeMonths"
                        name="maxAgeMonths"
                        type="number"
                        min="0"
                        max="72"
                        defaultValue={editingRange?.maxAgeMonths}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyRate">Monthly Rate ($)</Label>
                    <Input
                      id="monthlyRate"
                      name="monthlyRate"
                      type="number"
                      step="0.01"
                      min="0"
                      defaultValue={editingRange?.monthlyRate}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={editingRange?.description}
                      placeholder="Describe the care provided for this age range..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingRange ? "Update" : "Create"} Age Range</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead>Monthly Rate</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ageRanges.map((range) => (
                <TableRow key={range.id}>
                  <TableCell className="font-medium">{range.name}</TableCell>
                  <TableCell>{formatAgeRange(range.minAgeMonths, range.maxAgeMonths)}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(range.monthlyRate)}</TableCell>
                  <TableCell className="max-w-xs truncate">{range.description}</TableCell>
                  <TableCell>
                    <Badge className={range.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {range.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRange(range)
                          setOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete the age range "${range.name}"?`)) {
                            alert(`Deleted age range: ${range.name}\n\n(Demo mode - Would delete from database)`)
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {ageRanges.length === 0 && (
            <div className="text-center py-8">
              <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No age ranges configured yet.</p>
              <p className="text-sm text-gray-400">Add your first age range to start pricing by age.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

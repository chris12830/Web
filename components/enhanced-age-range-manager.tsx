"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit2, Trash2, Save, X, Clock, Calendar, DollarSign } from "lucide-react"

interface AgeRange {
  id: string
  name: string
  minAge: number
  maxAge: number
  rates: {
    halfDay: number
    fullDay: number
    monthly: number
  }
  isActive: boolean
}

export function EnhancedAgeRangeManager() {
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([
    {
      id: "1",
      name: "Infants",
      minAge: 0,
      maxAge: 12,
      rates: { halfDay: 45, fullDay: 85, monthly: 1400 },
      isActive: true,
    },
    {
      id: "2",
      name: "Toddlers",
      minAge: 13,
      maxAge: 24,
      rates: { halfDay: 40, fullDay: 75, monthly: 1200 },
      isActive: true,
    },
    {
      id: "3",
      name: "Preschoolers",
      minAge: 25,
      maxAge: 48,
      rates: { halfDay: 35, fullDay: 65, monthly: 1000 },
      isActive: true,
    },
    {
      id: "4",
      name: "School Age",
      minAge: 49,
      maxAge: 144,
      rates: { halfDay: 30, fullDay: 55, monthly: 800 },
      isActive: true,
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newRange, setNewRange] = useState<Omit<AgeRange, "id">>({
    name: "",
    minAge: 0,
    maxAge: 12,
    rates: { halfDay: 0, fullDay: 0, monthly: 0 },
    isActive: true,
  })

  const handleSaveNew = () => {
    if (!newRange.name.trim()) {
      alert("Please enter a name for the age range.")
      return
    }

    const id = Date.now().toString()
    setAgeRanges([...ageRanges, { ...newRange, id }])
    setNewRange({
      name: "",
      minAge: 0,
      maxAge: 12,
      rates: { halfDay: 0, fullDay: 0, monthly: 0 },
      isActive: true,
    })
    setIsAddingNew(false)
    alert("Age range added successfully!")
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSaveEdit = (id: string, updatedRange: AgeRange) => {
    setAgeRanges(ageRanges.map((range) => (range.id === id ? updatedRange : range)))
    setEditingId(null)
    alert("Age range updated successfully!")
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this age range?")) {
      setAgeRanges(ageRanges.filter((range) => range.id !== id))
      alert("Age range deleted successfully!")
    }
  }

  const formatAge = (months: number) => {
    if (months < 12) return `${months} months`
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (remainingMonths === 0) return `${years} year${years > 1 ? "s" : ""}`
    return `${years}y ${remainingMonths}m`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Age Range Management</h2>
          <p className="text-gray-600">Configure pricing for different age groups with flexible time-based rates</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Age Range
        </Button>
      </div>

      {/* Add New Age Range */}
      {isAddingNew && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Add New Age Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Range Name</Label>
                <Input
                  value={newRange.name}
                  onChange={(e) => setNewRange({ ...newRange, name: e.target.value })}
                  placeholder="e.g., Infants"
                />
              </div>
              <div className="space-y-2">
                <Label>Min Age (months)</Label>
                <Input
                  type="number"
                  value={newRange.minAge || ""}
                  onChange={(e) => {
                    const value = e.target.value === "" ? 0 : Number.parseInt(e.target.value) || 0
                    setNewRange({ ...newRange, minAge: value })
                  }}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Age (months)</Label>
                <Input
                  type="number"
                  value={newRange.maxAge || ""}
                  onChange={(e) => {
                    const value = e.target.value === "" ? 0 : Number.parseInt(e.target.value) || 0
                    setNewRange({ ...newRange, maxAge: value })
                  }}
                  placeholder="12"
                />
              </div>
            </div>

            <Tabs defaultValue="rates" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="rates">Pricing Rates</TabsTrigger>
              </TabsList>
              <TabsContent value="rates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-orange-500" />
                        Half Day Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          step="0.01"
                          value={newRange.rates.halfDay || ""}
                          onChange={(e) =>
                            setNewRange({
                              ...newRange,
                              rates: {
                                ...newRange.rates,
                                halfDay: e.target.value === "" ? 0 : Number.parseFloat(e.target.value) || 0,
                              },
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        Full Day Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          step="0.01"
                          value={newRange.rates.fullDay || ""}
                          onChange={(e) =>
                            setNewRange({
                              ...newRange,
                              rates: {
                                ...newRange.rates,
                                fullDay: e.target.value === "" ? 0 : Number.parseFloat(e.target.value) || 0,
                              },
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        Monthly Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          step="0.01"
                          value={newRange.rates.monthly || ""}
                          onChange={(e) =>
                            setNewRange({
                              ...newRange,
                              rates: {
                                ...newRange.rates,
                                monthly: e.target.value === "" ? 0 : Number.parseFloat(e.target.value) || 0,
                              },
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-2">
              <Button onClick={handleSaveNew} disabled={!newRange.name.trim()}>
                <Save className="w-4 h-4 mr-2" />
                Save Age Range
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Age Ranges */}
      <div className="grid grid-cols-1 gap-6">
        {ageRanges.map((range) => (
          <AgeRangeCard
            key={range.id}
            range={range}
            isEditing={editingId === range.id}
            onEdit={() => handleEdit(range.id)}
            onSave={(updatedRange) => handleSaveEdit(range.id, updatedRange)}
            onCancel={() => setEditingId(null)}
            onDelete={() => handleDelete(range.id)}
            formatAge={formatAge}
          />
        ))}
      </div>
    </div>
  )
}

function AgeRangeCard({
  range,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  formatAge,
}: {
  range: AgeRange
  isEditing: boolean
  onEdit: () => void
  onSave: (range: AgeRange) => void
  onCancel: () => void
  onDelete: () => void
  formatAge: (months: number) => string
}) {
  const [editedRange, setEditedRange] = useState(range)

  if (isEditing) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg">Edit Age Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Range Name</Label>
              <Input
                value={editedRange.name}
                onChange={(e) => setEditedRange({ ...editedRange, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Min Age (months)</Label>
              <Input
                type="number"
                value={editedRange.minAge || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? 0 : Number.parseInt(e.target.value) || 0
                  setEditedRange({ ...editedRange, minAge: value })
                }}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Age (months)</Label>
              <Input
                type="number"
                value={editedRange.maxAge || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? 0 : Number.parseInt(e.target.value) || 0
                  setEditedRange({ ...editedRange, maxAge: value })
                }}
                placeholder="12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  Half Day Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    step="0.01"
                    value={editedRange.rates.halfDay || ""}
                    onChange={(e) =>
                      setEditedRange({
                        ...editedRange,
                        rates: {
                          ...editedRange.rates,
                          halfDay: e.target.value === "" ? 0 : Number.parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Full Day Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    step="0.01"
                    value={editedRange.rates.fullDay || ""}
                    onChange={(e) =>
                      setEditedRange({
                        ...editedRange,
                        rates: {
                          ...editedRange.rates,
                          fullDay: e.target.value === "" ? 0 : Number.parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  Monthly Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    step="0.01"
                    value={editedRange.rates.monthly || ""}
                    onChange={(e) =>
                      setEditedRange({
                        ...editedRange,
                        rates: {
                          ...editedRange.rates,
                          monthly: e.target.value === "" ? 0 : Number.parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editedRange)}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${range.isActive ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>{range.name}</span>
              <Badge variant={range.isActive ? "default" : "secondary"}>{range.isActive ? "Active" : "Inactive"}</Badge>
            </CardTitle>
            <CardDescription>
              Ages {formatAge(range.minAge)} - {formatAge(range.maxAge)}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Half Day</span>
            </div>
            <span className="font-bold text-orange-600">${range.rates.halfDay}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Full Day</span>
            </div>
            <span className="font-bold text-blue-600">${range.rates.fullDay}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Monthly</span>
            </div>
            <span className="font-bold text-green-600">${range.rates.monthly}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

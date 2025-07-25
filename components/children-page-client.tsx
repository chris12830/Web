"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  Users,
  Baby,
  Mail,
  Edit,
  Trash2,
  Eye,
  Settings,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { AddChildDialog } from "@/components/add-child-dialog"
import { EnhancedAgeRangeManager } from "@/components/enhanced-age-range-manager"
import type { Child } from "@/lib/database"

interface ChildrenPageClientProps {
  children: Child[]
}

type SortField = "firstName" | "lastName" | "guardianName" | "ageRange" | "enrollmentDate" | "isActive"
type SortDirection = "asc" | "desc"

export function ChildrenPageClient({ children: initialChildren }: ChildrenPageClientProps) {
  const [children, setChildren] = useState<Child[]>(initialChildren)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>("firstName")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getAgeGroup = (age: number) => {
    if (age <= 1) return "infant"
    if (age <= 3) return "toddler"
    if (age <= 5) return "preschool"
    return "school"
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1 text-blue-600" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 text-blue-600" />
    )
  }

  const sortedChildren = [...children].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "enrollmentDate") {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    }

    if (sortField === "isActive") {
      aValue = aValue ? 1 : 0
      bValue = bValue ? 1 : 0
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredChildren = sortedChildren.filter((child) => {
    const age = calculateAge(child.dateOfBirth)
    const ageGroup = getAgeGroup(age)

    const matchesSearch =
      searchTerm === "" ||
      `${child.firstName} ${child.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (child.guardianName && child.guardianName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && child.isActive) ||
      (statusFilter === "inactive" && !child.isActive)

    const matchesAge = ageFilter === "all" || ageGroup === ageFilter

    return matchesSearch && matchesStatus && matchesAge
  })

  const handleAddChild = (newChild: Omit<Child, "id">) => {
    const child: Child = {
      ...newChild,
      id: `child-${Date.now()}`,
    }
    setChildren([...children, child])
    alert(`Child ${newChild.firstName} ${newChild.lastName} has been added successfully!`)
  }

  const handleEditChild = (childId: string) => {
    const child = children.find((c) => c.id === childId)
    if (child) {
      alert(
        `Edit Child: ${child.firstName} ${child.lastName}

This would open an edit form with the child's current information.`,
      )
    }
  }

  const handleViewProfile = (childId: string) => {
    const child = children.find((c) => c.id === childId)
    if (child) {
      const age = calculateAge(child.dateOfBirth)
      alert(`Child Profile: ${child.firstName} ${child.lastName}

📋 Personal Information:
• Full Name: ${child.firstName} ${child.lastName}
• Date of Birth: ${formatDate(child.dateOfBirth)}
• Age: ${age} years old
• Enrollment Date: ${formatDate(child.enrollmentDate)}

👨‍👩‍👧‍👦 Guardian Information:
• Primary Guardian: ${child.guardianName || "Not specified"}
• Contact Email: ${child.guardianEmail || "Not specified"}

📊 Enrollment Status:
• Status: ${child.isActive ? "✅ Active" : "❌ Inactive"}

💰 Account Information:
• Last Invoice: Not available
• Payment Status: Up to date
• Outstanding Balance: $0.00`)
    }
  }

  const handleDeleteChild = (childId: string) => {
    const child = children.find((c) => c.id === childId)
    if (child && confirm(`Are you sure you want to remove ${child.firstName} ${child.lastName} from the system?`)) {
      setChildren(children.filter((c) => c.id !== childId))
      alert("Child has been removed from your program.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs defaultValue="children" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Children Management</h1>
            <p className="text-gray-600">Manage enrolled children and age range settings</p>
          </div>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="children" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Enrolled Children
            </TabsTrigger>
            <TabsTrigger value="age-ranges" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Age Ranges & Pricing
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="children" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Registered Children: {children.length}</h2>
              <p className="text-sm text-gray-600">
                Active: {children.filter((c) => c.isActive).length} | Inactive:{" "}
                {children.filter((c) => !c.isActive).length}
              </p>
            </div>
            <AddChildDialog onAdd={handleAddChild}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Child
              </Button>
            </AddChildDialog>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search children by name..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Children</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="infant">Infant (0-1)</SelectItem>
                    <SelectItem value="toddler">Toddler (1-3)</SelectItem>
                    <SelectItem value="preschool">Preschool (3-5)</SelectItem>
                    <SelectItem value="school">School Age (5+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Children List */}
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Children ({filteredChildren.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredChildren.length === 0 ? (
                <div className="text-center py-8">
                  <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {children.length === 0 ? "No children enrolled yet." : "No children match your search criteria."}
                  </p>
                  <p className="text-sm text-gray-400">
                    {children.length === 0 ? "Add your first child to get started." : "Try adjusting your filters."}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50 select-none"
                        onClick={() => handleSort("firstName")}
                      >
                        <div className="flex items-center">
                          First Name
                          {getSortIcon("firstName")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50 select-none"
                        onClick={() => handleSort("lastName")}
                      >
                        <div className="flex items-center">
                          Last Name
                          {getSortIcon("lastName")}
                        </div>
                      </TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50 select-none"
                        onClick={() => handleSort("guardianName")}
                      >
                        <div className="flex items-center">
                          Guardian
                          {getSortIcon("guardianName")}
                        </div>
                      </TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50 select-none"
                        onClick={() => handleSort("enrollmentDate")}
                      >
                        <div className="flex items-center">
                          Enrollment Date
                          {getSortIcon("enrollmentDate")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50 select-none"
                        onClick={() => handleSort("isActive")}
                      >
                        <div className="flex items-center">
                          Status
                          {getSortIcon("isActive")}
                        </div>
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChildren.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell className="font-medium">{child.firstName}</TableCell>
                        <TableCell className="font-medium">{child.lastName}</TableCell>
                        <TableCell>{calculateAge(child.dateOfBirth)} years</TableCell>
                        <TableCell>{child.guardianName || "Not specified"}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{child.guardianEmail || "Not specified"}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(child.enrollmentDate)}</TableCell>
                        <TableCell>
                          <Badge
                            className={child.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {child.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditChild(child.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleViewProfile(child.id)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteChild(child.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
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

        <TabsContent value="age-ranges" className="space-y-6">
          <EnhancedAgeRangeManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}

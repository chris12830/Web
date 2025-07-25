"use server"

import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

export async function createAccount(prevState: any, formData: FormData) {
  try {
    // Extract form data
    const role = formData.get("role") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const businessName = formData.get("businessName") as string
    const businessType = formData.get("businessType") as string
    const streetAddress = formData.get("streetAddress") as string
    const city = formData.get("city") as string
    const province = formData.get("province") as string
    const postalCode = formData.get("postalCode") as string
    const country = formData.get("country") as string

    console.log("Creating account with data:", {
      role,
      firstName,
      lastName,
      email,
      businessName,
      businessType,
    })

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      }
    }

    // Validate role-specific required fields
    if (role === "childcare_admin" && !businessName) {
      return {
        success: false,
        error: "Business name is required for childcare administrators.",
      }
    }

    // Validate password
    if (password.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters long.",
      }
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords do not match.",
      }
    }

    // Check if email already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return {
        success: false,
        error: "An account with this email already exists.",
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    let organizationId = null

    // Create organization for childcare_admin
    if (role === "childcare_admin") {
      const fullAddress = [streetAddress, city, province, postalCode, country].filter(Boolean).join(", ")

      console.log("Creating organization:", businessName)

      const organizationResult = await sql`
        INSERT INTO organizations (name, address, phone, email, subscription_status)
        VALUES (
          ${businessName},
          ${fullAddress || null},
          ${phone || null},
          ${email},
          'active'
        )
        RETURNING id
      `
      organizationId = organizationResult[0].id
      console.log("Organization created with ID:", organizationId)
    }

    // Create user account
    const fullAddress = [streetAddress, city, province, postalCode, country].filter(Boolean).join(", ")

    console.log("Creating user account...")

    const userResult = await sql`
      INSERT INTO users (
        email, 
        password_hash, 
        first_name, 
        last_name, 
        role, 
        organization_id, 
        phone, 
        address,
        is_active
      )
      VALUES (
        ${email},
        ${passwordHash},
        ${firstName},
        ${lastName},
        ${role},
        ${organizationId},
        ${phone || null},
        ${fullAddress || null},
        true
      )
      RETURNING id
    `

    const userId = userResult[0].id
    console.log("User created with ID:", userId)

    // Create default services and age ranges for childcare_admin
    if (role === "childcare_admin" && organizationId) {
      console.log("Creating default services and age ranges...")

      // Create default services for the organization
      const defaultServices = [
        { name: "Infant Care (0-18 months)", rate: 1400.0, description: "Full-time infant care services" },
        { name: "Toddler Care (18 months - 3 years)", rate: 1200.0, description: "Full-time toddler care services" },
        { name: "Preschool (3-4 years)", rate: 1000.0, description: "Full-time preschool program" },
        { name: "Pre-K (4-5 years)", rate: 900.0, description: "Full-time pre-kindergarten program" },
      ]

      for (const service of defaultServices) {
        await sql`
          INSERT INTO services (organization_id, name, description, rate, billing_frequency, is_active)
          VALUES (${organizationId}, ${service.name}, ${service.description}, ${service.rate}, 'monthly', true)
        `
      }

      // Create default age ranges for the organization
      const defaultAgeRanges = [
        { name: "Infant", minAge: 0, maxAge: 18, unit: "months", rate: 1400.0 },
        { name: "Toddler", minAge: 18, maxAge: 36, unit: "months", rate: 1200.0 },
        { name: "Preschool", minAge: 3, maxAge: 4, unit: "years", rate: 1000.0 },
        { name: "Pre-K", minAge: 4, maxAge: 5, unit: "years", rate: 900.0 },
      ]

      for (const ageRange of defaultAgeRanges) {
        await sql`
          INSERT INTO age_ranges (organization_id, name, min_age, max_age, age_unit, monthly_rate, is_active)
          VALUES (${organizationId}, ${ageRange.name}, ${ageRange.minAge}, ${ageRange.maxAge}, ${ageRange.unit}, ${ageRange.rate}, true)
        `
      }

      console.log("Default services and age ranges created")
    }

    console.log("Account creation successful for:", email)

    return {
      success: true,
      message: "Account created successfully! You can now log in with your credentials.",
    }
  } catch (error) {
    console.error("Account creation error:", error)
    return {
      success: false,
      error: "Failed to create account. Please try again or contact support if the problem persists.",
    }
  }
}

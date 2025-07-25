"use server"

import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const sql = neon(process.env.DATABASE_URL!)

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      error: "Please enter both email and password.",
    }
  }

  try {
    // Get user from database
    const users = await sql`
      SELECT u.*, o.name as organization_name 
      FROM users u
      LEFT JOIN organizations o ON u.organization_id = o.id
      WHERE u.email = ${email} AND u.is_active = true
    `

    if (users.length === 0) {
      return {
        error: "Invalid email or password.",
      }
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return {
        error: "Invalid email or password.",
      }
    }

    // Create session
    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organization_id,
      firstName: user.first_name,
      lastName: user.last_name,
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    console.log("Login successful for:", user.email, "Role:", user.role)
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "An error occurred during login. Please try again.",
    }
  }

  // Redirect based on role - outside try/catch to avoid catching redirect
  const users = await sql`
    SELECT role FROM users WHERE email = ${email}
  `
  const userRole = users[0]?.role

  if (userRole === "system_admin") {
    redirect("/admin")
  } else if (userRole === "childcare_admin") {
    redirect("/childcare")
  } else if (userRole === "guardian") {
    redirect("/parent")
  } else {
    redirect("/")
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/")
}

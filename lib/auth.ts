import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "system_admin" | "childcare_admin" | "parent"
  organizationId?: string
  organizationName?: string
}

export async function createSession(user: User) {
  const sessionData = JSON.stringify(user)
  const cookieStore = cookies()

  cookieStore.set("session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie?.value) {
      return null
    }

    const user = JSON.parse(sessionCookie.value) as User
    return user
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}

export async function login(email: string, password: string): Promise<User | null> {
  try {
    const users = await sql`
      SELECT u.*, o.name as organization_name 
      FROM users u 
      LEFT JOIN organizations o ON u.organization_id = o.id 
      WHERE u.email = ${email}
    `

    if (users.length === 0) {
      return null
    }

    const user = users[0]
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return null
    }

    const sessionUser: User = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
      organizationId: user.organization_id,
      organizationName: user.organization_name,
    }

    await createSession(sessionUser)
    return sessionUser
  } catch (error) {
    console.error("Login error:", error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()
  if (!user) {
    redirect("/")
  }
  return user
}

export async function requireRole(allowedRoles: string[]): Promise<User> {
  const user = await requireAuth()
  if (!allowedRoles.includes(user.role)) {
    redirect("/")
  }
  return user
}

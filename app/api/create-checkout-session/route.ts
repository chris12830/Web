import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const PLAN_PRICES = {
  STARTER: 2900, // $29.00 in cents
  PROFESSIONAL: 5900, // $59.00 in cents
  ENTERPRISE: 9900, // $99.00 in cents
}

export async function POST(request: NextRequest) {
  try {
    console.log("Creating checkout session...")

    const body = await request.json()
    const { plan, organizationName, customerEmail } = body

    console.log("Plan:", plan, "Organization:", organizationName)

    if (!plan || !PLAN_PRICES[plan as keyof typeof PLAN_PRICES]) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Child Care Invoice - ${plan} Plan`,
              description: `Monthly subscription for ${organizationName || "your organization"}`,
            },
            unit_amount: PLAN_PRICES[plan as keyof typeof PLAN_PRICES],
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.nextUrl.origin}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/pricing`,
      metadata: {
        plan,
        organizationName: organizationName || "",
      },
      customer_email: customerEmail,
      allow_promotion_codes: true,
      billing_address_collection: "required",
    })

    // 👇 NEW: include the session URL so the client can open it directly
    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

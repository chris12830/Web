import { type NextRequest, NextResponse } from "next/server"
import { stripe, PAYMENT_TEMPLATES, SAAS_PLANS, type SaaSPlan } from "@/lib/stripe-templates"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, data } = await request.json()

    let sessionConfig: any = {
      customer_email: user.email,
      success_url: `${request.nextUrl.origin}/dashboard/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/dashboard`,
    }

    switch (type) {
      case "SUBSCRIPTION":
        // SaaS Subscription Payment
        const { plan } = data
        if (!plan || !SAAS_PLANS[plan as SaaSPlan]) {
          return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
        }

        const selectedPlan = SAAS_PLANS[plan as SaaSPlan]
        sessionConfig = {
          ...sessionConfig,
          ...PAYMENT_TEMPLATES.SUBSCRIPTION,
          line_items: [
            {
              price: selectedPlan.priceId,
              quantity: 1,
            },
          ],
          metadata: {
            userId: user.id,
            plan: plan,
            type: "subscription",
          },
        }
        break

      case "INVOICE_PAYMENT":
        // One-time invoice payment
        const { invoiceId, amount, description } = data
        sessionConfig = {
          ...sessionConfig,
          ...PAYMENT_TEMPLATES.INVOICE_PAYMENT,
          success_url: `${request.nextUrl.origin}/parent/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.nextUrl.origin}/parent/invoices`,
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: description || "Childcare Invoice Payment",
                  description: `Payment for invoice ${invoiceId}`,
                },
                unit_amount: Math.round(amount * 100), // Convert to cents
              },
              quantity: 1,
            },
          ],
          metadata: {
            userId: user.id,
            invoiceId: invoiceId,
            type: "invoice_payment",
          },
        }
        break

      case "SETUP_PAYMENT_METHOD":
        // Save payment method for future use
        sessionConfig = {
          ...sessionConfig,
          ...PAYMENT_TEMPLATES.SETUP,
          success_url: `${request.nextUrl.origin}/dashboard/payment-methods?setup=success`,
          metadata: {
            userId: user.id,
            type: "setup_payment_method",
          },
        }
        break

      default:
        return NextResponse.json({ error: "Invalid payment type" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)
    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Error creating payment session:", error)
    return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 })
  }
}

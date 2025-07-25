import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")!

    let event: any

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        console.log("Payment successful:", session)

        // Here you would:
        // 1. Create the organization in your database
        // 2. Set up the user's subscription
        // 3. Send welcome email
        await handleSuccessfulPayment(session)
        break

      case "customer.subscription.updated":
        const subscription = event.data.object
        console.log("Subscription updated:", subscription)

        // Handle subscription changes (plan upgrades/downgrades)
        await handleSubscriptionUpdate(subscription)
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object
        console.log("Subscription cancelled:", deletedSubscription)

        // Handle subscription cancellation
        await handleSubscriptionCancellation(deletedSubscription)
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object
        console.log("Payment failed:", failedInvoice)

        // Handle failed payments
        await handleFailedPayment(failedInvoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleSuccessfulPayment(session: any) {
  // TODO: Implement database operations
  console.log("Creating organization for user:", session.metadata.userId)
  console.log("Plan:", session.metadata.plan)
  console.log("Organization name:", session.metadata.organizationName)

  // Example implementation:
  // 1. Create organization record
  // 2. Update user with organizationId and role
  // 3. Set subscription status to active
  // 4. Send welcome email
}

async function handleSubscriptionUpdate(subscription: any) {
  // TODO: Update subscription in database
  console.log("Updating subscription:", subscription.id)
}

async function handleSubscriptionCancellation(subscription: any) {
  // TODO: Handle cancellation
  console.log("Cancelling subscription:", subscription.id)
}

async function handleFailedPayment(invoice: any) {
  // TODO: Handle failed payment
  console.log("Payment failed for:", invoice.customer)
}

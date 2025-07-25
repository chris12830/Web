import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
})

// Prebuilt Payment Templates
export const PAYMENT_TEMPLATES = {
  // One-time payment for invoice
  INVOICE_PAYMENT: {
    mode: "payment" as const,
    payment_method_types: ["card", "us_bank_account"],
    allow_promotion_codes: true,
  },

  // Subscription for SaaS plans
  SUBSCRIPTION: {
    mode: "subscription" as const,
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
    },
  },

  // Setup for future payments (save payment method)
  SETUP: {
    mode: "setup" as const,
    payment_method_types: ["card"],
    usage: "off_session",
  },
} as const

// SaaS Subscription Plans
export const SAAS_PLANS = {
  STARTER: {
    priceId:
      process.env.NODE_ENV === "production"
        ? "price_live_starter_monthly" // Replace with your live price ID
        : "price_test_starter_monthly", // Replace with your test price ID
    name: "Starter Plan",
    price: 29,
    features: ["Up to 50 children", "Unlimited invoices", "Parent portal", "Email support"],
  },
  PROFESSIONAL: {
    priceId:
      process.env.NODE_ENV === "production"
        ? "price_live_professional_monthly" // Replace with your live price ID
        : "price_test_professional_monthly", // Replace with your test price ID
    name: "Professional Plan",
    price: 59,
    features: ["Up to 200 children", "Advanced reporting", "Priority support", "Custom branding"],
  },
  ENTERPRISE: {
    priceId:
      process.env.NODE_ENV === "production"
        ? "price_live_enterprise_monthly" // Replace with your live price ID
        : "price_test_enterprise_monthly", // Replace with your test price ID
    name: "Enterprise Plan",
    price: 99,
    features: ["Unlimited children", "API access", "Multi-location", "Dedicated support"],
  },
} as const

export type SaaSPlan = keyof typeof SAAS_PLANS

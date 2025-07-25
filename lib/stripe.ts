import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
})

export const STRIPE_PLANS = {
  STARTER: {
    priceId: "price_starter_monthly", // Replace with your actual Stripe Price ID
    name: "Starter Plan",
    price: 29,
    features: ["Up to 50 children", "Unlimited invoices", "Parent portal access", "Basic reporting", "Email support"],
  },
  PROFESSIONAL: {
    priceId: "price_professional_monthly", // Replace with your actual Stripe Price ID
    name: "Professional Plan",
    price: 59,
    features: [
      "Up to 200 children",
      "Unlimited invoices",
      "Parent portal access",
      "Advanced reporting",
      "Tax receipt generation",
      "Priority support",
      "Custom branding",
    ],
  },
  ENTERPRISE: {
    priceId: "price_enterprise_monthly", // Replace with your actual Stripe Price ID
    name: "Enterprise Plan",
    price: 99,
    features: [
      "Unlimited children",
      "Unlimited invoices",
      "Parent portal access",
      "Advanced reporting",
      "Tax receipt generation",
      "Priority support",
      "Custom branding",
      "API access",
      "Multi-location support",
    ],
  },
} as const

export type StripePlan = keyof typeof STRIPE_PLANS

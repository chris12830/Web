import { Suspense } from "react"
import { SubscriptionSuccessClient } from "@/components/subscription-success-client"

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionSuccessClient />
    </Suspense>
  )
}

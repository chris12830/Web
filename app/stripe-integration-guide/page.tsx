import { StripeFlowDiagram } from "@/components/stripe-flow-diagram"
import { PaymentTypesDemo } from "@/components/payment-types-demo"
import { StripeSecurityInfo } from "@/components/stripe-security-info"

export default function StripeIntegrationGuide() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">How Stripe Works in Your System</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete guide to understanding how Stripe payment processing is integrated into your Child Care Invoice
          system
        </p>
      </div>

      <StripeFlowDiagram />
      <PaymentTypesDemo />
      <StripeSecurityInfo />

      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Key Benefits for Your Business</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-blue-900">For Childcare Centers:</h3>
            <ul className="text-sm text-blue-800 space-y-1 mt-2">
              <li>• Automated recurring billing</li>
              <li>• Reduced payment processing time</li>
              <li>• Professional payment experience</li>
              <li>• Automatic invoice updates</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-blue-900">For Parents:</h3>
            <ul className="text-sm text-blue-800 space-y-1 mt-2">
              <li>• Secure online payments</li>
              <li>• Multiple payment methods</li>
              <li>• Automatic payment receipts</li>
              <li>• Payment history tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

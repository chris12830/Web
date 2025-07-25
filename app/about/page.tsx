import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Zap, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Child Care Invoice</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Story: Simplifying Childcare Business Management
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Child Care Invoice was born from a simple observation: childcare providers spend too much time on paperwork
            and not enough time doing what they love - caring for children.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How It All Started</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                In 2023, our founder was helping a local childcare provider with their business operations. What should
                have been a simple task - creating and sending invoices to parents - turned into hours of manual work
                every month. Spreadsheets, paper invoices, tracking payments by hand, and chasing down late payments
                consumed valuable time that could have been spent with the children.
              </p>

              <p>
                That's when we realized there had to be a better way. Childcare providers are passionate about nurturing
                young minds, not wrestling with accounting software designed for corporations. They needed something
                simple, affordable, and built specifically for their unique needs.
              </p>

              <p>We spent months talking to childcare providers across Canada, understanding their daily challenges:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Creating professional invoices that parents could easily understand</li>
                <li>Tracking which families had paid and which hadn't</li>
                <li>Managing different rates for different age groups</li>
                <li>Providing parents with easy ways to pay and access tax receipts</li>
                <li>Keeping everything organized without breaking the bank</li>
              </ul>

              <p>
                From these conversations, Child Care Invoice was born - a platform designed by childcare providers, for
                childcare providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">Everything we do is guided by these core principles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Care First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe childcare providers should spend their time caring for children, not managing paperwork.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Simplicity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our software is intuitive and easy to use, requiring no technical expertise or lengthy training.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We handle sensitive financial information with the highest security standards and transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're part of the childcare community and committed to supporting providers across Canada.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <div className="bg-blue-50 p-8 rounded-2xl">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              "To empower childcare providers with simple, affordable tools that handle the business side of childcare,
              so they can focus on what matters most - nurturing the next generation."
            </p>
            <p className="text-lg text-gray-600">
              Every feature we build, every decision we make, is guided by this mission.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Since launching, we've helped childcare providers across Canada</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Hours saved monthly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$50K+</div>
              <div className="text-gray-600">In payments processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Families served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Built by Plan-It Inc</h2>
          <p className="text-lg text-gray-600 mb-8">
            Child Care Invoice is proudly developed by Plan-It Inc, a Canadian technology company specializing in
            business management solutions for service-based industries.
          </p>
          <div className="flex justify-center">
            <Link href="https://www.planitinc.ca" target="_blank">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <span>Learn more about Plan-It Inc</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial today and see how Child Care Invoice can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <a href="mailto:support@childcareinvoice.com">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2024 Child Care Invoice by Plan-It Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

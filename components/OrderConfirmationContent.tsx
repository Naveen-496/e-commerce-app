'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle, Package, Truck, ShoppingBag } from 'lucide-react'

export function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-accent" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your order has been confirmed and is being prepared for shipment.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-secondary rounded-sm p-8 mb-8 space-y-6">
          <div className="border-b border-border pb-6">
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="font-serif text-2xl font-bold text-foreground">
              {orderId || '#000000'}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-4">
              What's Next
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: Package,
                  title: 'Order Confirmed',
                  description: 'We\'ve received your order and are preparing it for shipment.',
                },
                {
                  icon: Truck,
                  title: 'Shipped',
                  description: 'Track your package once it\'s on its way to you.',
                },
                {
                  icon: ShoppingBag,
                  title: 'Delivered',
                  description: 'Your items will arrive within 5-7 business days.',
                },
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Confirmation Email */}
        <div className="bg-secondary rounded-sm p-8 mb-8">
          <p className="text-foreground mb-2">
            A confirmation email has been sent to:
          </p>
          <p className="font-semibold text-foreground mb-4">
            your.email@example.com
          </p>
          <p className="text-sm text-muted-foreground">
            Check your email for order details, tracking information, and shipping updates.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              title: 'Free Returns',
              description: '30-day return guarantee',
            },
            {
              title: 'Quality Assured',
              description: '100% authentic products',
            },
            {
              title: 'Customer Support',
              description: 'We\'re here to help',
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-secondary p-4 rounded-sm text-center"
            >
              <h3 className="font-semibold text-foreground mb-1">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="bg-secondary rounded-sm p-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'How long will shipping take?',
                a: 'Most orders arrive within 5-7 business days. You\'ll receive tracking information once your order ships.',
              },
              {
                q: 'Can I modify my order?',
                a: 'Orders cannot be modified after purchase, but you can return items within 30 days for a full refund.',
              },
              {
                q: 'What if something arrives damaged?',
                a: 'Contact our customer support team immediately with photos, and we\'ll arrange a replacement or refund.',
              },
              {
                q: 'How do I track my order?',
                a: 'You\'ll receive a tracking link via email once your order ships. You can also check your account dashboard.',
              },
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need help? Our support team is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@meridian.com" className="text-accent hover:text-accent/90">
              support@meridian.com
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a href="tel:+1-800-123-4567" className="text-accent hover:text-accent/90">
              +1 (800) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

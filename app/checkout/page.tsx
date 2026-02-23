'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ShippingInfo } from '@/types'
import { ChevronRight } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clear } = useCart()

  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  })

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price
    return sum + price * item.quantity
  }, 0)

  const tax = subtotal * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => router.push('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('review')
  }

  const handleCompleteOrder = async () => {
    // Create order
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
    clear()
    router.push(`/order-confirmation?orderId=${orderId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <h1 className="font-serif text-4xl font-bold text-foreground mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              {(['shipping', 'payment', 'review'] as const).map((s, index, arr) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step === s || arr.indexOf(step) > index
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-border text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs ml-2 font-semibold text-foreground capitalize">
                    {s}
                  </span>
                  {index < arr.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-3 ${
                        arr.indexOf(step) > index ? 'bg-accent' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Shipping Form */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={shippingInfo.firstName}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                    }
                    className="px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={shippingInfo.lastName}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                    }
                    className="px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={shippingInfo.email}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  value={shippingInfo.phone}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={shippingInfo.city}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, city: e.target.value })
                    }
                    className="px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    placeholder="State/Province"
                    required
                    value={shippingInfo.state}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, state: e.target.value })
                    }
                    className="px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    required
                    value={shippingInfo.zipCode}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                    }
                    className="px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <select
                    value={shippingInfo.country}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, country: e.target.value })
                    }
                    className="px-4 py-3 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3">
                  Continue to Payment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    { value: 'card', label: 'Credit/Debit Card' },
                    { value: 'paypal', label: 'PayPal' },
                  ].map(option => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border-2 rounded-sm cursor-pointer transition-all"
                      style={{
                        borderColor: paymentMethod === option.value ? 'var(--color-accent)' : 'var(--color-border)',
                        backgroundColor: paymentMethod === option.value ? 'var(--color-secondary)' : 'transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.value}
                        checked={paymentMethod === option.value as any}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="ml-3 font-semibold text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-6">
                    <input
                      type="text"
                      placeholder="Card Number"
                      defaultValue="4242 4242 4242 4242"
                      className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/25"
                        className="px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="123"
                        className="px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('shipping')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Review Order
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            )}

            {/* Review Order */}
            {step === 'review' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Review Your Order
                </h2>

                <div className="bg-secondary p-6 rounded-sm space-y-4">
                  <h3 className="font-semibold text-foreground">Shipping To:</h3>
                  <p className="text-sm text-foreground">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                    <br />
                    {shippingInfo.address}
                    <br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                  </p>
                </div>

                <div className="bg-secondary p-6 rounded-sm space-y-4">
                  <h3 className="font-semibold text-foreground">Items:</h3>
                  <div className="space-y-2 text-sm">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-foreground">
                          {item.product.name} x {item.quantity}
                        </span>
                        <span className="font-semibold text-foreground">
                          ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('payment')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleCompleteOrder}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Complete Purchase
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 rounded-sm sticky top-20 space-y-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Order Summary
              </h2>

              <div className="max-h-96 overflow-y-auto space-y-3 text-sm pb-4 border-b border-border">
                {items.map(item => {
                  const price = item.product.salePrice || item.product.price
                  return (
                    <div key={item.id} className="flex justify-between text-foreground">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>${(price * item.quantity).toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-accent">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-bold text-lg text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

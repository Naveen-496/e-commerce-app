'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()

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
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">
            Shopping Cart
          </h1>

          <div className="flex flex-col items-center justify-center h-96 bg-secondary rounded-sm">
            <p className="text-muted-foreground text-lg mb-6">
              Your cart is empty
            </p>
            <Link href="/products">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const price = item.product.salePrice || item.product.price
              return (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                  {/* Product Image */}
                  <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${item.product.id}`} className="hover:text-accent transition-colors">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {item.product.name}
                        </h3>
                      </Link>
                      <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                        <span>{item.selectedColor.name}</span>
                        <span>•</span>
                        <span>Size {item.selectedSize}</span>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-border rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="font-semibold text-foreground">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 rounded-sm sticky top-20 space-y-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Order Summary
              </h2>

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
                <div className="flex justify-between font-bold text-lg text-foreground mb-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {subtotal <= 100 && (
                  <p className="text-xs text-muted-foreground mb-4 p-2 bg-background rounded">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}

                <Link href="/checkout">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Benefits */}
              <div className="border-t border-border pt-4 text-xs space-y-2 text-muted-foreground">
                <p>✓ Free returns within 30 days</p>
                <p>✓ Secure checkout</p>
                <p>✓ 100% authentic products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

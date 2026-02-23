'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Meridian
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/products?category=shirts" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Shirts
            </Link>
            <Link href="/products?category=pants" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Pants
            </Link>
            <Link href="/products?category=shoes" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Shoes
            </Link>
            <Link href="/products?category=accessories" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Accessories
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-foreground hover:text-accent transition-colors">
              <Search size={20} />
            </button>
            <Link href="/cart" className="relative p-2 text-foreground hover:text-accent transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/products"
              className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/products?category=shirts"
              className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Shirts
            </Link>
            <Link
              href="/products?category=pants"
              className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pants
            </Link>
            <Link
              href="/products?category=shoes"
              className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Shoes
            </Link>
            <Link
              href="/products?category=accessories"
              className="block px-2 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accessories
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

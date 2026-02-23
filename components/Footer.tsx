import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Meridian</h3>
            <p className="text-sm opacity-75">
              Premium men's fashion for the modern gentleman.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="opacity-75 hover:opacity-100 transition-opacity">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=shirts" className="opacity-75 hover:opacity-100 transition-opacity">
                  Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=pants" className="opacity-75 hover:opacity-100 transition-opacity">
                  Pants
                </Link>
              </li>
              <li>
                <Link href="/products?category=shoes" className="opacity-75 hover:opacity-100 transition-opacity">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="opacity-75 hover:opacity-100 transition-opacity">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-primary-foreground border-opacity-20 pt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-75">
              &copy; 2024 Meridian. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                <Facebook size={20} />
              </a>
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                <Instagram size={20} />
              </a>
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

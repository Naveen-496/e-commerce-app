'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { getProductById, products } from '@/lib/products'
import { useCart, useRecentlyViewed } from '@/lib/store'
import { Star, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addItem } = useCart()
  const { add } = useRecentlyViewed()

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product?.colors[0])
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    notFound()
  }

  // Track viewing
  add(product)

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addItem(product, quantity, selectedSize, selectedColor)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  const price = product.salePrice || product.price
  const originalPrice = product.salePrice ? product.price : null
  const discountPercent = originalPrice
    ? Math.round((1 - product.salePrice! / originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} • {product.reviews} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${price}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${originalPrice}
                    </span>
                    <span className="text-sm font-semibold text-accent">
                      {discountPercent}% off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div>
              <span className={`text-sm font-semibold ${
                product.stock > 10
                  ? 'text-green-600'
                  : product.stock > 0
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                {product.stock > 10
                  ? 'In Stock'
                  : product.stock > 0
                  ? `Only ${product.stock} left`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Color: <span className="font-normal">{selectedColor?.name}</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? 'border-foreground ring-2 ring-offset-2 ring-accent'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Size: <span className="font-normal">{selectedSize}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-sm font-semibold rounded-sm border-2 transition-all ${
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-sm hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-sm hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-6 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-semibold"
            >
              {isAdded ? '✓ Added to Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {/* Wishlist and Share */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button className="flex-1 py-3 px-4 border border-border rounded-sm hover:bg-muted transition-colors flex items-center justify-center gap-2 text-foreground">
                <Heart size={20} />
                <span>Save</span>
              </button>
              <button className="flex-1 py-3 px-4 border border-border rounded-sm hover:bg-muted transition-colors flex items-center justify-center gap-2 text-foreground">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-secondary p-4 rounded-sm space-y-2 text-sm">
              <p className="text-foreground">
                ✓ Free shipping on orders over $100
              </p>
              <p className="text-foreground">
                ✓ 30-day returns guarantee
              </p>
              <p className="text-foreground">
                ✓ 100% authentic, premium quality
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

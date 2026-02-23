'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (category) {
      filtered = filtered.filter(p => p.category === category)
    }

    // Filter by price
    filtered = filtered.filter(p => {
      const price = p.salePrice || p.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        filtered.sort((a, b) => b.id.localeCompare(a.id))
    }

    return filtered
  }, [category, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-8">
              {/* Sort */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Sort</h3>
                <div className="space-y-2">
                  {[
                    { value: 'newest', label: 'Newest' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Top Rated' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="space-y-2">
                  {['shirts', 'pants', 'shoes', 'accessories'].map(cat => (
                    <Button
                      key={cat}
                      variant={category === cat ? 'default' : 'outline'}
                      className="w-full justify-start capitalize"
                      asChild
                    >
                      <a href={`/products?category=${cat}`}>
                        {cat}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Try adjusting your filters
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

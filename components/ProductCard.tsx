'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { Star } from 'lucide-react'
import { useRecentlyViewed } from '@/lib/store'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useRecentlyViewed()

  const handleClick = () => {
    add(product)
  }

  return (
    <Link href={`/products/${product.id}`} onClick={handleClick}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-secondary rounded-sm mb-4 aspect-[3/4]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.salePrice && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-sm text-sm font-semibold">
              Sale
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-lg font-semibold text-foreground">
                  ${product.salePrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-foreground">
                ${product.price}
              </span>
            )}
          </div>

          {/* Colors Preview */}
          <div className="flex gap-2 pt-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-5 h-5 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-xs font-bold bg-muted">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

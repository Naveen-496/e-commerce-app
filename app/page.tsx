import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552062407-291827e57371?w=1200&q=80"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Premium Men's Fashion
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Discover curated collections of timeless, quality pieces for the modern gentleman.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Shirts', 'Pants', 'Shoes', 'Accessories'].map((category, index) => (
              <Link
                key={category}
                href={`/products?category=${category.toLowerCase()}`}
                className="group"
              >
                <div className="bg-secondary aspect-square rounded-sm overflow-hidden flex items-center justify-center group-hover:bg-muted transition-colors">
                  <span className="font-serif text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Collection
              </h2>
              <p className="text-muted-foreground">
                Hand-picked styles for every occasion
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our newsletter for new arrivals and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-sm bg-primary-foreground text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

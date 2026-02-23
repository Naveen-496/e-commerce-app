import { Product } from '@/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton Oxford Shirt',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1555062311-98eeb440ef11?w=800&q=80',
      'https://images.unsplash.com/photo-1559589689-cd4628902d4a?w=800&q=80',
    ],
    category: 'shirts',
    description: 'Timeless oxford cloth button-down shirt crafted from premium cotton. Perfect for any occasion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Navy', hex: '#000080' },
    ],
    stock: 45,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Slim Fit Chino Trousers',
    price: 99,
    salePrice: 79,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&q=80',
      'https://images.unsplash.com/photo-1473002839889-490d28b9f58a?w=800&q=80',
      'https://images.unsplash.com/photo-1542621334-c45f4db2fb96?w=800&q=80',
    ],
    category: 'pants',
    description: 'Modern slim fit chinos with a tailored silhouette. Versatile and comfortable for all-day wear.',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: [
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Charcoal', hex: '#36454F' },
    ],
    stock: 38,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Premium Leather Chelsea Boots',
    price: 249,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Handcrafted leather Chelsea boots with elastic goring. A timeless staple for any wardrobe.',
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    stock: 25,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Merino Wool Crew Neck Sweater',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1536521651157-d282f0a9ae4e?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    ],
    category: 'shirts',
    description: 'Ultra-soft merino wool sweater. Temperature regulating and naturally antimicrobial.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Heather Grey', hex: '#A0A0A0' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Cream', hex: '#F5F5DC' },
    ],
    stock: 42,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: '5',
    name: 'Classic Leather Belt',
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    ],
    category: 'accessories',
    description: 'Italian leather belt with solid brass buckle. Built to last a lifetime.',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Cognac', hex: '#D4724A' },
    ],
    stock: 60,
    rating: 4.8,
    reviews: 201,
  },
  {
    id: '6',
    name: 'White Premium Sneakers',
    price: 159,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Clean minimal sneaker. Versatile enough for casual or smart-casual settings.',
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Off White', hex: '#F5F5F5' },
    ],
    stock: 55,
    rating: 4.5,
    reviews: 112,
  },
  {
    id: '7',
    name: 'Relaxed Fit Denim Jeans',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&q=80',
    ],
    category: 'pants',
    description: 'Heritage denim with a comfortable relaxed fit. Raw indigo selvedge fabric.',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: [
      { name: 'Indigo', hex: '#4B0082' },
      { name: 'Black', hex: '#000000' },
    ],
    stock: 50,
    rating: 4.7,
    reviews: 145,
  },
  {
    id: '8',
    name: 'Silk Pocket Square',
    price: 45,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    ],
    category: 'accessories',
    description: 'Premium Italian silk pocket square. Add sophistication to any blazer.',
    sizes: ['One Size'],
    colors: [
      { name: 'Navy', hex: '#000080' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Cream', hex: '#F5F5DC' },
    ],
    stock: 75,
    rating: 4.6,
    reviews: 67,
  },
]

export function getProductById(id: string) {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string) {
  return products.filter(p => p.category === category)
}

export function getCategories() {
  return ['shirts', 'pants', 'shoes', 'accessories']
}

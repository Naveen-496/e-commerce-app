export interface Color {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  price: number
  salePrice?: number
  images: string[]
  category: 'shirts' | 'pants' | 'shoes' | 'accessories'
  description: string
  sizes: string[]
  colors: Color[]
  stock: number
  rating: number
  reviews: number
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: Color
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  shippingInfo: ShippingInfo
  createdAt: Date
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  unit: string
  weight?: string
  image: string
  images?: string[]
  category: string
  categorySlug: string
  department: string
  departmentSlug: string
  isOffer: boolean
  discountPercent?: number
  isBestSeller: boolean
  isFeatured: boolean
  stock: number
  brand?: string
  tags: string[]
}

export interface Category {
  id: string
  slug: string
  name: string
  icon: string
  image?: string
  departmentSlug: string
}

export interface Department {
  id: string
  slug: string
  name: string
  icon: string
  categories: Category[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  discount: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  cpf?: string
  addresses: Address[]
}

export interface Address {
  id: string
  label: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  items: CartItem[]
  total: number
  address: Address
  paymentMethod: string
  deliveryDate?: string
  deliveryTime?: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'delivering'
  | 'delivered'
  | 'cancelled'

export interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link: string
  bgColor: string
}

export interface FilterState {
  search: string
  categorySlug: string
  departmentSlug: string
  onlyOffers: boolean
  sortBy: SortOption
  minPrice?: number
  maxPrice?: number
}

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'discount'

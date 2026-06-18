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

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  phone: string
  cpf?: string
  createdAt: string
}

export interface Address {
  id: string
  userId: string
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

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  price: number
  unit: string
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  discount: number
  deliveryFee: number
  total: number
  status: OrderStatus
  paymentMethod: string
  deliveryDate: string
  deliveryTime: string
  address: Address
  createdAt: string
  updatedAt: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'delivering'
  | 'delivered'
  | 'cancelled'

export interface JwtPayload {
  userId: string
  email: string
}

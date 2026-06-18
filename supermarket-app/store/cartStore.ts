'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

const MAX_QTY_PER_ITEM = 99
const MAX_CART_ITEMS   = 50

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getDiscount: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const { items } = get()
        const existing = items.find(i => i.product.id === product.id)
        if (existing) {
          if (existing.quantity >= MAX_QTY_PER_ITEM) return
          set({
            items: items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          if (items.length >= MAX_CART_ITEMS) return
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },

      removeItem: (productId) =>
        set(s => ({ items: s.items.filter(i => i.product.id !== productId) })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        const safeQty = Math.min(quantity, MAX_QTY_PER_ITEM)
        set(s => ({
          items: s.items.map(i =>
            i.product.id === productId ? { ...i, quantity: safeQty } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        )
      },

      getDiscount: () => {
        return get().items.reduce((sum, i) => {
          if (i.product.originalPrice) {
            return sum + (i.product.originalPrice - i.product.price) * i.quantity
          }
          return sum
        }, 0)
      },

      getTotal: () => get().getSubtotal(),

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)

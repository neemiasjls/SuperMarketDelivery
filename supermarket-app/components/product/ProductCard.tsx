'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, Check } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore()
  const addToast = useToastStore(s => s.addToast)
  const [imgError, setImgError] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const cartItem = items.find(i => i.product.id === product.id)
  const qty = cartItem?.quantity ?? 0

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    // Brief visual feedback on the button
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 900)
    // Toast notification
    const label = product.name.length > 32
      ? product.name.slice(0, 32) + '…'
      : product.name
    addToast(`${label} adicionado!`)
  }
  function handleIncrease(e: React.MouseEvent) {
    e.preventDefault()
    updateQuantity(product.id, qty + 1)
  }
  function handleDecrease(e: React.MouseEvent) {
    e.preventDefault()
    updateQuantity(product.id, qty - 1)
  }

  return (
    <Link href={`/produto/${product.slug}`} className="group block h-full">
      <div className="bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col">

        {/* Imagem */}
        <div className="relative">
          {/* Badge Oferta — só quando tem desconto */}
          {product.isOffer && (
            <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
              Oferta
            </span>
          )}

          <div className={`relative w-full bg-gray-50 ${compact ? 'h-36' : 'h-48'}`}>
            <Image
              src={imgError ? '/placeholder-product.svg' : product.image}
              alt={product.name}
              fill
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1">
          <p className="text-[11px] text-gray-400 mb-0.5">{product.brand}</p>
          <p className={`text-gray-800 font-medium leading-snug flex-1 ${compact ? 'text-xs' : 'text-sm'}`}>
            {product.name}
          </p>

          <div className="mt-2">
            {/* Preço original riscado + % OFF */}
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-[11px] font-bold text-red-600">
                  {product.discountPercent}% OFF
                </span>
              </div>
            )}

            {/* Preço + botão */}
            <div className="flex items-end justify-between gap-1">
              <div className="leading-none">
                <span className={`font-extrabold text-gray-900 ${compact ? 'text-base' : 'text-lg'}`}>
                  {formatCurrency(product.price)}
                </span>
                <span className="text-[11px] text-gray-400 ml-0.5">/{product.unit}</span>
              </div>

              {qty === 0 ? (
                <button
                  onClick={handleAdd}
                  className={`w-8 h-8 flex-shrink-0 rounded-full text-white flex items-center justify-center transition-all duration-200 shadow-sm ${
                    justAdded
                      ? 'bg-green-500 scale-110'
                      : 'bg-[#1565C0] hover:bg-[#0d47a1] hover:scale-110'
                  }`}
                  aria-label="Adicionar ao carrinho"
                >
                  {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              ) : (
                <div className="flex items-center gap-0.5 bg-[#1565C0] rounded-full px-1 py-0.5 flex-shrink-0">
                  <button
                    onClick={handleDecrease}
                    className="w-6 h-6 rounded-full text-white flex items-center justify-center hover:bg-[#0d47a1] transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-white text-xs font-bold min-w-[1.25rem] text-center">{qty}</span>
                  <button
                    onClick={handleIncrease}
                    className="w-6 h-6 rounded-full text-white flex items-center justify-center hover:bg-[#0d47a1] transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </Link>
  )
}

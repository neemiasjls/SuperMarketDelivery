'use client'
import { X, Minus, Plus, ShoppingBag, Trash2, CheckCircle, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { useEffect } from 'react'

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, getDiscount, getTotal } = useCartStore()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const subtotal = getSubtotal()
  const discount = getDiscount()
  const total = getTotal()
  const shipping = total >= 150 ? 0 : 9.90
  const freeShippingRemaining = Math.max(0, 150 - total)

  return (
    <>
      {/* Overlay — fades in/out */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      {/* Sidebar — slides in/out */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-[#1565C0]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white" />
            <h2 className="font-bold text-white">Meu Carrinho</h2>
            {items.length > 0 && (
              <span className="bg-white text-[#1565C0] text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={closeCart}
            className="w-8 h-8 rounded-full hover:bg-blue-700 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <ShoppingBag className="w-16 h-16 text-gray-200" />
            <p className="text-gray-500 text-center">Seu carrinho está vazio.<br />Adicione produtos para continuar.</p>
            <button onClick={closeCart}
              className="bg-[#1565C0] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#0d47a1] transition-colors">
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            {/* Progresso frete grátis */}
            {freeShippingRemaining > 0 ? (
              <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100">
                <p className="text-xs text-blue-800">
                  Falta <strong>{formatCurrency(freeShippingRemaining)}</strong> para frete grátis!
                </p>
                <div className="mt-1.5 w-full bg-blue-200 rounded-full h-1.5">
                  <div className="bg-[#1565C0] h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (total / 150) * 100)}%` }} />
                </div>
              </div>
            ) : (
              <div className="px-4 py-2.5 bg-green-50 border-b border-green-100">
                <p className="flex items-center gap-1.5 text-xs text-green-800 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" /> Você ganhou frete grátis!
                </p>
              </div>
            )}

            {/* Itens */}
            <div className="flex-1 overflow-y-auto py-2">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-tight line-clamp-2">{product.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatCurrency(product.price)}/{product.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-gray-200 rounded-full">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-[#1565C0] hover:bg-blue-50 rounded-full transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold text-gray-700 min-w-[1.25rem] text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-[#1565C0] hover:bg-blue-50 rounded-full transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-gray-800">{formatCurrency(product.price * quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(product.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all self-start mt-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="border-t border-gray-100 p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span><span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Entrega</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span><span>{formatCurrency(total + shipping)}</span>
              </div>

              <Link href="/checkout" onClick={closeCart}
                className="block w-full bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold text-center py-3.5 rounded-full transition-colors mt-2 text-sm shadow-md">
                Finalizar Compra
              </Link>
              <a href="#"
                onClick={closeCart}
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold text-center py-3 rounded-full transition-colors text-sm">
                <MessageCircle className="w-4 h-4" /> Pedir pelo WhatsApp
              </a>
              <button onClick={closeCart}
                className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors py-1">
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

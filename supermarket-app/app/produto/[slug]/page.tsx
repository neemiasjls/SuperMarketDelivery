'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingCart, Star, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react'
import { getProductBySlug, products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/product/ProductCard'
import { useState } from 'react'

interface Props {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const { items, addItem, updateQuantity } = useCartStore()
  const addToast = useToastStore(s => s.addToast)
  const cartItem = items.find(i => i.product.id === product.id)
  const qty = cartItem?.quantity ?? 0
  const [selectedImg, setSelectedImg] = useState(0)
  const [activeTab, setActiveTab] = useState<'descricao' | 'nutricional'>('descricao')

  function handleAdd() {
    // product is guaranteed non-null here (notFound() called above if falsy)
    addItem(product!)
    const name = product!.name
    addToast(`${name.length > 32 ? name.slice(0, 32) + '…' : name} adicionado!`)
  }

  const images = product.images?.length ? product.images : [product.image, product.image, product.image]

  const related = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#1565C0]">Início</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/departamentos/${product.departmentSlug}`} className="hover:text-[#1565C0]">{product.department}</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/departamentos/${product.departmentSlug}/${product.categorySlug}`} className="hover:text-[#1565C0]">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 truncate max-w-48">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 shadow-sm">
        {/* Imagens */}
        <div>
          <div className="relative w-full h-72 md:h-96 bg-gray-50 rounded-xl overflow-hidden mb-3">
            {product.isOffer && (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="offer" className="text-sm px-3 py-1">{product.discountPercent}% OFF</Badge>
              </div>
            )}
            <Image
              src={images[selectedImg]}
              alt={product.name}
              fill
              className="object-contain p-6"
              priority
            />
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${selectedImg === i ? 'border-[#1565C0]' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="relative w-full h-full bg-gray-50">
                  <Image src={img} alt="" fill className="object-contain p-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.brand && (
            <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
          )}
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">(127 avaliações)</span>
          </div>

          {/* Preço */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            {product.originalPrice && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                  {product.discountPercent}% OFF
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-gray-900">{formatCurrency(product.price)}</span>
              <span className="text-gray-500 text-sm">/{product.unit}</span>
            </div>
            {product.originalPrice && (
              <p className="text-xs text-[#1565C0] font-semibold mt-1">
                Economia de {formatCurrency(product.originalPrice - product.price)}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              ou 3x de {formatCurrency(product.price / 3)} sem juros no cartão
            </p>
          </div>

          {/* Quantidade e carrinho */}
          <div className="flex items-center gap-3 mb-5">
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold py-3.5 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao carrinho
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-[#1565C0] rounded-full">
                  <button
                    onClick={() => updateQuantity(product.id, qty - 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#1565C0] hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-800">{qty}</span>
                  <button
                    onClick={() => updateQuantity(product.id, qty + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#1565C0] hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-lg font-bold text-gray-800">{formatCurrency(product.price * qty)}</span>
              </div>
            )}
          </div>

          {/* Estoque */}
          <p className={`flex items-center gap-1.5 text-sm mb-4 ${product.stock > 10 ? 'text-[#1565C0]' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.stock > 10 ? 'bg-[#1565C0]' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
            {product.stock > 10 ? 'Em estoque' : product.stock > 0 ? `Apenas ${product.stock} restantes` : 'Sem estoque'}
          </p>

          {/* Info entrega */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            {[
              { icon: <Truck className="w-4 h-4 text-[#1565C0]" />, text: 'Entrega em 2-4 horas ou agende' },
              { icon: <Shield className="w-4 h-4 text-[#1565C0]" />, text: 'Compra 100% segura e protegida' },
              { icon: <RotateCcw className="w-4 h-4 text-[#1565C0]" />, text: 'Troca garantida em caso de avaria' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs descrição / nutricional */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-4">
        <div className="flex gap-6 border-b border-gray-200 mb-5">
          {(['descricao', 'nutricional'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#1565C0] text-[#1565C0]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'descricao' ? 'Descrição' : 'Info Nutricional'}
            </button>
          ))}
        </div>
        {activeTab === 'descricao' ? (
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="text-base">{product.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                { label: 'Categoria', value: product.category },
                { label: 'Departamento', value: product.department },
                { label: 'Marca', value: product.brand ?? 'Sem marca' },
                { label: 'Peso/Volume', value: product.weight ?? product.unit },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-6">
            <p>Informações nutricionais disponíveis na embalagem do produto.</p>
          </div>
        )}
      </div>

      {/* Produtos relacionados */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Produtos relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {related.map(p => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

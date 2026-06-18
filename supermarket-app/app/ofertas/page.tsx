import { getOffers } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Tag } from 'lucide-react'

export default function OfertasPage() {
  const offers = getOffers()

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Tag className="w-8 h-8" />
          <h1 className="text-3xl font-extrabold">Ofertas da Semana</h1>
        </div>
        <p className="text-white/80 text-lg">Aproveite os melhores descontos selecionados para você!</p>
        <p className="text-white/60 text-sm mt-1">{offers.length} produtos em oferta</p>
      </div>

      {/* Grid de ofertas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {offers.map(product => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </div>
  )
}

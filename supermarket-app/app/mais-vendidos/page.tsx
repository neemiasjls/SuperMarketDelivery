import { getBestSellers } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { TrendingUp } from 'lucide-react'

export default function MaisVendidosPage() {
  const bestSellers = getBestSellers()

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#0d47a1] rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8" />
          <h1 className="text-3xl font-extrabold">Mais Vendidos</h1>
        </div>
        <p className="text-white/80 text-lg">Os produtos favoritos dos nossos clientes</p>
        <p className="text-white/60 text-sm mt-1">{bestSellers.length} produtos</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {bestSellers.map(product => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </div>
  )
}

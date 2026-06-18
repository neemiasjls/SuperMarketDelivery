'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { departments } from '@/data/departments'
import { getProductsByCategory } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { DepartmentIcon } from '@/components/icons/DepartmentIcon'

interface Props {
  params: Promise<{ slug: string; category: string }>
}

export default function CategoryPage({ params }: Props) {
  const { slug, category } = use(params)
  const dept = departments.find(d => d.slug === slug)
  if (!dept) notFound()

  const cat = dept.categories.find(c => c.slug === category)
  if (!cat) notFound()

  const catProducts = getProductsByCategory(category)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-[#1565C0]">Início</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/departamentos/${slug}`} className="hover:text-[#1565C0]">{dept.name}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">{cat.name}</span>
      </nav>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-[#1565C0] flex-shrink-0">
          <DepartmentIcon slug={dept.slug} className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{cat.name}</h1>
          <p className="text-sm text-gray-500">{catProducts.length} produtos disponíveis</p>
        </div>
      </div>

      {catProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[#1565C0] mb-4">
            <DepartmentIcon slug={dept.slug} className="w-8 h-8" />
          </div>
          <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          <Link href={`/departamentos/${slug}`} className="mt-4 inline-block text-[#1565C0] hover:underline text-sm">
            Ver todos de {dept.name}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {catProducts.map(product => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      )}
    </div>
  )
}

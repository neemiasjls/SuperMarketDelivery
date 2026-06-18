'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { departments } from '@/data/departments'
import { getProductsByDepartment } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { DepartmentIcon } from '@/components/icons/DepartmentIcon'

interface Props {
  params: Promise<{ slug: string }>
}

export default function DepartmentPage({ params }: Props) {
  const { slug } = use(params)
  const dept = departments.find(d => d.slug === slug)
  if (!dept) notFound()

  const deptProducts = getProductsByDepartment(slug)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-[#1565C0]">Início</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">{dept.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-[#1565C0] flex-shrink-0">
          <DepartmentIcon slug={dept.slug} className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{dept.name}</h1>
          <p className="text-sm text-gray-500">{deptProducts.length} produtos disponíveis</p>
        </div>
      </div>

      {/* Categorias */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={`/departamentos/${slug}`}
          className="bg-[#1565C0] text-white text-sm px-4 py-2 rounded-full font-medium"
        >
          Todos
        </Link>
        {dept.categories.map(cat => (
          <Link
            key={cat.id}
            href={`/departamentos/${slug}/${cat.slug}`}
            className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full font-medium hover:border-[#1565C0]/40 hover:text-[#1565C0] transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Produtos */}
      {deptProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[#1565C0] mb-4">
            <DepartmentIcon slug={dept.slug} className="w-8 h-8" />
          </div>
          <p className="text-gray-500">Nenhum produto encontrado neste departamento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {deptProducts.map(product => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      )}
    </div>
  )
}

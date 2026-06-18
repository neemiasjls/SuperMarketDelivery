'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react'
import { departments } from '@/data/departments'

function ProductsContent() {
  const searchParams = useSearchParams()
  const busca = searchParams.get('busca') ?? ''
  const deptParam = searchParams.get('departamento') ?? ''

  const [search, setSearch] = useState(busca)
  const [selectedDept, setSelectedDept] = useState(deptParam)
  const [onlyOffers, setOnlyOffers] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }
    if (selectedDept) list = list.filter(p => p.departmentSlug === selectedDept)
    if (onlyOffers) list = list.filter(p => p.isOffer)
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'discount') list.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0))
    return list
  }, [search, selectedDept, onlyOffers, sortBy])

  function clearFilters() {
    setSearch('')
    setSelectedDept('')
    setOnlyOffers(false)
    setSortBy('relevance')
  }

  const hasFilters = search || selectedDept || onlyOffers || sortBy !== 'relevance'

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filtros Sidebar */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-36">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Filtros</h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                  <X className="w-3 h-3" /> Limpar
                </button>
              )}
            </div>

            {/* Departamento */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">Departamento</p>
              <div className="space-y-1 max-h-56 overflow-y-auto">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-[#1565C0]">
                  <input
                    type="radio"
                    name="dept"
                    checked={selectedDept === ''}
                    onChange={() => setSelectedDept('')}
                    className="accent-blue-600"
                  />
                  Todos
                </label>
                {departments.map(d => (
                  <label key={d.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-[#1565C0]">
                    <input
                      type="radio"
                      name="dept"
                      checked={selectedDept === d.slug}
                      onChange={() => setSelectedDept(d.slug)}
                      className="accent-blue-600"
                    />
                    {d.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Só ofertas */}
            <div className="mb-5 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={onlyOffers}
                  onChange={e => setOnlyOffers(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                Somente ofertas
              </label>
            </div>

            {/* Ordenação */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-2">Ordenar por</p>
              <div className="space-y-1">
                {[
                  { value: 'relevance', label: 'Relevância' },
                  { value: 'price-asc', label: 'Menor preço' },
                  { value: 'price-desc', label: 'Maior preço' },
                  { value: 'name-asc', label: 'A-Z' },
                  { value: 'discount', label: 'Maior desconto' },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-[#1565C0]">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === opt.value}
                      onChange={() => setSortBy(opt.value)}
                      className="accent-blue-600"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Conteúdo */}
        <div className="flex-1">
          {/* Barra de busca e toggle filtros mobile */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen(v => !v)}
              className="md:hidden flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-600 hover:border-blue-400"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
            <div className="hidden md:flex items-center gap-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] bg-white"
              >
                <option value="relevance">Relevância</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="name-asc">A-Z</option>
                <option value="discount">Maior desconto</option>
              </select>
            </div>
          </div>

          {/* Contagem e chips */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              <strong className="text-gray-800">{filtered.length}</strong> produtos encontrados
              {search && <span> para <strong>&quot;{search}&quot;</strong></span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedDept && (
                <button
                  onClick={() => setSelectedDept('')}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full hover:bg-blue-200"
                >
                  {departments.find(d => d.slug === selectedDept)?.name}
                  <X className="w-3 h-3" />
                </button>
              )}
              {onlyOffers && (
                <button
                  onClick={() => setOnlyOffers(false)}
                  className="flex items-center gap-1 bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full hover:bg-red-200"
                >
                  Só ofertas <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
              <button onClick={clearFilters} className="mt-4 text-[#1565C0] hover:underline text-sm">
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProdutosPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  )
}

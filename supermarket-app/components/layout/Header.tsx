'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Search, ShoppingCart, User, X, LogOut, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { searchProducts } from '@/data/products'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const { getItemCount, getTotal, toggleCart } = useCartStore()
  const { user, openLogin, openRegister, logout } = useAuthStore()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  // Evita erro de hidratação: dados de carrinho/usuário vêm do localStorage
  // (Zustand persist), que só existe no cliente. Antes de montar, renderizamos
  // o estado neutro (igual ao servidor) e só depois mostramos o valor real.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (query.trim().length >= 2) {
      setResults(searchProducts(query).slice(0, 6))
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }, [query])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      setShowResults(false)
      router.push(`/produtos?busca=${encodeURIComponent(query.trim())}`)
    }
  }

  const itemCount = mounted ? getItemCount() : 0
  const total = mounted ? getTotal() : 0

  return (
    <header className="bg-[#1565C0] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-1.5 shadow-sm">
            <span className="text-[#1565C0] font-black text-xl leading-none tracking-tight">SUPER</span>
            <span className="w-px h-6 bg-gray-200" />
            <span className="text-[#d32f2f] font-black text-xl leading-none tracking-tight">MERCADO</span>
          </div>
        </Link>

        {/* Busca */}
        <div ref={searchRef} className="flex-1 relative">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="O que você precisa?"
                className="w-full pl-9 pr-10 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white border-0 shadow-sm"
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); setShowResults(false) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Dropdown busca */}
          {showResults && results.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
              {results.map(p => (
                <button key={p.id}
                  onClick={() => { setShowResults(false); setQuery(''); router.push(`/produto/${p.slug}`) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-left">
                  <div className="w-10 h-10 relative flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 truncate font-medium">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                  <span className="text-sm font-bold text-[#1565C0] flex-shrink-0">{formatCurrency(p.price)}</span>
                </button>
              ))}
              <button onClick={handleSearch as unknown as React.MouseEventHandler}
                className="w-full text-center text-sm text-[#1565C0] font-semibold py-3 hover:bg-blue-50 border-t border-gray-100">
                Ver todos os resultados para &ldquo;{query}&rdquo;
              </button>
            </div>
          )}
          {showResults && results.length === 0 && query.length >= 2 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mb-2">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-500">Nenhum produto encontrado para &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Usuário */}
        <div ref={userMenuRef} className="relative flex-shrink-0">
          {mounted && user ? (
            <>
              <button onClick={() => setShowUserMenu(v => !v)}
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center font-black text-base">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="hidden lg:block text-sm font-medium max-w-24 truncate">
                  {user.name.split(' ')[0]}
                </span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link href="/minha-conta" onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1565C0] transition-colors">
                    <User className="w-4 h-4" /> Minha Conta
                  </Link>
                  <Link href="/meus-pedidos" onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1565C0] transition-colors">
                    <Package className="w-4 h-4" /> Meus Pedidos
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button onClick={logout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Sair
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-end text-xs leading-tight">
              <button onClick={openLogin} className="text-blue-100 hover:text-white font-medium transition-colors">
                Olá, faça seu login
              </button>
              <button onClick={openRegister} className="text-white hover:text-blue-100 font-bold underline transition-colors">
                ou cadastre-se
              </button>
            </div>
          )}
        </div>

        {/* Carrinho */}
        <button onClick={toggleCart}
          className="relative flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white px-4 py-2.5 rounded-full transition-all flex-shrink-0 shadow-md hover:shadow-lg font-semibold text-sm">
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:block">Carrinho</span>
          {itemCount > 0 && (
            <>
              <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 bg-white text-[#d32f2f] border border-red-100 rounded-full text-xs font-black flex items-center justify-center px-1 shadow-sm">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
              <span className="hidden md:block font-bold">{formatCurrency(total)}</span>
            </>
          )}
        </button>

      </div>
    </header>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Tag, ChevronRight, Clock } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface PromoItem {
  name: string
  price: number
  unit: string
  originalPrice?: number
}

interface PromoCard {
  id: string
  label: string
  tag: string
  href: string
  itens: PromoItem[]
  validade: string
}

const promoCards: PromoCard[] = [
  {
    id: '1',
    label: 'Semana',
    tag: 'OFERTAS DA SEMANA',
    href: '/ofertas',
    validade: 'Válido enquanto durar o estoque',
    itens: [
      { name: 'Arroz Tipo 1 Pateko 5kg',    price: 14.95, unit: 'pct', originalPrice: 18.90 },
      { name: 'Feijão Carioca Cocineiro',    price: 8.49,  unit: 'pct', originalPrice: 10.99 },
      { name: 'Óleo de Soja Leve 900ml',     price: 6.79,  unit: 'un',  originalPrice: 8.49  },
      { name: 'Café Pó União 500g',          price: 24.89, unit: 'un',  originalPrice: 28.90 },
      { name: 'Leite Integral TP 1L',        price: 4.89,  unit: 'un',  originalPrice: 5.89  },
      { name: 'Farinha de Trigo Globo 1kg',  price: 3.99,  unit: 'un'  },
    ],
  },
  {
    id: '2',
    label: 'Açougue',
    tag: 'OFERTAS DO AÇOUGUE',
    href: '/departamentos/acougue',
    validade: 'Qualidade garantida · Quantidades limitadas',
    itens: [
      { name: 'Costela Bovina',     price: 24.90, unit: 'kg' },
      { name: 'Bisteca de Segunda', price: 25.90, unit: 'kg' },
      { name: 'Músculo Bovino',     price: 31.90, unit: 'kg' },
      { name: 'Bisteca Suína',      price: 15.90, unit: 'kg' },
      { name: 'Linguiça da Casa',   price: 17.90, unit: 'kg' },
      { name: 'Coxinha da Asa',     price: 14.90, unit: 'kg' },
    ],
  },
  {
    id: '3',
    label: 'Hortifruti',
    tag: 'HORTIFRUTI',
    href: '/departamentos/hortifruti',
    validade: 'O melhor do campo para sua casa',
    itens: [
      { name: 'Banana Nanica',    price: 4.19, unit: 'kg' },
      { name: 'Maçã Gala Extra',  price: 6.99, unit: 'kg' },
      { name: 'Melância Pedaço',  price: 2.39, unit: 'kg' },
      { name: 'Mandioca 1kg',     price: 6.49, unit: 'kg' },
      { name: 'Abóbora Cabotia',  price: 3.39, unit: 'kg' },
      { name: 'Cebola Extra',     price: 4.99, unit: 'kg' },
    ],
  },
  {
    id: '4',
    label: 'Fim de Semana',
    tag: 'FIM DE SEMANA',
    href: '/ofertas',
    validade: 'Somente sexta, sábado e domingo',
    itens: [
      { name: 'Cerveja Skol Lata 350ml',       price: 3.99,  unit: 'un', originalPrice: 4.99  },
      { name: 'Refrigerante Turaíba 2L',        price: 3.99,  unit: 'un' },
      { name: 'Sabão Pó Brilhante 1kg',         price: 8.99,  unit: 'un', originalPrice: 10.99 },
      { name: 'Requeijão Líder 1,5kg',          price: 13.98, unit: 'un' },
      { name: 'Leite TP Itambé 1L',             price: 4.35,  unit: 'un' },
      { name: 'Achocolatado Chocolatto',         price: 7.89,  unit: 'un' },
    ],
  },
]

export function PromocoesDodia() {
  const [tab, setTab] = useState('1')
  const active = promoCards.find(c => c.id === tab)!

  return (
    <section className="py-2">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#1565C0] rounded-full" />
          <h2 className="text-base font-semibold text-slate-700 tracking-tight">Promoções do Dia</h2>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3" /> AO VIVO
          </span>
        </div>
        <Link href="/ofertas" className="text-xs text-[#1565C0] hover:underline flex items-center gap-0.5">
          Ver todas <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {promoCards.map(card => (
          <button
            key={card.id}
            onClick={() => setTab(card.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              tab === card.id
                ? 'bg-[#1565C0] text-white shadow-sm'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-[#1565C0]/40 hover:text-[#1565C0]'
            }`}
          >
            <Tag className="w-3 h-3" />
            {card.label}
          </button>
        ))}
      </div>

      {/* Card de promoção */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        {/* Header do card */}
        <div className="bg-[#1565C0] px-5 py-3 flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-widest">{active.tag}</p>
            <p className="text-white font-bold text-sm mt-0.5">Supermercado — Vila Aurora/SP</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-blue-200 text-[10px]">(00) 00000-0000</p>
            <p className="text-white text-[10px] font-medium">(00) 0000-0000</p>
          </div>
        </div>

        {/* Grid de produtos */}
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {active.itens.map((item, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
              <p className="text-[11px] text-slate-600 font-medium leading-tight mb-2 min-h-[2.5rem] flex items-center justify-center">
                {item.name}
              </p>
              {item.originalPrice && (
                <p className="text-[10px] text-slate-400 line-through mb-0.5">
                  {formatCurrency(item.originalPrice)}
                </p>
              )}
              <p className="text-[#1565C0] font-extrabold text-lg leading-none">
                {formatCurrency(item.price)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">/{item.unit}</p>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">{active.validade}</p>
          <Link href={active.href}
            className="text-xs font-semibold text-[#1565C0] hover:underline">
            Ver mais →
          </Link>
        </div>
      </div>

      {/* Atalhos rápidos */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {[
          { label: 'WhatsApp',    sub: '(00) 00000-0000', href: '#', external: true  },
          { label: 'Instagram',   sub: '@supermercado', href: '#', external: true },
          { label: 'Nossa Loja',  sub: 'Av. das Palmeiras, 1200', href: '/sobre', external: false },
          { label: 'Horário',     sub: 'Seg-Sáb 7h–20h', href: '/sobre', external: false },
        ].map((item, i) => (
          item.external ? (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
              className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:border-[#1565C0]/30 hover:bg-blue-50/40 transition-all group">
              <p className="text-xs font-semibold text-slate-600 group-hover:text-[#1565C0] transition-colors">{item.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">{item.sub}</p>
            </a>
          ) : (
            <Link key={i} href={item.href}
              className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:border-[#1565C0]/30 hover:bg-blue-50/40 transition-all group">
              <p className="text-xs font-semibold text-slate-600 group-hover:text-[#1565C0] transition-colors">{item.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{item.sub}</p>
            </Link>
          )
        ))}
      </div>
    </section>
  )
}

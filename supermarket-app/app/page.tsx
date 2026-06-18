import { BannerCarousel } from '@/components/home/BannerCarousel'
import { DepartmentGrid } from '@/components/home/DepartmentGrid'
import { ProductSection } from '@/components/home/ProductSection'
import { PromocoesDodia } from '@/components/home/PromocoesDodia'
import { banners } from '@/data/banners'
import { departments } from '@/data/departments'
import {
  getFeaturedProducts,
  getBestSellers,
  getOffers,
  getProductsByDepartment,
} from '@/data/products'
import Link from 'next/link'

export default function HomePage() {
  const featured   = getFeaturedProducts()
  const bestSellers = getBestSellers()
  const offers     = getOffers()
  const hortifruti = getProductsByDepartment('hortifruti')
  const acougue    = getProductsByDepartment('acougue')
  const bebidas    = getProductsByDepartment('bebidas')
  const mercearia  = getProductsByDepartment('mercearia')

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">

      {/* Banner principal */}
      <BannerCarousel banners={banners} />

      {/* Departamentos */}
      <DepartmentGrid departments={departments} />

      {/* ───── PROMOÇÕES DO DIA ───── */}
      <PromocoesDodia />

      {/* Destaques */}
      <ProductSection
        title="Destaques"
        products={featured}
        viewAllHref="/produtos"
        viewAllCount={featured.length}
      />

      {/* Mais Vendidos */}
      <ProductSection
        title="Mais Vendidos"
        products={bestSellers}
        viewAllHref="/mais-vendidos"
        viewAllCount={bestSellers.length}
      />

      {/* Ofertas */}
      <ProductSection
        title="Ofertas da Semana"
        products={offers}
        viewAllHref="/ofertas"
        viewAllCount={offers.length}
      />

      {/* Divisor de departamentos */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { href: '/departamentos/hortifruti', label: 'Hortifruti', sub: 'Fresquinho todo dia' },
          { href: '/departamentos/acougue',    label: 'Açougue',    sub: 'Carnes selecionadas' },
          { href: '/departamentos/bebidas',    label: 'Bebidas',    sub: 'Geladas e refrescantes' },
        ].map(item => (
          <Link key={item.href} href={item.href}
            className="bg-white border border-slate-100 hover:border-[#1565C0]/30 hover:bg-blue-50/40 rounded-xl px-4 py-3 transition-all group">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-[#1565C0] transition-colors">{item.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
          </Link>
        ))}
      </div>

      {/* Açougue */}
      <ProductSection
        title="Açougue"
        products={acougue}
        viewAllHref="/departamentos/acougue"
        viewAllCount={acougue.length}
      />

      {/* Hortifruti */}
      <ProductSection
        title="Hortifruti"
        products={hortifruti}
        viewAllHref="/departamentos/hortifruti"
        viewAllCount={hortifruti.length}
      />

      {/* Bebidas */}
      <ProductSection
        title="Bebidas"
        products={bebidas}
        viewAllHref="/departamentos/bebidas"
        viewAllCount={bebidas.length}
      />

      {/* Mercearia */}
      <ProductSection
        title="Mercearia"
        products={mercearia}
        viewAllHref="/departamentos/mercearia"
        viewAllCount={mercearia.length}
      />

      {/* Sobre o Supermercado */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 border border-gray-200 font-black text-base px-3 py-1.5 rounded-lg">
                <span className="text-[#1565C0]">SUPER</span>
                <span className="w-px h-5 bg-gray-200" />
                <span className="text-[#d32f2f]">MERCADO</span>
              </div>
              <span className="text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1">Desde 1995</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
              Servindo bem, para servir sempre.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Há mais de 25 anos o nosso Supermercado é referência em Vila Aurora/SP.
              Comprometidos em oferecer os melhores produtos com preços justos e atendimento de qualidade.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { label: 'Av. das Palmeiras, 1200 — Vila Aurora/SP' },
                { label: '(00) 0000-0000' },
                { label: '(00) 00000-0000 — WhatsApp' },
                { label: 'Seg-Sáb: 7h às 20h' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-500">
                  <span className="w-1 h-1 rounded-full bg-[#1565C0] mt-1.5 flex-shrink-0" />
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { num: '25+', label: 'Anos de história' },
              { num: '5.000+', label: 'Produtos disponíveis' },
              { num: '100%', label: 'Comprometimento' },
              { num: '4.8★', label: 'Avaliação no Google' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-extrabold text-[#1565C0]">{stat.num}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

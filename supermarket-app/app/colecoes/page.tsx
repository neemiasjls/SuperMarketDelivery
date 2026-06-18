import Link from 'next/link'
import { DepartmentIcon } from '@/components/icons/DepartmentIcon'

const collections = [
  { id: '1', title: 'Kit Churrasco', desc: 'Tudo para um churrasco perfeito', icon: 'acougue', href: '/departamentos/acougue' },
  { id: '2', title: 'Café da Manhã', desc: 'Comece o dia com energia', icon: 'padaria', href: '/departamentos/padaria' },
  { id: '3', title: 'Detox & Saúde', desc: 'Produtos naturais e saudáveis', icon: 'hortifruti', href: '/departamentos/hortifruti' },
  { id: '4', title: 'Noite de Cinema', desc: 'Snacks e bebidas para o lar', icon: 'snacks', href: '/departamentos/snacks' },
  { id: '5', title: 'Limpeza Casa', desc: 'Produtos para a sua casa brilhar', icon: 'limpeza', href: '/departamentos/limpeza' },
  { id: '6', title: 'Bebidas Geladas', desc: 'Bebidas para o calor', icon: 'bebidas', href: '/departamentos/bebidas' },
]

export default function ColecoesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Coleções</h1>
      <p className="text-gray-500 mb-8">Produtos organizados por ocasião</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {collections.map(c => (
          <Link
            key={c.id}
            href={c.href}
            className="group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#1565C0]/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[#1565C0] mb-4 group-hover:scale-105 transition-transform">
              <DepartmentIcon slug={c.icon} className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{c.title}</h3>
            <p className="text-gray-500 text-sm">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

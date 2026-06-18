import Link from 'next/link'
import { ChefHat, Clock, Users } from 'lucide-react'
import { DepartmentIcon } from '@/components/icons/DepartmentIcon'

const recipes = [
  { id: '1', title: 'Frango Grelhado com Legumes', time: '30 min', servings: 4, dept: 'acougue' },
  { id: '2', title: 'Salada Caesar Clássica', time: '15 min', servings: 2, dept: 'hortifruti' },
  { id: '3', title: 'Macarrão ao Molho Bolonhesa', time: '45 min', servings: 4, dept: 'mercearia' },
  { id: '4', title: 'Suco Detox Verde', time: '10 min', servings: 1, dept: 'hortifruti' },
  { id: '5', title: 'Arroz Carreteiro', time: '50 min', servings: 6, dept: 'acougue' },
  { id: '6', title: 'Vitamina de Banana com Aveia', time: '5 min', servings: 1, dept: 'hortifruti' },
]

export default function ReceitasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-8">
        <ChefHat className="w-8 h-8 text-[#1565C0]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Receitas</h1>
          <p className="text-sm text-gray-500">Inspire-se e adicione os ingredientes ao carrinho</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {recipes.map(r => (
          <div key={r.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#1565C0]/30 transition-all group cursor-pointer">
            <div className="h-40 flex items-center justify-center bg-blue-50/60 text-[#1565C0] group-hover:bg-blue-50 transition-colors">
              <DepartmentIcon slug={r.dept} className="w-12 h-12" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2">{r.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {r.time}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {r.servings} porções</span>
              </div>
              <Link
                href={`/departamentos/${r.dept}`}
                className="mt-3 block text-center bg-[#1565C0] text-white text-sm font-medium py-2 rounded-full hover:bg-[#0d47a1] transition-colors"
              >
                Ver ingredientes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

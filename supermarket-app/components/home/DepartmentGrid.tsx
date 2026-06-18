import Link from 'next/link'
import { Department } from '@/types'
import { DepartmentIcon } from '@/components/icons/DepartmentIcon'

interface DepartmentGridProps {
  departments: Department[]
}

export function DepartmentGrid({ departments }: DepartmentGridProps) {
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-slate-700 tracking-tight">Departamentos</h2>
        <span className="text-xs text-slate-400">{departments.length} seções</span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2">
        {departments.map(dept => (
          <Link
            key={dept.id}
            href={`/departamentos/${dept.slug}`}
            className="group flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-white border border-slate-100 hover:border-[#1565C0]/30 hover:bg-blue-50/50 transition-all text-center"
          >
            <span className="text-slate-400 group-hover:text-[#1565C0] transition-colors">
              <DepartmentIcon slug={dept.slug} className="w-6 h-6" />
            </span>
            <span className="text-[11px] text-slate-500 group-hover:text-[#1565C0] font-medium leading-tight transition-colors">
              {dept.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

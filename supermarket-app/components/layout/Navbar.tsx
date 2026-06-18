'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Grid3X3, ChevronDown, ChevronRight } from 'lucide-react'
import { departments } from '@/data/departments'
import { DepartmentIcon } from '@/components/icons/DepartmentIcon'

export function Navbar() {
  const [deptOpen, setDeptOpen] = useState(false)
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)
  const deptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) setDeptOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const activeDept = departments.find(d => d.slug === hoveredDept) ?? departments[0]

  return (
    <nav className="bg-[#0d47a1] sticky top-[65px] z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Departamentos */}
        <div ref={deptRef} className="relative">
          <button
            onClick={() => setDeptOpen(v => !v)}
            className="flex items-center gap-2 px-4 py-3 text-white font-semibold text-sm hover:bg-[#1565C0] transition-colors"
          >
            <Grid3X3 className="w-4 h-4" />
            Departamentos
            <ChevronDown className={`w-4 h-4 transition-transform ${deptOpen ? 'rotate-180' : ''}`} />
          </button>

          {deptOpen && (
            <div className="absolute top-full left-0 w-[640px] bg-white shadow-2xl rounded-b-xl border border-gray-100 z-50 flex">
              <div className="w-52 border-r border-gray-100 py-2">
                {departments.map(dept => (
                  <Link key={dept.id} href={`/departamentos/${dept.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 group"
                    onMouseEnter={() => setHoveredDept(dept.slug)}
                    onClick={() => setDeptOpen(false)}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                        <DepartmentIcon slug={dept.slug} className="w-4 h-4" />
                      </span>
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
              <div className="flex-1 p-4">
                <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  <DepartmentIcon slug={activeDept.slug} className="w-3.5 h-3.5" />
                  {activeDept.name}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {activeDept.categories.map(cat => (
                    <Link key={cat.id}
                      href={`/departamentos/${activeDept.slug}/${cat.slug}`}
                      className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={() => setDeptOpen(false)}>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-blue-700 mx-1" />

        {[
          { href: '/mais-vendidos', label: 'Mais Vendidos' },
          { href: '/ofertas',       label: 'Ofertas' },
          { href: '/departamentos/acougue',    label: 'Açougue' },
          { href: '/departamentos/hortifruti', label: 'Hortifruti' },
          { href: '/receitas',      label: 'Receitas' },
        ].map(link => (
          <Link key={link.href} href={link.href}
            className="px-4 py-3 text-white text-sm font-medium hover:bg-[#1565C0] transition-colors whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

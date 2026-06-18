interface DepartmentIconProps {
  slug: string
  className?: string
}

/**
 * Monochrome SVG icon for a department/category slug.
 * Shared across DepartmentGrid, Navbar mega-menu, department & category
 * headers, and product filters so iconography stays consistent (no emoji).
 */
export function DepartmentIcon({ slug, className = 'w-6 h-6' }: DepartmentIconProps) {
  switch (slug) {
    case 'hortifruti':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C8 3 4 7 4 12c0 3 2 5 4 6m4-15c4 0 8 4 8 9 0 3-2 5-4 6M12 3v18" />
        </svg>
      )
    case 'acougue':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 2-3 5-3 8a3 3 0 006 0c0-3-1.5-6-3-8z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6M12 14v7" />
        </svg>
      )
    case 'padaria':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0-4 3-7 9-7s9 3 9 7-3 5-9 5-9-1-9-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v2M8 6l1 1M16 6l-1 1" />
        </svg>
      )
    case 'laticinios':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8l2 5v11a1 1 0 01-1 1H7a1 1 0 01-1-1V8l2-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8" />
        </svg>
      )
    case 'bebidas':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10l2 6H5l2-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l1 12h10l1-12" />
        </svg>
      )
    case 'mercearia':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M8 6V4M16 6V4" />
        </svg>
      )
    case 'limpeza':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l1 6H8L9 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l1 12h6l1-12" />
        </svg>
      )
    case 'higiene':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <circle cx="12" cy="8" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 12v8M14 12v8M8 20h8" />
        </svg>
      )
    case 'congelados':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
        </svg>
      )
    case 'snacks':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
      )
  }
}

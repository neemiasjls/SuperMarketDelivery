import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'offer' | 'new' | 'bestseller'
  className?: string
}

export function Badge({ children, variant = 'offer', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 text-xs font-bold rounded text-white',
        variant === 'offer' && 'bg-red-600',
        variant === 'new' && 'bg-blue-600',
        variant === 'bestseller' && 'bg-amber-500',
        className
      )}
    >
      {children}
    </span>
  )
}

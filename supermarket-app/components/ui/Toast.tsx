'use client'
import { useToastStore, Toast } from '@/store/toastStore'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useEffect, useState } from 'react'

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToastStore()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Tiny delay so CSS transition fires
    const t1 = setTimeout(() => setVisible(true), 20)
    // Start fade-out before store removes it
    const t2 = setTimeout(() => setVisible(false), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const styles: Record<Toast['type'], string> = {
    success: 'border-l-4 border-l-green-500',
    info:    'border-l-4 border-l-blue-500',
    error:   'border-l-4 border-l-red-500',
  }
  const icons: Record<Toast['type'], React.ReactNode> = {
    success: <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />,
    info:    <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />,
    error:   <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />,
  }

  return (
    <div
      className={`
        flex items-center gap-2.5 pl-3 pr-3 py-3 rounded-xl bg-white shadow-xl
        pointer-events-auto transition-all duration-300 max-w-xs w-full
        ${styles[toast.type]}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
      `}
    >
      {icons[toast.type]}
      <p className="text-sm font-medium text-gray-800 flex-1 leading-tight">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0 ml-1"
        aria-label="Fechar notificação"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const { toasts } = useToastStore()
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

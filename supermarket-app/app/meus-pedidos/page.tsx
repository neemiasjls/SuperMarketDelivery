'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { api } from '@/lib/api'

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'

interface OrderSummary {
  id: string
  createdAt: string
  status: OrderStatus
  total: number
  items: { quantity: number }[]
  deliveryTime?: string
}

const statusConfig: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string }> = {
  pending:    { label: 'Aguardando',  icon: <Clock className="w-4 h-4" />,        color: 'text-amber-600 bg-amber-50' },
  confirmed:  { label: 'Confirmado', icon: <CheckCircle className="w-4 h-4" />,  color: 'text-blue-600 bg-blue-50' },
  preparing:  { label: 'Preparando', icon: <Package className="w-4 h-4" />,      color: 'text-purple-600 bg-purple-50' },
  delivering: { label: 'Em entrega', icon: <Truck className="w-4 h-4" />,        color: 'text-[#1565C0] bg-blue-50' },
  delivered:  { label: 'Entregue',   icon: <CheckCircle className="w-4 h-4" />, color: 'text-gray-600 bg-gray-100' },
  cancelled:  { label: 'Cancelado',  icon: <XCircle className="w-4 h-4" />,     color: 'text-red-600 bg-red-50' },
}

export default function MeusPedidosPage() {
  const { user, openLogin } = useAuthStore()
  const [orders, setOrders]   = useState<OrderSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!user) { setLoading(false); return }
    api.orders.list()
      .then(res => setOrders(res.data as OrderSummary[]))
      .catch(err => setError(err instanceof Error ? err.message : 'Erro ao carregar pedidos'))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Package className="w-14 h-14 text-gray-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Você não está logado</h2>
        <p className="text-gray-500 text-sm mb-6">Faça login para ver seus pedidos.</p>
        <button onClick={openLogin} className="bg-[#1565C0] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0d47a1] transition-colors">
          Entrar na minha conta
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 flex items-center justify-center gap-2 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Carregando pedidos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <p className="flex items-center justify-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
          <XCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm text-[#1565C0] hover:underline">
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
          <Link href="/" className="mt-4 inline-block text-[#1565C0] hover:underline text-sm">
            Começar a comprar
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const status = statusConfig[order.status] ?? statusConfig.pending
            const itemCount = order.items.reduce((s, i) => s + i.quantity, 0)
            return (
              <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-800">#{order.id}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.color}`}>
                    {status.icon}
                    {status.label}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500 flex items-center gap-3">
                    <span>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
                    {order.deliveryTime && (
                      <>
                        <span>·</span>
                        <span>Entrega: {order.deliveryTime}</span>
                      </>
                    )}
                  </div>
                  <span className="font-bold text-gray-800">{formatCurrency(order.total)}</span>
                </div>
                {order.status === 'delivering' && (
                  <div className="mt-3 bg-blue-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-[#1565C0] text-sm font-medium">
                      <Truck className="w-4 h-4 animate-pulse" />
                      Seu pedido está a caminho!
                    </div>
                  </div>
                )}
                <div className="mt-3 flex justify-end">
                  <Link href={`/meus-pedidos/${order.id}`}
                    className="text-xs text-[#1565C0] hover:underline flex items-center gap-0.5">
                    Ver detalhes <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

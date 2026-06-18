'use client'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { User, MapPin, Package, LogOut, Phone, Mail } from 'lucide-react'

export default function MinhaContaPage() {
  const { user, logout, openLogin } = useAuthStore()

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[#1565C0] mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Você não está logado</h2>
        <button onClick={openLogin} className="bg-[#1565C0] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0d47a1] transition-colors">
          Entrar na minha conta
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Minha Conta</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Perfil */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-[#1565C0]">
                {user.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">Cliente desde 2024</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Mail className="w-4 h-4 text-gray-400" />, label: 'E-mail', value: user.email },
                { icon: <Phone className="w-4 h-4 text-gray-400" />, label: 'Telefone', value: user.phone },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  {item.icon}
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-medium text-gray-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Endereços */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Meus Endereços</h3>
              <button className="text-sm text-[#1565C0] hover:underline font-medium">+ Adicionar</button>
            </div>
            {user.addresses.map(addr => (
              <div key={addr.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold bg-blue-100 text-[#1565C0] px-2 py-0.5 rounded-full">{addr.label}</span>
                  {addr.isDefault && <span className="text-xs text-gray-400">Padrão</span>}
                </div>
                <p className="text-sm text-gray-700">{addr.street}, {addr.number}</p>
                <p className="text-sm text-gray-500">{addr.neighborhood} - {addr.city}/{addr.state}</p>
                <p className="text-sm text-gray-500">CEP: {addr.zipCode}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          {[
            { href: '/meus-pedidos', icon: <Package className="w-5 h-5 text-[#1565C0]" />, label: 'Meus Pedidos', desc: 'Acompanhe seus pedidos' },
            { href: '/minha-conta', icon: <User className="w-5 h-5 text-[#1565C0]" />, label: 'Editar Perfil', desc: 'Altere seus dados' },
            { href: '/minha-conta', icon: <MapPin className="w-5 h-5 text-[#1565C0]" />, label: 'Endereços', desc: 'Gerencie endereços' },
          ].map(item => (
            <Link key={item.label} href={item.href} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">{item.icon}</div>
              <div>
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </Link>
          ))}
          <button
            onClick={logout}
            className="w-full bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow text-red-600"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Sair</p>
              <p className="text-xs text-gray-400">Encerrar sessão</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

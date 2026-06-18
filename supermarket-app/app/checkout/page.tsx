'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, MapPin, CreditCard, Clock, CheckCircle, Loader2, Zap, Landmark, Banknote, Lock, ShoppingCart, Check, AlertCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { formatCurrency } from '@/lib/utils'
import { api } from '@/lib/api'

type Step = 'address' | 'delivery' | 'payment' | 'confirmation'

const DELIVERY_SLOTS = [
  { id: '1', label: 'Hoje', time: '14h - 16h', fee: 9.90 },
  { id: '2', label: 'Hoje', time: '16h - 18h', fee: 9.90 },
  { id: '3', label: 'Hoje', time: '18h - 20h', fee: 9.90 },
  { id: '4', label: 'Amanhã', time: '08h - 10h', fee: 9.90 },
  { id: '5', label: 'Amanhã', time: '10h - 12h', fee: 9.90 },
  { id: '6', label: 'Amanhã', time: '14h - 16h', fee: 0, freeLabel: 'Frete Grátis' },
]

const PAYMENT_METHODS = [
  { id: 'pix', label: 'PIX', icon: <Zap className="w-5 h-5 text-[#1565C0]" />, discount: 5 },
  { id: 'credit', label: 'Cartão de Crédito', icon: <CreditCard className="w-5 h-5 text-[#1565C0]" />, discount: 0 },
  { id: 'debit', label: 'Cartão de Débito', icon: <Landmark className="w-5 h-5 text-[#1565C0]" />, discount: 0 },
  { id: 'cash', label: 'Dinheiro', icon: <Banknote className="w-5 h-5 text-[#1565C0]" />, discount: 0 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, getTotal, clearCart } = useCartStore()
  const { user, openLogin } = useAuthStore()

  const [step, setStep] = useState<Step>('address')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('')
  const [pixDiscount, setPixDiscount] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [placeError, setPlaceError] = useState('')
  const [orderId, setOrderId] = useState('')
  const [form, setForm] = useState({
    zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: 'SP'
  })

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[#1565C0] mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Faça login para continuar</h2>
        <p className="text-gray-500 mb-6">É necessário estar logado para finalizar o pedido.</p>
        <button
          onClick={openLogin}
          className="bg-[#1565C0] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0d47a1] transition-colors"
        >
          Entrar na minha conta
        </button>
      </div>
    )
  }

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mb-4">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Carrinho vazio</h2>
        <Link href="/" className="text-[#1565C0] hover:underline">Voltar às compras</Link>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const slot = DELIVERY_SLOTS.find(s => s.id === selectedSlot)
  const deliveryFee = slot?.fee ?? 9.90
  const payment = PAYMENT_METHODS.find(p => p.id === selectedPayment)
  const pixValue = selectedPayment === 'pix' ? subtotal * 0.05 : 0
  const total = subtotal + deliveryFee - pixValue

  async function placeOrder() {
    setPlacing(true)
    setPlaceError('')
    try {
      const orderItems = items.map(({ product, quantity }) => ({
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        unit: product.unit,
        quantity,
      }))

      const addr = user!.addresses[0] ?? {
        street: form.street, number: form.number, complement: form.complement,
        neighborhood: form.neighborhood, city: form.city, state: form.state, zipCode: form.zipCode,
      }

      const { order } = await api.orders.create({
        items: orderItems,
        paymentMethod: selectedPayment,
        deliveryDate: slot?.label,
        deliveryTime: slot?.time,
        deliveryFee: deliveryFee,
        address: addr,
      })

      setOrderId(order.id)
      clearCart()
      setStep('confirmation')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao finalizar pedido.'
      setPlaceError(msg)
    } finally {
      setPlacing(false)
    }
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'address', label: 'Endereço' },
    { key: 'delivery', label: 'Entrega' },
    { key: 'payment', label: 'Pagamento' },
    { key: 'confirmation', label: 'Confirmação' },
  ]

  const stepIndex = steps.findIndex(s => s.key === step)

  if (step === 'confirmation') {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-10">
          <CheckCircle className="w-16 h-16 text-[#1565C0] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pedido confirmado!</h1>
          <p className="text-gray-500 mb-4">Seu pedido <strong>#{orderId}</strong> foi recebido com sucesso.</p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left space-y-1">
            <p className="text-sm text-blue-800"><strong>Entrega:</strong> {slot?.label} às {slot?.time}</p>
            <p className="text-sm text-blue-800"><strong>Pagamento:</strong> {payment?.label}</p>
            <p className="text-sm text-blue-800"><strong>Total:</strong> {formatCurrency(total)}</p>
          </div>
          <p className="text-sm text-gray-400 mb-6">Você receberá atualizações pelo WhatsApp.</p>
          <div className="flex gap-3">
            <Link
              href="/meus-pedidos"
              className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-50 transition-colors text-sm"
            >
              Meus Pedidos
            </Link>
            <Link
              href="/"
              className="flex-1 bg-[#1565C0] text-white font-bold py-3 rounded-full hover:bg-[#0d47a1] transition-colors text-sm"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Progresso */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.slice(0, 3).map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${i <= stepIndex ? 'text-[#1565C0]' : 'text-gray-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i < stepIndex ? 'bg-[#1565C0] border-[#1565C0] text-white' : i === stepIndex ? 'border-[#1565C0] text-[#1565C0]' : 'border-gray-300'}`}>
                {i < stepIndex ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s.label}</span>
            </div>
            {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="md:col-span-2">
          {/* ETAPA: Endereço */}
          {step === 'address' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-[#1565C0]" />
                <h2 className="font-bold text-gray-800 text-lg">Endereço de entrega</h2>
              </div>

              {user.addresses[0] && (
                <div className="border-2 border-[#1565C0] rounded-xl p-4 mb-5 bg-blue-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1565C0] bg-blue-200 px-2 py-0.5 rounded-full">
                      {user.addresses[0].label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#1565C0] font-medium">
                      <Check className="w-3 h-3" /> Padrão
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {user.addresses[0].street}, {user.addresses[0].number}
                    {user.addresses[0].complement ? `, ${user.addresses[0].complement}` : ''}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.addresses[0].neighborhood} - {user.addresses[0].city}/{user.addresses[0].state}
                  </p>
                  <p className="text-sm text-gray-500">CEP: {user.addresses[0].zipCode}</p>
                </div>
              )}

              <p className="text-sm font-semibold text-gray-700 mb-3">Ou cadastrar novo endereço:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">CEP</label>
                  <input
                    value={form.zipCode}
                    onChange={e => setForm(f => ({ ...f, zipCode: e.target.value }))}
                    placeholder="00000-000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Número</label>
                  <input
                    value={form.number}
                    onChange={e => setForm(f => ({ ...f, number: e.target.value }))}
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rua</label>
                  <input
                    value={form.street}
                    onChange={e => setForm(f => ({ ...f, street: e.target.value }))}
                    placeholder="Rua das Flores"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Bairro</label>
                  <input
                    value={form.neighborhood}
                    onChange={e => setForm(f => ({ ...f, neighborhood: e.target.value }))}
                    placeholder="Centro"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Cidade</label>
                  <input
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    placeholder="Bastos"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('delivery')}
                className="w-full mt-6 bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold py-3.5 rounded-full transition-colors"
              >
                Continuar para entrega →
              </button>
            </div>
          )}

          {/* ETAPA: Entrega */}
          {step === 'delivery' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-5 h-5 text-[#1565C0]" />
                <h2 className="font-bold text-gray-800 text-lg">Escolha o horário de entrega</h2>
              </div>
              <div className="space-y-2">
                {DELIVERY_SLOTS.map(slot => (
                  <label
                    key={slot.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedSlot === slot.id
                        ? 'border-[#1565C0] bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="slot"
                        value={slot.id}
                        checked={selectedSlot === slot.id}
                        onChange={() => setSelectedSlot(slot.id)}
                        className="accent-blue-600"
                      />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{slot.label}</p>
                        <p className="text-xs text-gray-500">{slot.time}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${slot.fee === 0 ? 'text-[#1565C0]' : 'text-gray-700'}`}>
                      {slot.fee === 0 ? 'Grátis' : formatCurrency(slot.fee)}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('address')}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  ← Voltar
                </button>
                <button
                  onClick={() => setStep('payment')}
                  disabled={!selectedSlot}
                  className="flex-1 bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold py-3 rounded-full transition-colors disabled:opacity-50"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* ETAPA: Pagamento */}
          {step === 'payment' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-[#1565C0]" />
                <h2 className="font-bold text-gray-800 text-lg">Forma de pagamento</h2>
              </div>
              <div className="space-y-2 mb-5">
                {PAYMENT_METHODS.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedPayment === method.id
                        ? 'border-[#1565C0] bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="accent-blue-600"
                      />
                      <span className="flex items-center justify-center">{method.icon}</span>
                      <span className="font-medium text-gray-800 text-sm">{method.label}</span>
                    </div>
                    {method.discount > 0 && (
                      <span className="text-xs bg-blue-100 text-[#1565C0] font-bold px-2 py-1 rounded-full">
                        {method.discount}% OFF
                      </span>
                    )}
                  </label>
                ))}
              </div>

              {selectedPayment === 'credit' && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                  <p className="text-sm font-medium text-gray-700">Dados do cartão</p>
                  <input placeholder="Nome no cartão" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]" />
                  <input placeholder="Número do cartão" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/AA" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]" />
                    <input placeholder="CVV" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0]" />
                  </div>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1565C0] bg-white">
                    <option>1x de {formatCurrency(total)} sem juros</option>
                    <option>2x de {formatCurrency(total / 2)} sem juros</option>
                    <option>3x de {formatCurrency(total / 3)} sem juros</option>
                  </select>
                </div>
              )}

              {selectedPayment === 'pix' && (
                <div className="bg-blue-50 rounded-xl p-4 mb-4 text-center">
                  <p className="flex items-center justify-center gap-1.5 text-sm text-blue-800 font-medium mb-1">
                    <Zap className="w-4 h-4" /> Desconto de 5% no PIX!
                  </p>
                  <p className="text-xs text-[#1565C0]">
                    Economia de {formatCurrency(subtotal * 0.05)}
                  </p>
                </div>
              )}

              {placeError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {placeError}
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setStep('delivery')}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  ← Voltar
                </button>
                <button
                  onClick={placeOrder}
                  disabled={!selectedPayment || placing}
                  className="flex-1 bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold py-3 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {placing && <Loader2 className="w-4 h-4 animate-spin" />}
                  {placing ? 'Finalizando...' : `Finalizar ${formatCurrency(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumo do pedido */}
        <div>
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-36">
            <h3 className="font-bold text-gray-800 mb-4">Resumo do pedido</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-2">
                  <div className="relative w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">{quantity}x</p>
                  </div>
                  <span className="text-xs font-bold text-gray-700">{formatCurrency(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {selectedSlot && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Entrega</span>
                  <span className={deliveryFee === 0 ? 'text-[#1565C0]' : ''}>
                    {deliveryFee === 0 ? 'Grátis' : formatCurrency(deliveryFee)}
                  </span>
                </div>
              )}
              {selectedPayment === 'pix' && (
                <div className="flex justify-between text-sm text-[#1565C0]">
                  <span>Desconto PIX (5%)</span>
                  <span>-{formatCurrency(pixValue)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

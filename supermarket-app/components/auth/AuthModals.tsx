'use client'
import { useState } from 'react'
import { X, Eye, EyeOff, Loader2, Check, Circle } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export function AuthModals() {
  const { isLoginOpen, isRegisterOpen, closeLogin, closeRegister, login, register, openRegister, openLogin } = useAuthStore()
  return (
    <>
      {isLoginOpen && <LoginModal onClose={closeLogin} onRegister={openRegister} onLogin={login} />}
      {isRegisterOpen && <RegisterModal onClose={closeRegister} onLogin={openLogin} onRegister={register} />}
    </>
  )
}

// ── Regras de senha forte (compartilhadas com o checklist em tempo real) ────────
const PASSWORD_RULES: { key: string; label: string; test: (p: string) => boolean }[] = [
  { key: 'len',     label: 'No mínimo 8 caracteres',          test: p => p.length >= 8 },
  { key: 'upper',   label: 'Uma letra maiúscula (A–Z)',       test: p => /[A-Z]/.test(p) },
  { key: 'lower',   label: 'Uma letra minúscula (a–z)',       test: p => /[a-z]/.test(p) },
  { key: 'number',  label: 'Um número (0–9)',                 test: p => /[0-9]/.test(p) },
  { key: 'special', label: 'Um caractere especial (!@#$…)',   test: p => /[^A-Za-z0-9]/.test(p) },
]

function isStrongPassword(p: string): boolean {
  return PASSWORD_RULES.every(r => r.test(p))
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Formata o telefone como (XX) XXXXX-XXXX enquanto o usuário digita
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function PasswordChecklist({ password }: { password: string }) {
  return (
    <ul className="mt-2 grid grid-cols-1 gap-1" aria-label="Requisitos da senha">
      {PASSWORD_RULES.map(rule => {
        const ok = rule.test(password)
        return (
          <li key={rule.key} className={`flex items-center gap-2 text-xs transition-colors ${ok ? 'text-green-600' : 'text-gray-400'}`}>
            {ok
              ? <Check className="w-3.5 h-3.5 flex-shrink-0" />
              : <Circle className="w-3.5 h-3.5 flex-shrink-0" />}
            <span>{rule.label}</span>
          </li>
        )
      })}
    </ul>
  )
}

function LoginModal({ onClose, onRegister, onLogin }: {
  onClose: () => void
  onRegister: () => void
  onLogin: (email: string, password: string) => Promise<boolean>
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Preencha todos os campos.'); return }
    if (!isValidEmail(email)) { setError('Digite um e-mail válido.'); return }
    setLoading(true)
    const ok = await onLogin(email, password)
    setLoading(false)
    if (!ok) setError('E-mail ou senha incorretos.')
  }

  return (
    <ModalWrapper onClose={onClose}>
      <BrandMark />
      <h2 className="text-xl font-bold text-gray-800 mb-1">Entrar na sua conta</h2>
      <p className="text-sm text-gray-500 mb-6">Acesse ofertas exclusivas e acompanhe seus pedidos.</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="seu@email.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Sua senha"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] pr-10" />
            <button type="button" onClick={() => setShowPw(v => !v)}
              aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">
        Não tem conta?{' '}
        <button onClick={onRegister} className="text-[#1565C0] font-bold hover:underline">Cadastre-se grátis</button>
      </p>
    </ModalWrapper>
  )
}

function RegisterModal({ onClose, onLogin, onRegister }: {
  onClose: () => void
  onLogin: () => void
  onRegister: (name: string, email: string, password: string, phone: string) => Promise<boolean>
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const phoneDigits = phone.replace(/\D/g, '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      setError('Preencha todos os campos.'); return
    }
    if (name.trim().length < 3) {
      setError('Informe seu nome completo.'); return
    }
    if (!isValidEmail(email)) {
      setError('Digite um e-mail válido.'); return
    }
    if (phoneDigits.length < 10) {
      setError('Telefone inválido. Inclua o DDD.'); return
    }
    if (!isStrongPassword(password)) {
      setError('A senha não cumpre todos os requisitos abaixo.'); return
    }

    setLoading(true)
    const ok = await onRegister(name.trim(), email.trim(), password, phone.trim())
    setLoading(false)
    if (!ok) setError('Não foi possível criar a conta. Tente outro e-mail.')
  }

  return (
    <ModalWrapper onClose={onClose}>
      <BrandMark />
      <h2 className="text-xl font-bold text-gray-800 mb-1">Criar sua conta</h2>
      <p className="text-sm text-gray-500 mb-6">Rápido, grátis e com benefícios exclusivos.</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            autoComplete="name" placeholder="João da Silva"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            autoComplete="email" placeholder="seu@email.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone/WhatsApp</label>
          <input type="tel" value={phone} onChange={e => setPhone(formatPhone(e.target.value))}
            autoComplete="tel" placeholder="(11) 99999-0000"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              autoComplete="new-password" placeholder="Crie uma senha forte"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] pr-10" />
            <button type="button" onClick={() => setShowPw(v => !v)}
              aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <PasswordChecklist password={password} />
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Criando conta...' : 'Criar conta grátis'}
        </button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">
        Já tem conta?{' '}
        <button onClick={onLogin} className="text-[#1565C0] font-bold hover:underline">Entrar</button>
      </p>
    </ModalWrapper>
  )
}

function BrandMark() {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1 text-sm font-black">
        <span className="text-[#1565C0]">SUPER</span>
        <span className="w-px h-4 bg-gray-200" />
        <span className="text-[#d32f2f]">MERCADO</span>
      </div>
    </div>
  )
}

function ModalWrapper({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 pointer-events-auto relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

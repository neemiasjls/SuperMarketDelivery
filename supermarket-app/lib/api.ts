const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5002'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }))
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }

  return res.json()
}

// ── Produtos ──────────────────────────────────────────────────────────────────
export const api = {
  products: {
    list: (params?: {
      q?: string
      department?: string
      category?: string
      offer?: boolean
      bestseller?: boolean
      featured?: boolean
      sort?: string
      page?: number
      limit?: number
    }) => {
      const qs = new URLSearchParams()
      if (params?.q) qs.set('q', params.q)
      if (params?.department) qs.set('department', params.department)
      if (params?.category) qs.set('category', params.category)
      if (params?.offer) qs.set('offer', 'true')
      if (params?.bestseller) qs.set('bestseller', 'true')
      if (params?.featured) qs.set('featured', 'true')
      if (params?.sort) qs.set('sort', params.sort)
      if (params?.page) qs.set('page', String(params.page))
      if (params?.limit) qs.set('limit', String(params.limit))
      const query = qs.toString()
      return request<{ data: any[]; total: number; page: number; pages: number }>(
        `/api/products${query ? `?${query}` : ''}`
      )
    },
    get: (slug: string) =>
      request<{ product: any; related: any[] }>(`/api/products/${slug}`),
  },

  // ── Auth ────────────────────────────────────────────────────────────────────
  auth: {
    register: (body: { name: string; email: string; password: string; phone: string }) =>
      request<{ token: string; user: any }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    login: (body: { email: string; password: string }) =>
      request<{ token: string; user: any }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    me: () => request<{ user: any; addresses: any[] }>('/api/auth/me'),
  },

  // ── Pedidos ─────────────────────────────────────────────────────────────────
  orders: {
    list: () => request<{ data: any[] }>('/api/orders'),
    get: (id: string) => request<{ order: any }>(`/api/orders/${id}`),
    create: (body: any) =>
      request<{ order: any }>('/api/orders', { method: 'POST', body: JSON.stringify(body) }),
    cancel: (id: string) =>
      request<{ order: any }>(`/api/orders/${id}/cancel`, { method: 'PATCH' }),
  },

  // ── Endereços ───────────────────────────────────────────────────────────────
  addresses: {
    list: () => request<{ data: any[] }>('/api/addresses'),
    create: (body: any) =>
      request<{ address: any }>('/api/addresses', { method: 'POST', body: JSON.stringify(body) }),
    remove: (id: string) =>
      request<{ message: string }>(`/api/addresses/${id}`, { method: 'DELETE' }),
  },

  // ── Health ──────────────────────────────────────────────────────────────────
  health: () => request<{ status: string; timestamp: string }>('/api/health'),
}

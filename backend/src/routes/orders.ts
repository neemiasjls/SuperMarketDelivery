import { Router, Response } from 'express'
import { prisma } from '../data/prisma'
import { products } from '../data/products'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()

const VALID_PAYMENT_METHODS = ['pix', 'credit', 'debit', 'cash'] as const
const MAX_ITEMS_PER_ORDER = 50
const MAX_QTY_PER_ITEM   = 99

// GET /api/orders
router.get('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.userId },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
  res.json({ data: orders })
})

// GET /api/orders/:id
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const order = await prisma.order.findFirst({
    where: { id: String(req.params.id), userId: req.user!.userId },
    include: { items: true },
  })
  if (!order) { res.status(404).json({ error: 'Pedido não encontrado' }); return }
  res.json({ order })
})

// POST /api/orders
router.post('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const { items, paymentMethod, deliveryDate, deliveryTime, address } = req.body

  // ── Validações básicas ──────────────────────────────────────────────────────
  if (!items?.length || !paymentMethod || !deliveryDate || !deliveryTime || !address) {
    res.status(400).json({ error: 'Dados do pedido incompletos' }); return
  }

  // ── Whitelist de métodos de pagamento ────────────────────────────────────────
  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    res.status(400).json({ error: 'Forma de pagamento inválida' }); return
  }

  // ── Limite de itens ──────────────────────────────────────────────────────────
  if (items.length > MAX_ITEMS_PER_ORDER) {
    res.status(400).json({ error: `Pedido não pode ter mais de ${MAX_ITEMS_PER_ORDER} itens` })
    return
  }

  // ── Resolver preços no SERVIDOR (não confiar no cliente) ────────────────────
  const orderItems = []
  for (const item of items) {
    const product = products.find(p => p.id === item.productId)
    if (!product) {
      res.status(400).json({ error: `Produto ${item.productId} não encontrado` }); return
    }

    const qty = Math.min(Math.max(1, Math.floor(Number(item.quantity) || 1)), MAX_QTY_PER_ITEM)

    orderItems.push({
      productId:    product.id,
      productName:  product.name,
      productImage: product.image,
      price:        product.price,   // ← preço oficial, não do cliente
      unit:         product.unit,
      quantity:     qty,
    })
  }

  // ── Calcular totais no servidor ──────────────────────────────────────────────
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const discount = paymentMethod === 'pix' ? subtotal * 0.05 : 0

  // Frete calculado no servidor, não aceito do cliente
  const deliveryFee = subtotal >= 150 ? 0 : 9.90

  const total = subtotal + deliveryFee - discount

  // Snapshot do endereço — só campos conhecidos, evita gravar lixo do cliente
  const addressSnapshot = {
    label:        String(address.label ?? ''),
    street:       String(address.street ?? ''),
    number:       String(address.number ?? ''),
    complement:   address.complement ? String(address.complement) : null,
    neighborhood: String(address.neighborhood ?? ''),
    city:         String(address.city ?? ''),
    state:        String(address.state ?? ''),
    zipCode:      String(address.zipCode ?? ''),
  }

  const order = await prisma.order.create({
    data: {
      id:            `PED${Date.now().toString().slice(-8)}`,
      userId:        req.user!.userId,
      subtotal,
      discount,
      deliveryFee,
      total,
      status:        'confirmed',
      paymentMethod,
      deliveryDate,
      deliveryTime,
      address:       addressSnapshot,
      items:         { create: orderItems },
    },
    include: { items: true },
  })

  res.status(201).json({ order })
})

// PATCH /api/orders/:id/cancel
router.patch('/:id/cancel', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const order = await prisma.order.findFirst({
    where: { id: String(req.params.id), userId: req.user!.userId },
  })
  if (!order) { res.status(404).json({ error: 'Pedido não encontrado' }); return }
  if (!['pending', 'confirmed'].includes(order.status)) {
    res.status(400).json({ error: 'Pedido não pode ser cancelado neste status' }); return
  }

  const updated = await prisma.order.update({
    where: { id: order.id },
    data: { status: 'cancelled' },
    include: { items: true },
  })
  res.json({ order: updated })
})

export default router

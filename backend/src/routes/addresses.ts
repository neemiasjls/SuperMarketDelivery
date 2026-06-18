import { Router, Response } from 'express'
import { prisma } from '../data/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()

function sanitize(val: unknown, maxLen = 100): string {
  return String(val ?? '').trim().replace(/[<>"']/g, '').slice(0, maxLen)
}

const MAX_ADDRESSES_PER_USER = 10

// GET /api/addresses
router.get('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const addresses = await prisma.address.findMany({
    where: { userId: req.user!.userId },
    orderBy: { isDefault: 'desc' },
  })
  res.json({ data: addresses })
})

// POST /api/addresses
router.post('/', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const { label, street, number, complement, neighborhood, city, state, zipCode, isDefault } = req.body

  if (!street || !number || !neighborhood || !city || !state || !zipCode) {
    res.status(400).json({ error: 'Dados do endereço incompletos' })
    return
  }

  const userId = req.user!.userId

  // Limite de endereços por usuário
  const count = await prisma.address.count({ where: { userId } })
  if (count >= MAX_ADDRESSES_PER_USER) {
    res.status(400).json({ error: `Limite de ${MAX_ADDRESSES_PER_USER} endereços atingido` })
    return
  }

  const makeDefault = isDefault === true

  // Transação: se este vira o padrão, os outros deixam de ser — tudo ou nada.
  const address = await prisma.$transaction(async (tx) => {
    if (makeDefault) {
      await tx.address.updateMany({ where: { userId }, data: { isDefault: false } })
    }
    return tx.address.create({
      data: {
        userId,
        label:        sanitize(label ?? 'Casa', 30),
        street:       sanitize(street),
        number:       sanitize(number, 10),
        complement:   complement ? sanitize(complement, 50) : null,
        neighborhood: sanitize(neighborhood),
        city:         sanitize(city),
        state:        sanitize(state, 2).toUpperCase(),
        zipCode:      sanitize(zipCode, 10),
        isDefault:    makeDefault,
      },
    })
  })

  res.status(201).json({ address })
})

// DELETE /api/addresses/:id
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  // deleteMany com o userId no filtro garante que ninguém apague endereço alheio
  const result = await prisma.address.deleteMany({
    where: { id: String(req.params.id), userId: req.user!.userId },
  })
  if (result.count === 0) {
    res.status(404).json({ error: 'Endereço não encontrado' })
    return
  }
  res.json({ message: 'Endereço removido' })
})

export default router

import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../data/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()

// Helpers de validação
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Mesma política de senha forte exigida no frontend — revalidada aqui porque
// o servidor nunca pode confiar apenas na validação do cliente.
function isStrongPassword(p: string): boolean {
  return (
    p.length >= 8 &&
    /[A-Z]/.test(p) &&
    /[a-z]/.test(p) &&
    /[0-9]/.test(p) &&
    /[^A-Za-z0-9]/.test(p)
  )
}

function sanitize(str: string): string {
  return str.trim().replace(/[<>"']/g, '')
}

function signToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const rawName  = req.body.name
  const rawEmail = req.body.email?.toLowerCase().trim()
  const password = req.body.password
  const rawPhone = req.body.phone

  if (!rawName || !rawEmail || !password || !rawPhone) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    return
  }

  if (!isValidEmail(rawEmail)) {
    res.status(400).json({ error: 'E-mail inválido' })
    return
  }

  if (password.length > 128) {
    res.status(400).json({ error: 'Senha muito longa' })
    return
  }
  if (!isStrongPassword(password)) {
    res.status(400).json({
      error: 'Senha fraca: use ao menos 8 caracteres com maiúscula, minúscula, número e caractere especial',
    })
    return
  }
  if (rawName.length > 100) {
    res.status(400).json({ error: 'Nome muito longo' })
    return
  }
  if (rawEmail.length > 254) { // RFC 5321 limite
    res.status(400).json({ error: 'E-mail inválido' })
    return
  }

  const name  = sanitize(rawName)
  const email = rawEmail
  const phone = sanitize(rawPhone)

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    res.status(409).json({ error: 'Email já cadastrado' })
    return
  }

  const passwordHash = await bcrypt.hash(password, 12) // custo 12 = mais seguro
  const user = await prisma.user.create({
    data: { name, email, phone, passwordHash },
  })

  const token = signToken(user.id, user.email)

  res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
  })
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const email    = req.body.email?.toLowerCase().trim()
  const password = req.body.password

  if (!email || !password) {
    res.status(400).json({ error: 'Email e senha são obrigatórios' })
    return
  }

  if (!isValidEmail(email)) {
    res.status(401).json({ error: 'Credenciais inválidas' })
    return
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    res.status(401).json({ error: 'Credenciais inválidas' })
    return
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    res.status(401).json({ error: 'Credenciais inválidas' })
    return
  }

  const token = signToken(user.id, user.email)

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
  })
})

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: { addresses: { orderBy: { isDefault: 'desc' } } },
  })
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' })
    return
  }

  res.json({
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    addresses: user.addresses,
  })
})

export default router

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'
import addressRoutes from './routes/addresses'

// ── Validar variáveis obrigatórias ────────────────────────────────────────────
if (!process.env.JWT_SECRET) {
  console.error('[FATAL] JWT_SECRET não definido. Configure o arquivo .env')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT ?? 5002
const isDev = process.env.NODE_ENV === 'development'

// ── Segurança: headers HTTP ───────────────────────────────────────────────────
app.use(helmet())

// ── CORS restrito à origem do frontend ───────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5175',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ── Body parser com limite de tamanho (protege contra DoS) ───────────────────
app.use(express.json({ limit: process.env.BODY_LIMIT ?? '1mb' }))
app.use(express.urlencoded({ extended: false, limit: '1mb' }))

// ── Rate limiting global ──────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições. Tente novamente em instantes.' },
})
app.use(globalLimiter)

// ── Rate limiting específico para autenticação (anti força bruta) ─────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 tentativas por 15 min por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Aguarde 15 minutos.' },
  skipSuccessfulRequests: true,
})

// ── Log apenas em desenvolvimento ────────────────────────────────────────────
if (isDev) {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
  })
}

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/addresses', addressRoutes)

// ── Health check (sem expor detalhes internos) ────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// ── Error handler global (não vaza stack trace em produção) ───────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (isDev) console.error(err.stack)
  res.status(500).json({ error: isDev ? err.message : 'Erro interno do servidor' })
})

// ── Iniciar servidor ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  if (isDev) {
    console.log(`\n🚀 Backend rodando em http://localhost:${PORT}`)
    console.log(`   Ambiente: ${process.env.NODE_ENV}\n`)
  }
})

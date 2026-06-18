import { Router, Request, Response } from 'express'
import { products } from '../data/products'

const router = Router()

// GET /api/products
router.get('/', (req: Request, res: Response) => {
  const { q, department, category, offer, bestseller, featured, sort, page = '1', limit = '20' } = req.query

  // Limitar paginação — evita ?limit=999999
  const pageNum  = Math.max(1, parseInt(page  as string) || 1)
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 20))

  let result = [...products]

  if (q) {
    const query = (q as string).toLowerCase().slice(0, 100) // limitar tamanho da busca
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand?.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tags.some(t => t.includes(query))
    )
  }

  if (department) result = result.filter(p => p.departmentSlug === department)
  if (category) result = result.filter(p => p.categorySlug === category)
  if (offer === 'true') result = result.filter(p => p.isOffer)
  if (bestseller === 'true') result = result.filter(p => p.isBestSeller)
  if (featured === 'true') result = result.filter(p => p.isFeatured)

  switch (sort) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break
    case 'price-desc': result.sort((a, b) => b.price - a.price); break
    case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'discount': result.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0)); break
  }

  const start = (pageNum - 1) * limitNum
  const paginated = result.slice(start, start + limitNum)

  res.json({
    data: paginated,
    total: result.length,
    page: pageNum,
    limit: limitNum,
    pages: Math.ceil(result.length / limitNum),
  })
})

// GET /api/products/:slug
router.get('/:slug', (req: Request, res: Response): void => {
  const product = products.find(p => p.slug === req.params.slug)
  if (!product) {
    res.status(404).json({ error: 'Produto não encontrado' })
    return
  }

  const related = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 6)

  res.json({ product, related })
})

export default router

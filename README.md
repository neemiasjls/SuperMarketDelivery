# SuperMarket Online

## Portas
| Serviço | Porta | URL |
|---|---|---|
| Frontend (Next.js) | **5175** | http://localhost:5175 |
| Backend (Express) | **5002** | http://localhost:5002 |

## Como rodar

### Tudo junto (recomendado)
```bash
npm install
npm run dev
```

### Separado
```bash
# Backend
npm run dev:back

# Frontend
npm run dev:front
```

## API Endpoints

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | /api/health | Status do servidor | - |
| GET | /api/products | Listar produtos (filtros: q, department, category, offer, sort) | - |
| GET | /api/products/:slug | Detalhe do produto | - |
| POST | /api/auth/register | Cadastrar usuário | - |
| POST | /api/auth/login | Login | - |
| GET | /api/auth/me | Dados do usuário logado | ✓ |
| GET | /api/orders | Listar pedidos | ✓ |
| POST | /api/orders | Criar pedido | ✓ |
| PATCH | /api/orders/:id/cancel | Cancelar pedido | ✓ |
| GET | /api/addresses | Listar endereços | ✓ |
| POST | /api/addresses | Adicionar endereço | ✓ |
| DELETE | /api/addresses/:id | Remover endereço | ✓ |

## Estrutura
```
SuperMarket/
├── backend/          # Express + TypeScript (porta 5002)
│   └── src/
│       ├── routes/   # auth, products, orders, addresses
│       ├── data/     # products.ts (mock), db.ts (in-memory)
│       └── server.ts
└── supermarket-app/  # Next.js 14 + TypeScript (porta 5175)
    ├── app/          # Pages (App Router)
    ├── components/   # Header, Navbar, Footer, ProductCard, etc.
    ├── store/        # Zustand (cart, auth)
    └── lib/          # api.ts (cliente HTTP), utils.ts
```

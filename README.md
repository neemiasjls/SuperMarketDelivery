# 🛒 Supermercado — Plataforma de Delivery

Aplicação full-stack de delivery de supermercado: o cliente navega pelo catálogo, monta o carrinho, faz login, escolhe horário e forma de pagamento e finaliza o pedido — que fica **persistido em banco de dados**.

> Projeto de portfólio. A loja, os dados de contato e os produtos são **fictícios**.

---

## ✨ Funcionalidades

- **Catálogo** organizado por departamentos e categorias, com busca em tempo real
- **Carrinho** persistente (adicionar, remover, alterar quantidade, cálculo de total e desconto)
- **Autenticação** com cadastro e login (JWT), **senha forte obrigatória** com checklist em tempo real e botão de mostrar/ocultar
- **Checkout** em etapas: endereço → horário de entrega → pagamento → confirmação
- **Pedidos** criados com preços e frete **recalculados no servidor** e salvos no PostgreSQL
- **Conta do usuário**: endereços e histórico de pedidos
- UX caprichada: notificações (toast), micro-interações, botão flutuante de WhatsApp e voltar-ao-topo

---

## 🧰 Tecnologias

| Camada | Stack |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, lucide-react |
| **Backend** | Node.js, Express 5, TypeScript, JWT, bcryptjs |
| **Banco de dados** | PostgreSQL + Prisma ORM |
| **Infra** | Docker Compose (PostgreSQL), `concurrently` para dev |
| **Segurança** | Helmet, CORS restrito, rate limiting, validação e sanitização de entrada |

---

## 📁 Estrutura

```
SuperMarket/
├── backend/                 # API Express + TypeScript (porta 5002)
│   ├── prisma/
│   │   ├── schema.prisma     # Modelos User, Address, Order, OrderItem
│   │   └── migrations/       # Histórico de migrations
│   └── src/
│       ├── routes/           # auth, products, orders, addresses
│       ├── middleware/       # requireAuth (JWT)
│       ├── data/             # prisma.ts (client) + products.ts (catálogo)
│       └── server.ts
├── supermarket-app/          # Next.js + TypeScript (porta 5175)
│   ├── app/                  # Páginas (App Router)
│   ├── components/           # Header, Navbar, Footer, ProductCard, etc.
│   ├── store/                # Zustand (cart, auth)
│   └── lib/                  # api.ts (cliente HTTP), utils.ts
├── docker-compose.yml        # Container do PostgreSQL
├── iniciar.bat / parar.bat   # Atalhos para subir/parar tudo no Windows
└── package.json              # Scripts que orquestram back + front
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) 20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (para o PostgreSQL)

### 1. Clonar
```bash
git clone https://github.com/SEU-USUARIO/supermercado.git
cd supermercado
```

### 2. Configurar variáveis de ambiente
```bash
# Na raiz (usado pelo docker-compose)
cp .env.example .env

# No backend (JWT + conexão do Prisma)
cp backend/.env.example backend/.env
```
Edite os dois `.env` definindo a **mesma** senha do PostgreSQL. Em `backend/.env`,
ajuste a `DATABASE_URL` (se a senha tiver `@`, escape como `%40`).

### 3. Subir o banco e aplicar as migrations
```bash
docker compose up -d postgres
cd backend
npm install
npx prisma migrate dev      # cria as tabelas
cd ..
```

### 4. Instalar dependências e rodar tudo
```bash
npm install                 # concurrently (raiz)
npm install --prefix supermarket-app
npm run dev                 # sobe backend (5002) + frontend (5175)
```

Acesse **http://localhost:5175**.

> **Windows:** depois do setup inicial, dá para usar `iniciar.bat` (sobe banco + back + front) e `parar.bat` (encerra tudo, inclusive o container).

---

## 🔌 Endpoints da API

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/health` | Status do servidor | – |
| GET | `/api/products` | Listar produtos (filtros: `q`, `department`, `category`, `offer`, `sort`) | – |
| GET | `/api/products/:slug` | Detalhe do produto | – |
| POST | `/api/auth/register` | Cadastrar usuário | – |
| POST | `/api/auth/login` | Login | – |
| GET | `/api/auth/me` | Dados do usuário logado | ✓ |
| GET | `/api/orders` | Listar pedidos | ✓ |
| POST | `/api/orders` | Criar pedido | ✓ |
| PATCH | `/api/orders/:id/cancel` | Cancelar pedido | ✓ |
| GET | `/api/addresses` | Listar endereços | ✓ |
| POST | `/api/addresses` | Adicionar endereço | ✓ |
| DELETE | `/api/addresses/:id` | Remover endereço | ✓ |

---

## 🔒 Segurança

- Senhas com **bcrypt** (custo 12); política de senha forte exigida no **cliente e no servidor**
- **JWT** para sessões; rotas protegidas por middleware
- **Preços e frete recalculados no servidor** — o cliente nunca define o valor a pagar
- **Helmet**, **CORS** restrito à origem do frontend e **rate limiting** (com limite extra anti força-bruta no login)
- Validação e sanitização de entrada; segredos isolados em `.env` (fora do versionamento)

---

## 📸 Screenshots

> Adicione prints da aplicação aqui. Crie uma pasta `docs/` e referencie:
> `![Home](docs/home.png)` · `![Checkout](docs/checkout.png)`

---

## 🗺️ Melhorias futuras

- Mais formas de pagamento (pagar no site x pagar na entrega, vale-alimentação)
- Catálogo de produtos migrado para o banco (CRUD administrativo)
- Painel administrativo de pedidos
- Testes automatizados (unitários e e2e)
- Deploy (Vercel para o front + Railway/Render para o back e o banco)

---

## 👤 Autor

Desenvolvido por **Neemias**.

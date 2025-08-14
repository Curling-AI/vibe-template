# Vibe Template - Full-Stack React + Express.js

Template completo com React 19, TypeScript, Tailwind CSS, Zustand e Backend For Frontend (Express.js 5.0).

## ✨ Stack Principal

**Frontend:** React 19 • TypeScript • Vite • Tailwind CSS • React Router 7 • Zustand • Radix UI
**Backend:** Express.js 5.0 • TypeScript • CORS • Morgan • Helmet
**Auth:** Supabase • OAuth • Magic Links • Session Management
**Ferramentas:** Vitest • ESLint • Prettier • Docker • Traefik

## 🚀 Início Rápido

```bash
# Instalar e executar
npm install
npm run dev              # Frontend + Backend (localhost:5173 + localhost:3001)

# Docker (recomendado)
npm run env:init         # Configurar .env
npm run docker:dev       # Desenvolvimento com Traefik
npm run docker:prod      # Produção com proxy reverso

# Build e testes
npm run build            # Build produção
npm test                 # Executar testes
```

## 📁 Estrutura

```
├── src/                      # Frontend React
│   ├── components/ui/        # Componentes shadcn/ui
│   ├── pages/               # Páginas (Index.tsx, About.tsx)
│   ├── stores/              # Estado global (Zustand + Auth)
│   ├── services/            # API services + Supabase Auth
│   └── App.tsx              # Rotas e providers
├── api/                     # Backend Express.js
│   ├── routes/              # Endpoints (/health, /api/v1/*)
│   ├── middleware/          # CORS, errors, security
│   └── config/              # Configurações centralizadas
├── tests/                   # Testes Vitest
├── docker/                  # Configuração Docker + Traefik
└── .env.default             # Template de configuração
```

## 🎨 Funcionalidades

### Temas Dark/Light

- Alternância automática/manual com `useTheme()` hook
- Persistência no localStorage
- Integração completa com Tailwind CSS

### Estado Global (Zustand)

```tsx
import { useClickStore } from '@/stores/clickStore'
import { useAuthStore } from '@/stores/authStore'

const { clicks, updateClicks, isLoading } = useClickStore()
const { user, login, logout, isAuthenticated } = useAuthStore()
```

### Componentes UI (shadcn/ui + Radix)

- Button, Dialog, Layout, ThemeToggle
- Totalmente acessíveis e tipados
- Variantes com CVA (Class Variance Authority)

### Autenticação (Supabase)

```tsx
import { useAuthStore } from '@/stores/authStore'

// Login/logout, OAuth providers, session management
const { login, logout, user, isAuthenticated } = useAuthStore()
```

**Funcionalidades:** Login/SignUp • OAuth (Google, GitHub) • Magic Links • Password Reset • Session Persistence

## 🔧 Backend (Express.js 5.0)

**Endpoints disponíveis:**

- `GET /health` - Health check
- `GET /api/v1/clicks` - Contador de clicks

**Configuração:**

- CORS, Helmet, Morgan integrados
- Hot reload com Nodemon
- Configurações via `.env` (PORT, FRONTEND_URL, VITE_SUPABASE_URL, etc.)

## 🐳 Docker + Traefik

**Início rápido:**

```bash
npm run env:init         # Configurar .env
npm run docker:dev       # Desenvolvimento (localhost:5173)
npm run docker:prod      # Produção com proxy (localhost)
```

**URLs de acesso:**

- Frontend: `http://localhost` (prod) | `http://localhost:5173` (dev)
- API: `http://api.localhost` (prod) | `http://localhost:3001` (dev)
- Traefik: `http://localhost:8080` (apenas prod)

**Funcionalidades:**

- Multi-stage builds otimizados
- Proxy reverso automático (Traefik)
- SSL/HTTPS com Let's Encrypt
- Hot reload em desenvolvimento

📖 **Documentação completa:** [docker/DOCKER.md](./docker/DOCKER.md)

## 🧪 Testes (Vitest + Supertest)

**Cobertura:** API endpoints, Services, Stores Zustand, Supabase Auth
**Frameworks:** Vitest 3.2.4 + Supertest 7.1.4 + Mocks automáticos

```bash
npm test                 # Executar todos os testes
npm run test:watch       # Modo watch
npm run test:coverage    # Com coverage
```

**Estrutura:**

- `tests/api/` - Testes dos endpoints Express.js
- `tests/app/services/` - Testes dos serviços de API + Auth
- `tests/app/stores/` - Testes das stores Zustand + Auth

## 📋 Scripts

```bash
# Setup e envs
npm run env:init         # Configurar .env
npm run env:local        # Configurar ambiente local
npm run env:staging      # Configurar staging
npm run env:production   # Configurar produção

# Desenvolvimento
npm run dev              # Frontend + Backend
npm run dev:frontend     # Apenas frontend (5173)
npm run dev:api          # Apenas backend (3001)

# Build e produção
npm run build            # Build frontend
npm start                # Rodar em produção
npm run preview          # Preview do build

# Docker
npm run docker:dev       # Desenvolvimento
npm run docker:prod      # Produção
npm run docker:prod:ssl  # Produção com SSL

# Qualidade
npm test                 # Testes
npm run lint             # ESLint
npm run format           # Prettier
```

## 🛠️ Tecnologias

**Frontend:** React 19 • TypeScript • Vite • Tailwind CSS • React Router 7 • Zustand • Radix UI
**Backend:** Express.js 5.0 • TypeScript • Helmet • Morgan • CORS
**Auth:** Supabase • OAuth • Magic Links • Session Management
**Testes:** Vitest • Supertest • Mocks
**Ferramentas:** ESLint • Prettier • Husky • Docker • Traefik

---

📄 **Licença:** MIT

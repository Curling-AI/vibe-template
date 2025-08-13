# Vibe Template - React + TypeScript + Vite + Tailwind CSS + Express.js

Este template fornece uma configuração completa para desenvolvimento React com suporte a temas dark/light, roteamento, componentes modernos, gerenciamento de estado com Zustand e um Backend For Frontend (BFF) com Express.js 5.0.

## ✨ Funcionalidades

### Frontend

- ⚡ **Vite** - Build tool rápido e moderno (Rolldown Vite)
- ⚛️ **React 19** - Biblioteca para interfaces de usuário
- 🏷️ **TypeScript** - Tipagem estática
- 🎨 **Tailwind CSS 3** - Framework CSS utilitário
- 🌙 **Tema Dark/Light** - Alternância automática e manual
- 🧭 **React Router 7** - Roteamento client-side
- 🎯 **Radix UI** - Componentes acessíveis e primitivos
- 📱 **Responsivo** - Interface adaptável
- 🗃️ **Zustand** - Gerenciamento de estado simples e eficiente
- 🎨 **CVA** - Class Variance Authority para variantes de componentes

### Backend (BFF)

- 🚀 **Express.js 5.0** - Framework web moderno
- 🔒 **TypeScript** - Tipagem estática no backend
- 🛡️ **Segurança** - Middlewares de proteção (Helmet, CORS)
- 📊 **Logs** - Sistema de logging com Morgan
- ⚡ **Performance** - Compressão e otimizações
- 🔄 **Hot Reload** - Desenvolvimento com Nodemon
- 🩺 **Health Check** - Endpoints de monitoramento

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev              # Frontend + Backend simultaneamente
npm run dev:frontend     # Apenas frontend (porta 5173)
npm run dev:api          # Apenas backend (porta 3001)

# Build para produção
npm run build            # Build do frontend

# Executar aplicação
npm start                # Frontend + Backend em produção
npm run start:frontend   # Preview do frontend
npm run start:api        # Executar backend compilado

# Outros comandos
npm run preview          # Preview do build do frontend
npm run lint             # Verificar código com ESLint
npm run format           # Formatar código com Prettier
```

## 📁 Estrutura do Projeto

```
├── src/                      # Frontend
│   ├── assets/               # Recursos estáticos
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes base (Button, etc.)
│   │   ├── ThemeToggle.tsx  # Botão alternador de tema
│   │   ├── UserCard.tsx     # Card de usuário
│   │   ├── UserForm.tsx     # Formulário de usuário
│   │   └── UserStatusWidget.tsx # Widget de status
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilitários (cn, utils.ts)
│   ├── pages/               # Páginas da aplicação
│   │   ├── Index.tsx        # Página inicial
│   │   ├── About.tsx        # Página sobre
│   │   └── Users.tsx        # Página de usuários
│   ├── providers/           # Context providers
│   │   └── ThemeProvider.tsx # Contexto do tema
│   ├── services/            # Serviços de API
│   ├── stores/              # Stores Zustand
│   │   ├── index.ts         # Configuração das stores
│   │   └── userStore.ts     # Store de usuários
│   ├── App.tsx              # Configuração de rotas
│   ├── main.tsx             # Ponto de entrada
│   ├── index.css            # Estilos globais
│   └── vite-env.d.ts        # Tipos do Vite
│
├── api/                      # Backend (BFF)
│   ├── config/              # Configurações da aplicação
│   │   └── index.ts         # Configurações centralizadas
│   ├── middleware/          # Middlewares customizados
│   ├── routes/              # Definição das rotas
│   │   ├── health.ts        # Endpoints de health check
│   │   └── api.ts           # Rotas da API
│   ├── app.ts               # Configuração da aplicação Express
│   └── index.ts             # Ponto de entrada do servidor
│
├── public/                  # Arquivos públicos
├── dist/                    # Arquivos compilados (gerado)
├── components.json          # Configuração shadcn/ui
├── tailwind.config.js       # Configuração Tailwind CSS
├── tsconfig.json            # Configuração TypeScript (raiz)
├── tsconfig.api.json        # Configuração TypeScript (API)
├── tsconfig.app.json        # Configuração TypeScript (App)
├── vite.config.ts           # Configuração Vite
├── nodemon.json             # Configuração Nodemon
└── package.json             # Dependências e scripts
```

## 🎨 Sistema de Temas

O projeto inclui um sistema completo de temas com:

- **Tema automático**: Detecta preferência do sistema
- **Tema manual**: Alternância via botão
- **Persistência**: Salva preferência no localStorage
- **Variáveis CSS**: Cores customizáveis
- **Tailwind integrado**: Classes dark: automáticas

### Usar o Hook de Tema

```tsx
import { useTheme } from '@/hooks/useTheme'

function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Alternar tema</button>
  )
}
```

## 🗃️ Gerenciamento de Estado

O projeto utiliza **Zustand** para gerenciamento de estado global, proporcionando uma solução simples e eficiente.

### Funcionalidades do Zustand

- **API simples**: Sem boilerplate excessivo
- **TypeScript**: Suporte nativo e tipagem robusta
- **Performance**: Renderizações otimizadas
- **DevTools**: Integração com Redux DevTools
- **Persistência**: Dados salvos no localStorage

### Exemplo de Uso

```tsx
import { useUserStore } from '@/stores/userStore'

function UserComponent() {
  const { users, addUser, updateUser } = useUserStore()

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## 🧭 Roteamento

O projeto usa React Router v7 com:

- **Páginas**: `Index` (/), `About` (/about) e `Users` (/users)
- **Navegação**: Links com `react-router-dom`
- **Estrutura**: Páginas organizadas em `src/pages/`

## 🎯 Componentes UI

Baseados em Radix UI com Tailwind CSS:

- **Button**: Múltiplas variantes e tamanhos
- **ThemeToggle**: Botão para alternar tema
- **Tipagem**: TypeScript completo
- **Acessibilidade**: Suporte a teclado e screen readers

## 🔧 Backend (BFF)

O projeto inclui um Backend For Frontend (BFF) completo com Express.js 5.0.

### Funcionalidades

- **Express.js 5.0** - Framework web moderno
- **TypeScript** - Tipagem estática para JavaScript
- **CORS configurado** - Para comunicação com o frontend
- **Middlewares de segurança** - Helmet para proteção básica
- **Compressão** - Otimização de responses
- **Logging** - Morgan para logs de requisições
- **Tratamento de erros** - Middleware centralizado
- **Hot reload** - Nodemon para desenvolvimento

### Configuração

As configurações são gerenciadas através do arquivo `api/config/index.ts` e variáveis de ambiente:

- **`PORT`** - Porta do servidor (padrão: 3001)
- **`NODE_ENV`** - Ambiente de execução (development/production)
- **`FRONTEND_URL`** - URL do frontend para CORS (padrão: http://localhost:5173)
- **`API_PREFIX`** - Prefixo das rotas da API (padrão: /api/v1)

### Endpoints Disponíveis

#### Health Check

- `GET /health` - Status do servidor
- `GET /info` - Informações da aplicação

#### API de Exemplo

- `GET /api/v1/users` - Listar usuários
- `GET /api/v1/users/:id` - Obter usuário por ID
- `POST /api/v1/users` - Criar novo usuário

### Desenvolvimento Backend

O backend está integrado ao projeto principal e usa o nodemon para hot reload automático. Não há necessidade de navegar para uma pasta separada ou instalar dependências separadamente.

```bash
# Desenvolvimento do backend (apenas)
npm run dev:api         # Inicia o backend na porta 3001

# Backend é compilado junto com o build do frontend
npm run build           # Compila TypeScript para dist/
```

O servidor será iniciado na porta 3001 (ou na porta definida na variável PORT) com hot reload automático através do nodemon.

### Logs e Segurança

- **Logs**: A aplicação utiliza Morgan para logging de requisições HTTP
- **Segurança**:
  - Helmet para headers de segurança básicos
  - CORS configurado para aceitar apenas origins específicas
  - Rate limiting pode ser adicionado futuramente
  - Validação de entrada deve ser implementada conforme necessário

## 📋 Scripts Disponíveis

### Scripts Principais (Raiz do Projeto)

```bash
# Desenvolvimento
npm start               # Frontend + Backend em produção (start:full)
npm run dev             # Frontend + Backend simultaneamente (dev:full)
npm run dev:frontend    # Apenas frontend (Vite - porta 5173)
npm run dev:api         # Apenas backend (Express - porta 3001)

# Build
npm run build           # Build do frontend (TypeScript + Vite)

# Execução
npm run start:frontend  # Preview do frontend compilado
npm run start:api       # Executar backend compilado
npm run start:full      # Frontend + Backend em produção

# Qualidade de Código
npm run lint            # Verificar código com ESLint
npm run format          # Formatar código com Prettier
npm run preview         # Preview do build do frontend

# Git Hooks
npm run prepare         # Configurar Husky (hooks automáticos)
```

### Comandos de Desenvolvimento

```bash
# Desenvolvimento completo (recomendado)
npm run dev             # Inicia frontend + backend com hot reload

# Desenvolvimento separado
npm run dev:frontend    # Vite dev server (localhost:5173)
npm run dev:api         # Backend com nodemon (localhost:3001)

# Build e teste
npm run build           # Compila o frontend
npm run preview         # Testa o build localmente
```

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React** 19.1.1 - Biblioteca para interfaces de usuário
- **TypeScript** 5.9.2 - Tipagem estática para JavaScript
- **Vite** (Rolldown Vite 7.1.2) - Build tool rápido e moderno
- **Tailwind CSS** 3.4.17 - Framework CSS utilitário
- **React Router** 7.8.0 - Roteamento client-side
- **Zustand** 5.0.7 - Gerenciamento de estado
- **Radix UI** 1.2.3 - Componentes primitivos acessíveis
- **Lucide React** 0.539.0 - Biblioteca de ícones
- **Class Variance Authority** 0.7.1 - Gestão de variantes
- **Tailwind Merge** 3.3.1 - Utilitário para classes CSS
- **CVA** - Class Variance Authority para componentes

### Backend

- **Express.js** 5.1.0 - Framework web moderno
- **TypeScript** 5.9.2 - Tipagem estática no backend
- **Node.js** - Runtime JavaScript
- **Helmet** 8.1.0 - Middlewares de segurança
- **Morgan** 1.10.1 - Logger HTTP
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **Compression** 1.8.1 - Compressão de responses

### Ferramentas de Desenvolvimento

- **ESLint** 9.33.0 - Linter para JavaScript/TypeScript
- **Prettier** 3.6.2 - Formatador de código
- **Husky** 9.1.7 - Git hooks
- **Lint-staged** 16.1.5 - Linting em arquivos staged
- **Concurrently** 9.2.0 - Execução paralela de scripts
- **Nodemon** 3.1.10 - Hot reload para desenvolvimento
- **TSX** 4.20.4 - Executor TypeScript

## 📄 Licença

Este projeto está sob a licença MIT.

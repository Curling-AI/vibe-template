# Vibe Template - React + TypeScript + Vite + Tailwind CSS + Express.js

Este template fornece uma configuração completa para desenvolvimento React com suporte a temas dark/light, roteamento, componentes modernos e um Backend For Frontend (BFF) com Express.js 5.0.

## ✨ Funcionalidades

### Frontend

- ⚡ **Vite** - Build tool rápido e moderno
- ⚛️ **React 19** - Biblioteca para interfaces de usuário
- 🏷️ **TypeScript** - Tipagem estática
- 🎨 **Tailwind CSS 3** - Framework CSS utilitário
- 🌙 **Tema Dark/Light** - Alternância automática e manual
- 🧭 **React Router** - Roteamento client-side
- 🎯 **Radix UI** - Componentes acessíveis
- 📱 **Responsivo** - Interface adaptável

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
# Instalar dependências (raiz)
npm install

# Instalar dependências do backend
cd backend && npm install && cd ..

# Desenvolver apenas frontend
npm run dev

# Desenvolver apenas backend
npm run dev:backend

# Desenvolver frontend + backend simultaneamente
npm run dev:full

# Build para produção
npm run build:full

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
├── src/                    # Frontend
│   ├── components/
│   │   ├── ui/            # Componentes base (Button, etc.)
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   └── useTheme.ts    # Hook para gerenciar tema
│   ├── lib/
│   │   └── utils.ts       # Utilitários (cn, etc.)
│   ├── pages/
│   │   ├── Index.tsx      # Página inicial
│   │   └── About.tsx      # Página sobre
│   ├── providers/
│   │   └── ThemeProvider.tsx  # Contexto do tema
│   ├── App.tsx            # Configuração de rotas
│   ├── main.tsx           # Ponto de entrada
│   └── index.css          # Estilos globais e variáveis CSS
│
└── backend/                # Backend (BFF)
    ├── src/
    │   ├── config/         # Configurações da aplicação
    │   ├── controllers/    # Controladores da API
    │   ├── middleware/     # Middlewares customizados
    │   ├── routes/         # Definição das rotas
    │   ├── services/       # Lógica de negócio
    │   ├── types/          # Tipos TypeScript customizados
    │   ├── app.ts          # Configuração da aplicação Express
    │   └── index.ts        # Ponto de entrada do servidor
    ├── dist/               # Arquivos compilados (gerado)
    ├── package.json        # Configurações do npm (backend)
    ├── tsconfig.json       # Configurações do TypeScript (backend)
    └── README.md           # Documentação do backend
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

## 🧭 Roteamento

O projeto usa React Router v7 com:

- **Páginas**: `Index` (/) e `About` (/about)
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

### Configuração

- **Porta**: 3001 (configurável via `PORT`)
- **CORS**: Configurado para o frontend (porta 5173)
- **TypeScript**: Suporte completo
- **Hot Reload**: Desenvolvimento com Nodemon

### Endpoints Disponíveis

- `GET /health` - Status do servidor
- `GET /info` - Informações da aplicação
- `GET /api/v1/users` - Listar usuários (exemplo)
- `GET /api/v1/users/:id` - Obter usuário por ID
- `POST /api/v1/users` - Criar usuário

### Para mais detalhes

Consulte a [documentação completa do backend](./backend/README.md).

## 📋 Scripts Disponíveis

### Scripts Globais

- `npm run dev:full` - Frontend + Backend simultaneamente
- `npm run dev:frontend` - Apenas frontend (Vite)
- `npm run dev:backend` - Apenas backend (Express)
- `npm run build:full` - Build frontend + backend
- `npm run build:backend` - Build apenas backend

### Scripts Frontend

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Verificar código com ESLint

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React** 19.1.0
- **TypeScript** 5.8.3
- **Vite** 6.3.5
- **Tailwind CSS** 3.4.17
- **React Router** 7.6.2
- **Radix UI** - Componentes primitivos
- **Lucide React** - Ícones
- **Class Variance Authority** - Gestão de variantes

### Backend

- **Express.js** 5.0.1
- **TypeScript** 5.7.3
- **Node.js** - Runtime JavaScript
- **Helmet** - Middlewares de segurança
- **Morgan** - Logger HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Compression** - Compressão de responses

## 📄 Licença

Este projeto está sob a licença MIT.

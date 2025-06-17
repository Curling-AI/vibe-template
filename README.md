# Vibe Template - React + TypeScript + Vite + Tailwind CSS

Este template fornece uma configuração completa para desenvolvimento React com suporte a temas dark/light, roteamento e componentes modernos.

## ✨ Funcionalidades

- ⚡ **Vite** - Build tool rápido e moderno
- ⚛️ **React 19** - Biblioteca para interfaces de usuário
- 🏷️ **TypeScript** - Tipagem estática
- 🎨 **Tailwind CSS 3** - Framework CSS utilitário
- 🌙 **Tema Dark/Light** - Alternância automática e manual
- 🧭 **React Router** - Roteamento client-side
- 🎯 **Radix UI** - Componentes acessíveis
- 📱 **Responsivo** - Interface adaptável

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/           # Componentes base (Button, etc.)
│   └── ThemeToggle.tsx
├── hooks/
│   └── useTheme.ts   # Hook para gerenciar tema
├── lib/
│   └── utils.ts      # Utilitários (cn, etc.)
├── pages/
│   ├── Index.tsx     # Página inicial
│   └── About.tsx     # Página sobre
├── providers/
│   └── ThemeProvider.tsx  # Contexto do tema
├── App.tsx           # Configuração de rotas
├── main.tsx          # Ponto de entrada
└── index.css         # Estilos globais e variáveis CSS
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
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Alternar tema
    </button>
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

## 📋 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Verificar código com ESLint

## 🛠️ Tecnologias Utilizadas

- **React** 19.1.0
- **TypeScript** 5.8.3
- **Vite** 6.3.5
- **Tailwind CSS** 3.4.17
- **React Router** 7.6.2
- **Radix UI** - Componentes primitivos
- **Lucide React** - Ícones
- **Class Variance Authority** - Gestão de variantes

## 📄 Licença

Este projeto está sob a licença MIT.

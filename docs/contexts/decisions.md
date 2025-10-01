# Decisões Arquiteturais

## Estado Global - Zustand

**Decisão**: Usar Zustand para gerenciamento de estado global
**Data**: Implementação inicial
**Razão**:

- Simplicidade e performance superior ao Redux
- TypeScript nativo
- Menor boilerplate
- Melhor DevTools

**Padrão Estabelecido**:

```typescript
// Estrutura padrão das stores
interface StoreState {
  // Estado
  data: Type
  isLoading: boolean
  error: string | null

  // Ações
  fetchData: () => Promise<void>
  resetError: () => void
}
```

## Autenticação - Supabase

**Decisão**: Supabase para autenticação completa
**Data**: Implementação inicial
**Razão**:

- OAuth providers integrados
- Magic links out-of-the-box
- Session management automático
- TypeScript support nativo

**Padrão Estabelecido**:

- Store `authStore` centralizada
- Inicialização no `App.tsx`
- Persistência automática de sessão

## Componentes UI - shadcn/ui

**Decisão**: shadcn/ui como base dos componentes
**Data**: Setup inicial
**Razão**:

- Componentes acessíveis (Radix UI)
- Customização total com Tailwind
- TypeScript nativo
- Copy/paste approach (não biblioteca)

**Padrão Estabelecido**:

- Verificar `src/components/ui/` antes de criar novos componentes
- Usar variantes com CVA para customização
- Manter acessibilidade (ARIA, keyboard navigation)

## Estrutura de Testes

**Decisão**: Testar apenas API, Services e Stores
**Data**: Setup inicial
**Razão**:

- Foco no core business logic
- Evitar testes frágeis de UI
- Manter cobertura eficiente

**Padrão Estabelecido**:

- `tests/api/` - Endpoints com Supertest
- `tests/app/services/` - Lógica de negócio
- `tests/app/stores/` - Estado global
- Mocks com `vi.mock()` para dependências externas

## Docker + Traefik

**Decisão**: Traefik como proxy reverso
**Data**: Setup inicial
**Razão**:

- SSL automático (Let's Encrypt)
- Roteamento dinâmico
- Load balancing
- Dashboard de monitoramento

**Padrão Estabelecido**:

- Ambiente dev: `npm run docker:dev`
- Ambiente prod: `npm run docker:prod`
- SSL prod: `npm run docker:prod:ssl`

## CI/CD - GitHub Actions

**Decisão**: Workflows automáticos para CI/CD
**Data**: Setup GitHub Actions
**Razão**:

- Integração nativa com GitHub
- Matrix testing (Node.js 20.x/22.x)
- Deploy automático para staging
- Qualidade de código automatizada

**Padrão Estabelecido**:

- Push main → CI + Deploy staging
- Pull Request → CI + Code Quality + Performance
- Deploy manual para produção
- Dependabot para atualizações

---

## Variáveis de Ambiente para Testes

**Decisão**: Usar fallbacks automáticos no CI/CD
**Data**: Correção GitHub Actions
**Razão**:

- CI/CD não deve depender de arquivos .env
- Fallbacks garantem testes funcionais
- Flexibilidade entre desenvolvimento local e CI

**Padrão Estabelecido**:

- `vite.config.ts` - Variáveis no config do Vitest
- `tests/setup.ts` - Mock do import.meta.env com vi.stubGlobal
- Fallbacks: VITE_API_BASE_URL=http://localhost:3001
- Variáveis de teste não conflitam com produção

---

_Atualize este arquivo sempre que tomar decisões arquiteturais importantes._

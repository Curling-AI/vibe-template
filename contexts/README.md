# Contexto para Assistentes AI

Este diretório armazena contexto e planejamento para desenvolvimento contínuo com assistentes de IA.

## 🎯 Propósito

- **Continuidade**: Manter contexto entre sessões de desenvolvimento
- **Histórico**: Documentar decisões arquiteturais e implementações
- **Planejamento**: Organizar features, refatorações e melhorias futuras
- **Padrões**: Estabelecer convenções específicas do projeto

## 📝 Como Usar

### 1. **Arquivos de Contexto**

Crie arquivos `.md` para diferentes contextos:

```bash
contexts/
├── feature-[nome].md        # Contexto de features específicas
├── refactor-[area].md       # Planejamento de refatorações
├── bug-[id].md             # Contexto de bugs complexos
├── decisions.md            # Decisões arquiteturais
└── patterns.md             # Padrões estabelecidos
```

### 2. **Template de Feature**

```markdown
# Feature: [Nome da Feature]

## Status: [Planejamento|Em Desenvolvimento|Concluída]

## Contexto

- Problema a resolver
- Requisitos principais
- Dependências

## Implementação

- [ ] Tarefa 1
- [ ] Tarefa 2
- [ ] Testes

## Notas Técnicas

- Decisões importantes
- Padrões utilizados
- Problemas encontrados
```

### 3. **Template de Refatoração**

```markdown
# Refatoração: [Área/Componente]

## Motivação

- Problemas atuais
- Benefícios esperados

## Plano

1. Análise atual
2. Estratégia de migração
3. Testes de regressão

## Progresso

- [ ] Fase 1
- [ ] Fase 2
- [ ] Validação
```

## 🔍 Benefícios

### **Para Assistentes AI**

- Compreensão imediata do contexto do projeto
- Continuidade entre sessões diferentes
- Acesso ao histórico de decisões

### **Para Desenvolvedores**

- Documentação viva do projeto
- Histórico de evoluções
- Onboarding facilitado

## 📋 Boas Práticas

1. **Mantenha atualizado**: Atualize os arquivos após mudanças significativas
2. **Seja específico**: Inclua detalhes técnicos relevantes
3. **Use markdown**: Formatação clara e links quando necessário
4. **Versionamento**: Inclua no git para histórico completo

## 🤖 Integração com AI

Os assistentes de IA devem:

1. **Sempre consultar** este diretório antes de implementar features
2. **Atualizar contextos** após mudanças importantes
3. **Seguir padrões** estabelecidos nos arquivos de contexto
4. **Documentar decisões** tomadas durante o desenvolvimento

---

_Este diretório é essencial para manter a consistência e qualidade do desenvolvimento com assistentes de IA._

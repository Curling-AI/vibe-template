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
docs/contexts/
├── feature-[nome].md        # Contexto de features específicas
├── refactor-[area].md       # Planejamento de refatorações
├── bug-[id].md             # Contexto de bugs complexos
├── decisions.md            # Decisões arquiteturais
└── patterns.md             # Padrões estabelecidos
```

### 2. **Contexto de Ferramentas Específicas**

#### Cursor

O Cursor é o assistente AI principal deste projeto, e sua atuação é guiada por regras detalhadas localizadas no diretório `.cursor/`. Os arquivos `.cursor/rules/*.mdc` definem padrões obrigatórios de arquitetura, estilo, testes, uso de Zustand, integração com Supabase, entre outros.
**Como integrar com contextos:**

- Sempre consulte os arquivos de contexto em `docs/contexts/` antes de executar qualquer tarefa.
- As regras do Cursor têm precedência, mas devem ser aplicadas em harmonia com decisões e padrões documentados nos contextos.
- Ao implementar novas features ou refatorações, registre decisões relevantes em `decisions.md` ou crie um novo arquivo de contexto.
- Se houver conflito entre regras do Cursor e contexto, registre o caso em `decisions.md` para revisão.

#### Claude.md / Agents.md / Gemini.md

Esses arquivos servem para documentar o uso e integração de outros agentes de IA no projeto.

- **Claude.md**:
  Documente práticas, limitações e instruções específicas para uso do Claude, seguindo referências como [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices). Inclua exemplos de prompts, padrões de resposta e integração com o fluxo do projeto.

- **Agents.md**:
  Use para registrar diretrizes gerais de integração de múltiplos agentes, inspirando-se em modelos como [agents.md](https://agents.md/). Detalhe como diferentes agentes devem colaborar, dividir tarefas e compartilhar contexto.

- **Gemini.md**:
  Especifique particularidades, comandos e melhores práticas para uso do Gemini, incluindo exemplos de integração e limitações conhecidas.

Mantenha esses arquivos atualizados para garantir colaboração eficiente, rastreabilidade e padronização no uso de múltiplos assistentes AI.

### 3. **Template de Feature**

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

### 4. **Template de Refatoração**

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

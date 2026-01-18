# mycash+ — Documentação

## 📊 Progresso

- [x] PROMPT 0: Análise e Planejamento Inicial
- [x] PROMPT 1: Estrutura Base e Configuração
- [ ] PROMPT 2: Sistema de Layout e Navegação Desktop
- [ ] PROMPT 3: Sistema de Layout e Navegação Mobile
- [ ] PROMPT 4: Context Global e Gerenciamento de Estado
- [ ] PROMPT 5: Cards de Resumo Financeiro
- [ ] PROMPT 6: Header do Dashboard com Controles
- [ ] PROMPT 7: Carrossel de Gastos por Categoria
- [ ] PROMPT 8: Gráfico de Fluxo Financeiro
- [ ] PROMPT 9: Widget de Cartões de Crédito
- [ ] PROMPT 10: Widget de Próximas Despesas
- [ ] PROMPT 11: Tabela de Transações Detalhada
- [ ] PROMPT 12: Modal de Nova Transação
- [ ] PROMPT 13: Modal de Adicionar Membro
- [ ] PROMPT 14: Modal de Adicionar Cartão
- [ ] PROMPT 15: Modal de Detalhes do Cartão
- [ ] PROMPT 16: Modal de Filtros Mobile
- [ ] PROMPT 17: View Completa de Cartões
- [ ] PROMPT 18: View Completa de Transações
- [ ] PROMPT 19: View de Perfil - Aba Informações
- [ ] PROMPT 20: View de Perfil - Aba Configurações
- [ ] PROMPT 21: Animações e Transições Globais
- [ ] PROMPT 22: Formatação e Utilitários
- [ ] PROMPT 23: Responsividade e Ajustes Finais
- [ ] PROMPT 24: Testes e Validação Final
- [ ] PROMPT FINAL: Revisão e Entrega

---

## ✅ PROMPT 0: Análise e Planejamento Inicial

**Status:** ✅ CONCLUÍDO  
**Data:** DD/MM/YYYY  
**Build:** N/A (análise)

### Análise Realizada

#### 1. Componentes Identificados

**Dashboard:**
- Cards de métricas (saldo, receitas, despesas)
- Gráficos de resumo financeiro
- Lista de transações recentes
- Filtros e controles de período

**Cartões:**
- Grid/lista de cartões cadastrados
- Card individual (bandeira, número, titular)
- Formulário de cadastro/edição
- Ações (ativar, desativar, excluir)

**Transações:**
- Lista/tabela de transações
- Filtros (tipo, período, categoria)
- Formulário de criação/edição
- Paginação/infinite scroll

**Perfil:**
- Formulário de dados pessoais
- Preferências/configurações
- Alteração de senha
- Sessão/logout

#### 2. Tokens Identificados (da Planilha)

**Cores Primitivas:**
- `color/neutral/0` até `color/neutral/1100` (12 tons de cinza)
- `color/brand/100` até `color/brand/1000` (cores da marca - verde/amarelo)
- `color/purple/100` até `color/purple/1000`
- `color/green/100` até `color/green/1000`
- `color/blue/100` até `color/blue/1000`

**Espaçamentos:**
- `space/0` = 0
- `space/2` = 2px
- `space/4` = 4px
- `space/6` = 6px
- `space/8` = 8px
- `space/12` = 12px
- `space/16` = 16px
- *(provavelmente mais: space/20, space/24, space/32, etc.)*

**Nota:** Tipografia e outras propriedades devem ser extraídas do Figma durante implementação.

#### 3. Estrutura de Navegação

**Desktop (≥1280px):**
- Sidebar fixa à esquerda
  - Estado **expanded**: largura completa com textos
  - Estado **collapsed**: largura reduzida, apenas ícones
  - Empurra conteúdo (não sobrepõe)

**Mobile/Tablet (<1280px):**
- Sidebar **não renderizada**
- HeaderMobile no topo
  - Botão menu (abre drawer)
  - Ações principais
- Drawer de navegação como overlay

#### 4. Arquitetura Proposta

```
src/
├── components/
│   ├── ui/              # Componentes base
│   ├── layout/          # Sidebar, HeaderMobile, MainLayout
│   ├── dashboard/       # Componentes específicos Dashboard
│   ├── transactions/    # Componentes específicos Transações
│   ├── cards/           # Componentes específicos Cartões
│   └── profile/         # Componentes específicos Perfil
├── pages/               # Páginas (apenas composição)
├── hooks/               # Lógica de negócio reutilizável
├── services/            # Supabase integration
├── styles/              # Tokens e estilos globais
├── types/               # TypeScript types
└── utils/               # Funções utilitárias
```

### Tokens Identificados

**Fonte:** [Planilha Google Sheets](https://docs.google.com/spreadsheets/d/1icfTxXdSbtd029FfOYnrlMs2pC8HJqk5PDuEmQF5Zjo/edit)

**Cores Primitivas:**
- Neutral: 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100
- Brand: 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
- Purple, Green, Blue: 100-1000 (escala similar)

**Espaçamentos:**
- 0, 2, 4, 6, 8, 12, 16 (valores em px, escala continua provavelmente)

### Conversões Realizadas

*Nenhuma ainda - aguardando implementação dos prompts seguintes.*

---

## ✅ PROMPT 1: Estrutura Base e Configuração

**Status:** ✅ CONCLUÍDO  
**Data:** DD/MM/YYYY  
**Build:** ✅ Sucesso (tentativas: 2)

### Implementado

- Projeto Vite + React + TypeScript configurado
- Estrutura de pastas criada (components, contexts, hooks, pages, services, styles, types, utils, constants)
- Tailwind CSS configurado com integração de tokens
- Tipos TypeScript criados (Transaction, Goal, CreditCard, BankAccount, FamilyMember)
- React Router configurado com 5 rotas principais (SPA)
- Tokens CSS mapeados no `tokens.css`
- Tailwind configurado para usar variáveis CSS dos tokens
- Arquivos de configuração (tsconfig.json, vite.config.ts, postcss.config.js, .eslintrc.cjs)
- README.md criado

### Tokens

**Primitivas:**
- Cores: neutral (0-1100), brand (100-1000), purple, green, blue (100-1000 cada)
- Espaçamentos: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64 (px)

**Semânticas:**
- `--color-bg-primary`, `--color-bg-secondary`
- `--color-text-primary`, `--color-text-secondary`
- `--color-border`
- `--spacing-page`, `--spacing-container`, `--spacing-section`

### Conversões Realizadas

*Nenhuma - apenas estruturação e mapeamento de tokens primitivos.*

### Arquivos Criados

**Configuração:**
- `package.json`
- `tsconfig.json`, `tsconfig.node.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `.eslintrc.cjs`
- `.gitignore`
- `index.html`

**Tipos TypeScript:**
- `src/types/transaction.ts`
- `src/types/goal.ts`
- `src/types/creditCard.ts`
- `src/types/bankAccount.ts`
- `src/types/familyMember.ts`
- `src/types/index.ts`

**Estilos:**
- `src/styles/globals.css`
- `src/styles/tokens.css`

**Código:**
- `src/main.tsx`
- `src/App.tsx`
- `src/vite-env.d.ts`
- `src/constants/index.ts`

**Estrutura de Pastas:**
- `src/components/.gitkeep`
- `src/contexts/.gitkeep`
- `src/hooks/.gitkeep`
- `src/pages/.gitkeep`
- `src/services/.gitkeep`
- `src/utils/.gitkeep`

**Documentação:**
- `README.md`

### Build

✅ **Sucesso (tentativas: 2)**

**Correções aplicadas:**
- Removido `@apply border-border` inválido do `globals.css` (substituído por `border-neutral-300`)
- Dependências instaladas com sucesso (250 pacotes)
- Build final: `dist/index.html` (0.50 kB), CSS (7.13 kB), JS (162.58 kB)

### Observações

- Estrutura de pastas criada seguindo arquitetura proposta no PROMPT 0
- Tokens CSS mapeados da planilha Google Sheets
- Tailwind configurado para usar variáveis CSS (referência aos tokens)
- Tipos TypeScript completos e tipados conforme especificações
- React Router configurado com 5 rotas (Dashboard, Transactions, Cards, Goals, Profile)
- Componentes placeholder criados nas rotas (serão implementados nos próximos prompts)

---

## 🔗 Links de Referência

- **Figma Dashboard Principal:** https://www.figma.com/design/M056Ejtk50NYDYiZ4YrpkV/Workshop---Do-figma-MCP-ao-Cursor-AI-v.2--Community-?node-id=2004-5647&t=KBwximgGq2VK0MSp-4
- **Tokens (Google Sheets):** https://docs.google.com/spreadsheets/d/1icfTxXdSbtd029FfOYnrlMs2pC8HJqk5PDuEmQF5Zjo/edit
- **Documentação:** https://docs.google.com/document/d/1s-KKXi3hROSBsgfxXOKpeMOxD318U7z9hSJ0UiIRT4Q/edit

---

## 📝 Notas de Implementação

### Regras Críticas

1. **Hierarquia de Variáveis:**
   - 1º: Variável semântica (se existir no Figma)
   - 2º: Variável primitiva (se existir no Figma)
   - 3º: Conversão inteligente (valor → token mais próximo)
   - ❌ Nunca usar valores hardcoded

2. **Layout Fluido:**
   - Containers principais: `width: 100%` (NUNCA fixo)
   - Limitação: usar `max-width`, nunca `width`
   - Frames do Figma = wrappers fluidos, não containers fixos

3. **Responsividade:**
   - Mobile-first approach
   - Breakpoints: `md: 768px`, `lg: 1280px`, `xl: 1920px`
   - Sidebar só existe no desktop (≥1280px)
   - HeaderMobile só existe em mobile/tablet (<1280px)

4. **Testes Obrigatórios:**
   - 375px (mobile pequeno)
   - 768px (tablet)
   - 1280px (desktop)
   - 1920px (wide)

---

*Documentação atualizada automaticamente após cada prompt.*

# 🎯 Sequência de Prompts - mycash+ Dashboard

Documento central para registrar todos os prompts de implementação do projeto mycash+.

---

## 📋 PROMPT 0: Análise e Planejamento Inicial

**Status:** ✅ CONCLUÍDO  
**Resumo:** Análise completa do projeto, mapeamento de componentes, tokens e arquitetura proposta.

**Tarefas:**
- Acessar design do Figma via MCP
- Identificar componentes visuais (Dashboard, Cartões, Transações, Perfil)
- Mapear hierarquia visual e relação entre componentes
- Identificar variáveis semânticas e primitivas do design system
- Listar tokens (cor, espaçamento, tipografia, shape)
- Analisar estrutura de navegação (sidebar expandida/colapsada, header mobile)
- Apresentar resumo da arquitetura (estrutura de pastas, hierarquia de componentes, estratégia de componentização)

---

## 🚀 Prompts de Implementação

### 🏗️ PROMPT 1: Estrutura Base e Configuração

**Tarefas:**
- [ ] Configurar estrutura de pastas (components, contexts, hooks, types, utils, constants)
- [ ] Organizar subpastas por domínio: layout, dashboard, cards, modals, etc.
- [ ] Configurar Tailwind CSS para usar variables do Figma como classes customizadas
- [ ] Mapear tokens semânticos e primitivos no tailwind.config.ts
- [ ] Criar tipos TypeScript: Transaction, Goal, CreditCard, BankAccount, FamilyMember
- [ ] Configurar React Router para 5 rotas principais (SPA)

**Entregáveis:**
- Projeto estruturado e configurado
- Tipos TypeScript completos
- Rotas configuradas

---

### 🎨 PROMPT 2: Sistema de Layout e Navegação Desktop

**Tarefas:**
- [ ] Criar componente Sidebar com altura total do viewport
- [ ] Implementar estado expandido (logo completo "mycash+", nomes de seções, perfil completo)
- [ ] Implementar estado colapsado (ícone logo, ícones seções, apenas avatar)
- [ ] Botão circular na borda direita para alternar estados
- [ ] Ícone muda: seta esquerda (expandido) / seta direita (colapsado)
- [ ] Transições suaves (conteúdo ajusta margem esquerda)
- [ ] Tooltip ao passar mouse sobre itens quando colapsada
- [ ] Item ativo: fundo preto, texto branco, ícone verde-limão
- [ ] Itens inativos: fundo transparente, texto cinza
- [ ] Usar exclusivamente variables do design system

**Breakpoints:**
- Desktop (≥1024px): Sidebar visível
- Tablet (641-1023px): [comportamento específico]
- Mobile (≤640px): [comportamento específico]

---

### 📱 PROMPT 3: Sistema de Layout e Navegação Mobile

**Tarefas:**
- [ ] Criar HeaderMobile (substitui sidebar <1024px)
- [ ] Header fixo no topo, largura total, visível durante scroll
- [ ] Logotipo "mycash+" à esquerda
- [ ] Avatar do usuário à direita (clicável)
- [ ] Criar MenuDropdown (desliza de cima para baixo)
- [ ] Listar todos os itens de navegação (ícone + texto)
- [ ] Item da seção atual destacado (fundo preto)
- [ ] Botão "Sair" vermelho na parte inferior
- [ ] Lógica de fechamento: clique em item, X, ou fora (overlay)
- [ ] Breakpoints: desktop = sidebar, mobile/tablet = header (nunca ambos)

---

### 💾 PROMPT 4: Context Global e Gerenciamento de Estado

**⚠️ REGRA CRÍTICA:** NÃO usar localStorage, sessionStorage ou browser storage. Apenas React state (useState, useReducer).

**Tarefas:**
- [ ] Criar FinanceProvider (context provider)
- [ ] Manter 5 arrays: transactions, goals, creditCards, bankAccounts, familyMembers
- [ ] Tipar cada array corretamente
- [ ] Implementar funções CRUD para cada entidade (add, update, delete)
- [ ] Estados de filtros: selectedMember, dateRange, transactionType, searchText
- [ ] Funções de cálculo derivadas:
  - `getFilteredTransactions` (aplica todos os filtros)
  - `calculateTotalBalance`
  - `calculateIncomeForPeriod`
  - `calculateExpensesForPeriod`
  - `calculateExpensesByCategory`
  - `calculateCategoryPercentage`
  - `calculateSavingsRate`
- [ ] Hook customizado `useFinance` (encapsula useContext)
- [ ] Popular estado inicial com dados mock realistas (3 membros, 3 cartões, 20-30 transações, 4 objetivos)

---

### 📊 PROMPT 5: Cards de Resumo Financeiro

**Tarefas:**
- [ ] Criar BalanceCard (fundo preto, texto branco)
- [ ] Círculo verde-limão desfocado (blur) como decorativo de fundo
- [ ] Label "Saldo Total" (cinza claro)
- [ ] Valor formatado como moeda brasileira (R$ XXX.XXX,XX)
- [ ] Badge com gráfico crescente + percentual de crescimento (+12% esse mês)
- [ ] Criar IncomeCard (fundo branco, borda sutil)
- [ ] Label "Receitas" (preto negrito)
- [ ] Círculo cinza com ícone seta diagonal baixo-esquerda
- [ ] Criar ExpenseCard (similar ao IncomeCard)
- [ ] Label "Despesas" (cinza médio)
- [ ] Círculo vermelho claro com ícone seta diagonal cima-direita
- [ ] Valores vêm de funções do contexto (calculateTotalBalance, calculateIncomeForPeriod, calculateExpensesForPeriod)
- [ ] Organizar horizontalmente (desktop) / verticalmente (mobile)
- [ ] Animação de contagem nos valores (0 até valor final em 800ms)

---

### 🎯 PROMPT 6: Header do Dashboard com Controles

**Tarefas:**
- [ ] Criar DashboardHeader (barra horizontal responsiva)
- [ ] Campo de busca à esquerda (ícone lupa, placeholder "Pesquisar...")
- [ ] Busca em tempo real (atualiza searchText no contexto)
- [ ] Busca case-insensitive, procura em descrição OU categoria
- [ ] Botão de filtros (botão circular, ícone controles deslizantes)
- [ ] Desktop: abre FilterPopover (fundo branco semi-transparente, glassmorphism)
- [ ] Mobile: abre modal fullscreen (desliza de baixo para cima)
- [ ] FilterPopover: seção "Tipo de Transação" (3 opções rádio: Todos, Receitas, Despesas)
- [ ] Seletor de período: botão mostra período formatado ("01 jan - 31 jan, 2024")
- [ ] Calendário interativo (desktop: 2 meses lado a lado, mobile: 1 mês)
- [ ] Seleção de intervalo (primeiro clique = início, segundo = fim)
- [ ] Botões de atalho: "Este mês", "Mês passado", "Últimos 3 meses", "Este ano"
- [ ] Widget de membros da família: avatares circulares sobrepostos (pilha)
- [ ] Avatar selecionado: borda preta grossa, check verde canto inferior direito
- [ ] Clicar em avatar aplica filtro de membro
- [ ] Botão "+" após avatares (abre modal adicionar membro)
- [ ] Botão "Nova Transação" (fundo preto, texto branco, ícone "+")

---

### 🍩 PROMPT 7: Carrossel de Gastos por Categoria

**Tarefas:**
- [ ] Criar ExpensesByCategoryCarousel
- [ ] Buscar dados de `calculateExpensesByCategory` (contexto)
- [ ] Calcular percentual por categoria (`calculateCategoryPercentage`)
- [ ] Criar CategoryDonutCard (fundo branco, borda cinza, largura fixa 160px)
- [ ] Gráfico donut (diâmetro 64px): anel externo colorido (percentual), interno vazio
- [ ] Rotação de cores: verde-limão, preto, cinza médio, etc.
- [ ] Percentual centralizado sobreposto ("30.0%")
- [ ] Nome da categoria abaixo do donut
- [ ] Valor total da categoria (moeda brasileira)
- [ ] Carrossel scrollável horizontalmente (mouse wheel, arrastar, setas)
- [ ] Setas de navegação (aparecem no hover)
- [ ] Gradiente de máscara nas bordas (fade esquerda/direita)
- [ ] Hover nos cards: borda muda para verde-limão
- [ ] Mobile: apenas scroll por toque (sem setas)

---

### 📈 PROMPT 8: Gráfico de Fluxo Financeiro

**Tarefas:**
- [ ] Criar FinancialFlowChart (usar Recharts ou similar)
- [ ] Card grande com título "Fluxo Financeiro" + ícone gráfico crescente
- [ ] Legenda: círculo verde-limão "Receitas" + círculo preto "Despesas"
- [ ] Altura fixa 300px, largura 100%
- [ ] Eixo X: meses abreviados (Jan, Fev, Mar...)
- [ ] Eixo Y: valores compactos (R$ 2k, R$ 4k, R$ 6k...)
- [ ] Linhas horizontais tracejadas sutis (grid)
- [ ] Duas áreas: Receitas (linha verde-limão 3px, gradiente 30% opaco) e Despesas (linha preta 3px, gradiente 10% opaco)
- [ ] Tooltip interativo: linha vertical cinza, tooltip flutuante (fundo branco, sombra)
- [ ] Tooltip mostra: mês, "Receitas: R$ X.XXX,XX", "Despesas: R$ X.XXX,XX"
- [ ] Dados mock para 7 meses (estruturado para dados reais futuros)

---

### 💳 PROMPT 9: Widget de Cartões de Crédito

**Tarefas:**
- [ ] Criar CreditCardsWidget (fundo cinza claro, bordas arredondadas)
- [ ] Header: ícone cartão + título "Cartões" + botão "+" (abre modal novo cartão)
- [ ] Lista vertical de cartões (array creditCards do contexto)
- [ ] Cada card: fundo branco, cantos arredondados, sombra suave
- [ ] Estrutura horizontal: ícone (esquerda), informações (centro), indicador uso (direita)
- [ ] Ícone: bloco quadrado com cor do tema (preto, verde-limão, branco com borda)
- [ ] Informações: nome cartão/banco, fatura atual (moeda, negrito), final número ("•••• 1234")
- [ ] Badge circular/oval: percentual de uso ((fatura ÷ limite) × 100)
- [ ] Hover: card eleva (translateY -4px ou -8px), sombra aumenta
- [ ] Clicar card abre modal de detalhes
- [ ] Se >3 cartões: paginação (avançar/voltar, indicador página)

---

### 📋 PROMPT 10: Widget de Próximas Despesas

**Tarefas:**
- [ ] Criar widget (fundo branco, borda clara, cantos arredondados)
- [ ] Header: ícone carteira (20px) + título "Próximas despesas" + botão "+" circular (40px)
- [ ] Lista vertical de despesas pendentes (tipo "despesa", não pagas)
- [ ] Ordenar por data de vencimento (crescente)
- [ ] Cada item: linha horizontal com padding vertical generoso
- [ ] Divisória fina cinza clara entre itens
- [ ] Estrutura: esquerda (3 linhas) + direita (valor + botão check)
- [ ] Esquerda: descrição (negrito), "Vence dia DD/MM" (cinza escuro), origem (cinza claro)
- [ ] Origem: "Nubank conta" ou "Crédito [Banco] **** [dígitos]"
- [ ] Direita: valor (moeda, grande negrito) + botão check circular (32px)
- [ ] Hover botão check: fundo verde claro, borda verde, ícone verde
- [ ] Clicar check: marca como paga, anima, remove da lista, cria ocorrência recorrente se aplicável
- [ ] Mensagem "Despesa marcada como paga!"
- [ ] Estado vazio: ícone check verde circular, "Nenhuma despesa pendente"

---

### 📋 PROMPT 11: Tabela de Transações Detalhada

**Tarefas:**
- [ ] Criar TransactionsTable
- [ ] Header: título "Extrato Detalhado" + controles busca/filtro
- [ ] Campo busca local (ícone lupa, placeholder "Buscar lançamentos...")
- [ ] Select tipo (dropdown: Todos, Receitas, Despesas)
- [ ] Tabela com borda clara arredondada
- [ ] Header tabela: fundo cinza claro
- [ ] 7 colunas: Avatar (50px), Data, Descrição, Categoria, Conta/Cartão, Parcelas, Valor
- [ ] Avatar: foto circular 24px (ou ícone genérico)
- [ ] Data: "DD/MM/AAAA" (cinza médio)
- [ ] Descrição: ícone tipo + descrição (negrito preto)
- [ ] Categoria: badge arredondado (fundo cinza claro, texto cinza médio)
- [ ] Parcelas: "3x" ou "-" (se 1x)
- [ ] Valor: alinhado direita, sinal "+" verde (receitas) ou "-" preto (despesas)
- [ ] Zebra striping sutil
- [ ] Hover linha: fundo cinza claro
- [ ] Filtragem combinada: filtros globais + busca textual + select tipo (AND lógico)
- [ ] Ordenação: por data decrescente
- [ ] Paginação: 5 transações por vez
- [ ] Contador: "Mostrando 1 a 5 de 47"
- [ ] Controles: botão Anterior, números páginas, botão Próxima
- [ ] Página atual: fundo preto, texto branco
- [ ] Se >7 páginas: primeiras 3, "...", últimas 2
- [ ] Mudar página: scroll até topo, fade-in
- [ ] Mudar filtro: reset página 1, recalcula total
- [ ] Estado vazio: "Nenhum lançamento encontrado." (96px altura)

---

### 📋 PROMPT 12: Modal de Nova Transação

**Tarefas:**
- [ ] Modal fullscreen (fundo branco)
- [ ] 3 áreas: header fixo, conteúdo scrollável, footer fixo
- [ ] Header: ícone grande (64px) muda conforme tipo (verde-limão receita / preto despesa)
- [ ] Título "Nova Transação" + subtítulo
- [ ] Botão X circular grande (48px)
- [ ] Conteúdo centralizado (max-width 600-700px), fundo cinza leve
- [ ] Toggle tipo: 2 botões grandes ("Receita" / "Despesa")
- [ ] Campo valor: input numérico 56px, "R$" fixo à esquerda, obrigatório
- [ ] Campo descrição: input texto 56px, placeholder "Ex: Supermercado Semanal", obrigatório
- [ ] Campo categoria: dropdown + botão "+ Nova Categoria" (cria inline)
- [ ] Filtrar categorias por tipo (receita/despesa)
- [ ] Grid 2 colunas: Select membro + Select conta/cartão
- [ ] Select conta/cartão: agrupar "Contas Bancárias" e "Cartões de Crédito"
- [ ] Campo parcelamento: só aparece se cartão + despesa (fade-in slide-down)
- [ ] Dropdown parcelamento: "À vista (1x)" até "12x"
- [ ] Checkbox despesa recorrente: só aparece se despesa (container azul claro destacado)
- [ ] Se recorrente: desabilita parcelamento, força 1x
- [ ] Footer: botões "Cancelar" (transparente) + "Salvar Transação" (preto, branco)
- [ ] Validação: valor >0, descrição ≥3 chars, categoria obrigatória, conta obrigatória
- [ ] Salvar: criar objeto transação, adicionar ao contexto, fechar modal, toast sucesso

---

### 👥 PROMPT 13: Modal de Adicionar Membro

**Tarefas:**
- [ ] Modal centralizado (similar estrutura transação)
- [ ] Header: "Adicionar Membro da Família" + X
- [ ] Footer: "Cancelar" + "Adicionar Membro"
- [ ] Campo nome: input texto obrigatório (label "Nome Completo", placeholder)
- [ ] Campo função: combobox obrigatório (label "Função na Família", sugestões: Pai, Mãe, Filho...)
- [ ] Campo avatar: 2 opções - "URL" (input texto) ou "Upload" (botão arquivo, JPG/PNG, max 5MB)
- [ ] Avatar padrão se não fornecido
- [ ] Campo renda: input numérico opcional (label "Renda Mensal Estimada", moeda)
- [ ] Validação: nome ≥3 chars, função obrigatória
- [ ] Salvar: criar objeto membro, adicionar ao contexto, fechar, toast sucesso

---

### 💳 PROMPT 14: Modal de Adicionar Cartão

**Tarefas:**
- [ ] Modal centralizado (fundo branco, 500-600px desktop, 90% mobile)
- [ ] Header: "Adicionar Conta/Cartão" + X
- [ ] Footer: "Cancelar" + "Adicionar"
- [ ] Toggle tipo: "Conta Bancária" / "Cartão de Crédito" (2 botões grandes)
- [ ] Campo nome: input texto (label muda conforme tipo), obrigatório ≥3 chars
- [ ] Campo titular: dropdown obrigatório (lista membros)
- [ ] **Condicional Conta:** Campo saldo inicial (numérico, moeda, obrigatório)
- [ ] **Condicional Cartão:**
  - Dia fechamento (1-31, obrigatório)
  - Dia vencimento (1-31, obrigatório)
  - Limite total (numérico, moeda, obrigatório >0)
  - Últimos 4 dígitos (opcional, exatamente 4 dígitos)
  - Tema visual: 3 cards clicáveis (Black, Lime, White), um selecionado
- [ ] Validação: nome, titular, campos específicos conforme tipo
- [ ] Salvar: criar objeto, adicionar ao contexto, fechar, toast sucesso

---

### 📊 PROMPT 15: Modal de Detalhes do Cartão

**Tarefas:**
- [ ] CardDetailsModal (abre ao clicar cartão no widget)
- [ ] Modal maior que anteriores
- [ ] Header: nome cartão + X
- [ ] **Área informações:** cards/grid mostrando:
  - Limite total, fatura atual, limite disponível, percentual uso, datas fechamento/vencimento, últimos dígitos
  - Representação visual: donut grande ou barra progresso
- [ ] **Área despesas:** tabela com transações despesa vinculadas ao cartão
- [ ] Filtro: type="expense" AND accountId=cartão.id
- [ ] Tabela: colunas Data, Descrição, Categoria, Parcelas, Valor
- [ ] Se >10 despesas: paginação (10 por vez)
- [ ] Estado vazio: "Nenhuma despesa registrada neste cartão ainda."
- [ ] Botões ação: "Ver Extrato Completo", "Adicionar Despesa", "Editar Cartão", "Fechar"

---

### 📱 PROMPT 16: Modal de Filtros Mobile

**Tarefas:**
- [ ] FiltersMobileModal (abre ao tocar botão filtros header mobile)
- [ ] Animação: slide-in vertical (de baixo para cima, 300ms)
- [ ] 3 áreas: header fixo, conteúdo scrollável, footer fixo
- [ ] Header: "Filtros" + X grande (área toque 44x44px)
- [ ] Footer: botão "Aplicar Filtros" (56px altura, preto, branco)
- [ ] **Seção tipo:** label + grid 3 colunas (botões: Todos, Receitas, Despesas, 48px altura)
- [ ] **Seção membro:** label + botões horizontais wrap (primeiro "Todos", depois membros)
- [ ] Botão membro: avatar 32px + nome (48px altura, pill shape)
- [ ] **Seção período:** label + calendário 1 mês (largura total, seleção intervalo)
- [ ] Estado temporário local (não aplica ao contexto até "Aplicar Filtros")
- [ ] "Aplicar Filtros": copia filtros temporários para contexto global, fecha modal
- [ ] X ou fora: fecha sem aplicar (descarta mudanças)

---

### 💳 PROMPT 17: View Completa de Cartões

**Tarefas:**
- [ ] Criar CardsView (seção principal navegável)
- [ ] Header: título "Cartões de Crédito" + botão "Novo Cartão" (preto, ícone "+")
- [ ] Grid responsivo: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] Cada card grande detalhado:
  - Topo: nome cartão + logo banco
  - Seção valores: limite total, fatura atual (vermelha se próximo limite), limite disponível, percentual uso
  - Representação visual: barra progresso ou donut
  - Datas: fechamento e vencimento (ícones calendário)
  - Tema visual: borda colorida ou fundo sutil
  - Últimos dígitos: "•••• 1234" (monoespaçado)
  - Botões: "Ver Detalhes", "Adicionar Despesa"
- [ ] Hover: card eleva, sombra aumenta
- [ ] Clicar card abre modal detalhes
- [ ] Estado vazio: ícone cartão, "Nenhum cartão cadastrado" + botão "Cadastrar Primeiro Cartão"
- [ ] Ordenar: fatura decrescente ou alfabeticamente

---

### 📋 PROMPT 18: View Completa de Transações

**Tarefas:**
- [ ] Criar TransactionsView (seção principal)
- [ ] Header: título "Transações" + botão "Nova Transação"
- [ ] Barra filtros avançados: busca, tipo, categoria, conta/cartão, membro, date range, status
- [ ] Filtros trabalham em conjunto (AND lógico) + filtros globais
- [ ] Linha resumo: total receitas, total despesas, diferença (verde/vermelho), quantidade transações
- [ ] Tabela: usar componente TransactionsTable (modo expandido: 10 linhas/página, largura total)
- [ ] Ordenação clicável: headers colunas (Data, Valor...), ícone seta indica ordem
- [ ] Botão "Exportar" (CSV ou PDF)
- [ ] Estado vazio: "Nenhuma transação registrada ainda" + botão adicionar primeira

---

### 👤 PROMPT 19: View de Perfil - Aba Informações

**Tarefas:**
- [ ] Criar ProfileView (seção principal)
- [ ] Sistema abas: "Informações" e "Configurações" (aba ativa destacada)
- [ ] **Aba Informações:**
  - Seção perfil (card): avatar 120px, nome completo (negrito), função, email (ícone envelope), renda mensal (ícone cifrão)
  - Botão "Editar Perfil"
  - Seção membros família: card "Membros da Família" + lista vertical
  - Item lista: avatar 48px, nome + função, renda mensal à direita, fundo cinza claro
  - Hover: fundo cinza mais escuro
  - Clicar membro: abre modal editar
  - Se 1 membro: mensagem + botão "Adicionar Membro da Família"
  - Botão vermelho "Sair" (ícone logout)

---

### ⚙️ PROMPT 20: View de Perfil - Aba Configurações

**Tarefas:**
- [ ] **Aba Configurações:**
  - **Preferências exibição:** toggle "Modo Escuro" (desabilitado, badge "Em breve"), select moeda (visual), select formato data
  - **Notificações:** toggles (lembrete vencimento, alerta limite cartão, resumo mensal email, objetivos alcançados)
  - **Gerenciar categorias:** seções "Receitas" e "Despesas" (lista categorias com cor, botões editar/deletar), botões "Adicionar Categoria"
  - **Dados e privacidade:** botão "Exportar Todos os Dados" (JSON/CSV), botão "Limpar Todos os Dados" (vermelho, confirmação obrigatória), texto "Esta ação não pode ser desfeita"
  - **Sobre:** versão "v1.0.0", texto descritivo, links "Termos de Uso" e "Política de Privacidade"
- [ ] Cards organizados verticalmente (mobile) / alguns lado a lado (desktop)

---

### 🎨 PROMPT 21: Animações e Transições Globais

**Tarefas:**
- [ ] Transições navegação: fade-out conteúdo atual (200ms) + fade-in novo (200ms, defasado)
- [ ] Animação entrada cards/componentes:
  - Cards transações: fade-in + slide-up (300ms, stagger 50ms)
  - Cards objetivos/cartões: fade-in + slide-up (300ms, stagger 80ms)
  - Donuts categorias: scale (0.8→1) + fade-in (400ms, stagger 100ms)
- [ ] Animações hover:
  - Botões: background-color (200ms ease-in-out)
  - Cards clicáveis: translateY + box-shadow (250ms ease-out)
  - Avatares: scale (200ms ease-in-out)
- [ ] Animação contagem valores monetários (0 até final em 800ms, ease-out)
- [ ] Animação barras progresso (preencher esquerda→direita, 1000ms ease-out)
- [ ] Animação modais: overlay fade-in (200ms), modal fade-in + scale 0.95→1 (250ms ease-out)
- [ ] Modal mobile filtros: slide-in translateY(100%)→0 (300ms ease-out)
- [ ] Animação toasts: slide-in direita + fade-in (300ms), fade-out + slide-out (250ms)
- [ ] Skeleton loaders: pulse (opacity 0.6↔1, 1500ms infinito) ou shimmer (gradiente move)
- [ ] Micro-interações: scale checkboxes/toggles, borda inputs em foco, dropdown fade-in + slide-down
- [ ] Respeitar prefers-reduced-motion (desabilitar/reduzir animações)

---

### 🎯 PROMPT 22: Formatação e Utilitários

**Tarefas:**
- [ ] **currency.utils.ts:**
  - `formatCurrency` (número → "R$ 1.234,56", Intl.NumberFormat pt-BR)
  - `formatCompactCurrency` (número → "R$ 2,5k" ou "R$ 1,2M")
  - `parseCurrencyInput` (string → número, remove formatação)
- [ ] **date.utils.ts:**
  - `formatDate` (Date → "DD/MM/AAAA", date-fns pt-BR)
  - `formatDateLong` (Date → "15 de Janeiro de 2024")
  - `formatDateRange` (2 datas → "01 jan - 31 jan, 2024")
  - `formatRelativeDate` (Date → "Hoje", "Ontem", "Há 3 dias")
- [ ] **array.utils.ts:**
  - `groupByCategory` (transações → objeto agrupado)
  - `filterByDateRange` (transações + intervalo → filtrado)
  - `sortByDate` (transações → ordenado)
- [ ] **calculation.utils.ts:**
  - `calculatePercentage` (parcial, total → percentual 1 casa decimal, trata /0)
  - `calculateDifference` (2 valores → diferença absoluta + percentual variação)
  - `calculateInstallmentValue` (total, parcelas → valor parcela)
- [ ] **validation.utils.ts:**
  - `isValidEmail` (regex)
  - `isValidCPF` (estrutura brasileira)
  - `isValidDate` (data válida, não futura se aplicável)
  - `isPositiveNumber` (número positivo >0)
- [ ] **id.utils.ts:**
  - `generateUniqueId` (UUID v4 ou crypto.randomUUID)
- [ ] Organizar em arquivos por categoria
- [ ] JSDoc comments (parâmetros, retorno, exemplos)
- [ ] Testes unitários básicos funções críticas

---

### 🎨 PROMPT 23: Responsividade e Ajustes Finais

**⚠️ REGRA CRÍTICA:** Mobile-first. Layout base parte do mobile, breakpoints apenas evoluem, nunca recriam.

**Tarefas:**
- [ ] **Breakpoints oficiais:**
  - Mobile (base): <768px
  - Tablet (md): ≥768px e <1280px
  - Desktop (lg): ≥1280px e <1920px
  - Wide/4K (xl): ≥1920px
- [ ] Layout fluido: containers `width: 100%`, limite com `max-width` (nunca `width` fixa)
- [ ] Sidebar só desktop (≥1280px), Header Mobile só mobile/tablet (<1280px), nunca coexistem
- [ ] Grids mobile-first: 1 col mobile → 2 tablet → 3-4 desktop (auto-fit/auto-fill)
- [ ] Espaçamentos: px-4 mobile, px-6 tablet, px-8 desktop
- [ ] Largura leitura: max-w-[1400px] desktop, max-w-[1600px] wide, mx-auto
- [ ] Tipografia: reduzir ~15% mobile, progressiva (text-base md:text-lg lg:text-xl)
- [ ] Tabela mobile: não usar tabela horizontal, cada transação = card vertical
- [ ] Gráficos: adaptar altura, labels simplificados mobile, tooltips sem overflow
- [ ] Modais: 100% viewport mobile, width: 100% + max-width desktop (nunca fixo)
- [ ] Touch targets: mínimo 44x44px, espaçamento ≥8px, inputs 48px altura, font-size ≥16px
- [ ] Acessibilidade: navegação teclado, focus:ring, aria-label, alt imagens, contraste 4.5:1
- [ ] Validar: 375px, 768px, 1280px, 1920px (sem overflow, grid correto, alinhamento)

---

### ✅ PROMPT 24: Testes e Validação Final

**Tarefas:**
- [ ] Fluxo teste jornada usuário completa:
  - Abre sistema, vê dados mock
  - Clica membro família (filtra)
  - Remove filtro
  - Seleciona período "Últimos 3 meses"
  - Busca texto
  - Cria nova transação
  - Visualiza cartão
  - Navega seções (Cartões, Transações, Perfil)
  - Configurações
  - Retorna Dashboard
- [ ] Validar cálculos financeiros (valores conhecidos vs. exibidos)
- [ ] Validar filtros combinados (membro + período + busca)
- [ ] Validar formatações (moeda R$ 1.234,56, data DD/MM/AAAA, percentual 35,5%)
- [ ] Validar responsividade (redimensionar gradualmente 1920px→375px)
- [ ] Validar modais (centralizados, overlay, fechar X/fora/Escape, validações)
- [ ] Validar acessibilidade (navegação teclado, foco visível, ordem tab, leitor tela)
- [ ] Validar performance (transições suaves, tabela 100 transações, memory leaks modais)
- [ ] Corrigir bugs encontrados
- [ ] Tratamento erros: divisão por zero, arrays vazios, validação formulários
- [ ] Mensagens feedback: toasts sucesso/erro, estados vazios, validação descritiva
- [ ] Documentar comportamentos não óbvios
- [ ] Criar README.md (objetivo, tecnologias, instalação, estrutura, componentes)

---

### 🎉 PROMPT FINAL: Revisão e Entrega

**Tarefas:**
- [ ] Checklist qualidade:
  - ✅ 5 seções principais implementadas e navegáveis
  - ✅ Navegação (sidebar + header mobile) funciona
  - ✅ Context global gerencia estado corretamente
  - ✅ Cálculos financeiros corretos e testados
  - ✅ Filtros (globais + locais) funcionam em combinação
  - ✅ Modais implementados com validação
  - ✅ Componentes usam apenas variables design system
  - ✅ Sistema totalmente responsivo
  - ✅ Animações/transições suaves e consistentes
  - ✅ Formatações moeda/data padrão brasileiro
  - ✅ Navegação teclado funciona
  - ✅ Contraste cores WCAG AA
  - ✅ Sistema funciona com dados mock
- [ ] Revisar organização código (pastas, nomes, responsabilidades, duplicação, tipos TS, imports)
- [ ] Revisar comentários/documentação (JSDoc funções complexas, lógica não-óbvia, remover obsoletos)
- [ ] Otimizar performance (re-renders desnecessários, imagens, bundle size, imports)
- [ ] Preparar integração Supabase (identificar pontos, comentários // TODO, compatibilidade schema)
- [ ] Documentar componentes principais (lista agrupada, responsabilidades, props, hooks)
- [ ] Gerar relatório final (total componentes, linhas código, funcionalidades completas/parciais, próximos passos)

---

## 📊 Progresso Geral

- [x] PROMPT 0: Análise e Planejamento Inicial
- [ ] PROMPT 1: Estrutura Base e Configuração
- [ ] PROMPT 2: Layout e Navegação Desktop
- [ ] PROMPT 3: Layout e Navegação Mobile
- [ ] PROMPT 4: Context Global
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

## 🔗 Links de Referência

- **Figma Dashboard:** https://www.figma.com/design/M056Ejtk50NYDYiZ4YrpkV/Workshop---Do-figma-MCP-ao-Cursor-AI-v.2--Community-?node-id=2004-5647&t=KBwximgGq2VK0MSp-4
- **Tokens (Planilha):** https://docs.google.com/spreadsheets/d/1icfTxXdSbtd029FfOYnrlMs2pC8HJqk5PDuEmQF5Zjo/edit
- **Documentação:** https://docs.google.com/document/d/1s-KKXi3hROSBsgfxXOKpeMOxD318U7z9hSJ0UiIRT4Q/edit

---

## 📝 Regras Críticas

- **Hierarquia de Variáveis:** Semântica → Primitiva → Conversão (NUNCA hardcoded)
- **Layout Fluido:** `width: 100%`, `max-width` quando necessário, nunca `width` fixa
- **Mobile-First:** Layout base parte do mobile, breakpoints apenas evoluem
- **Sidebar:** Só desktop (≥1280px), Header Mobile só mobile/tablet (<1280px)
- **Estado:** NÃO usar localStorage/sessionStorage, apenas React state (useState, useReducer)
- **Build obrigatório** antes de cada commit
- **Aguardar aprovação** entre prompts

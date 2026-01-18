# mycash+ - Gestão Financeira Familiar

Sistema de gestão financeira familiar desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Stack Tecnológica

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultrarrápido
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento para aplicações React

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/      # Componentes React
│   ├── ui/         # Componentes base reutilizáveis
│   ├── layout/     # Componentes de layout (Sidebar, HeaderMobile)
│   ├── dashboard/  # Componentes específicos do Dashboard
│   ├── transactions/
│   ├── cards/
│   └── profile/
├── contexts/       # Context API para estado global
├── hooks/          # Hooks customizados
├── pages/          # Páginas da aplicação
├── services/       # Integração com backend (Supabase)
├── styles/         # Estilos globais e tokens CSS
├── types/          # Tipos TypeScript
├── utils/          # Funções utilitárias
└── constants/      # Constantes da aplicação
```

## 🎨 Design System

O projeto utiliza um sistema de design baseado em tokens, priorizando variáveis semânticas sobre primitivas:

1. **Variável Semântica** (prioridade máxima)
2. **Variável Primitiva** (se semântica não existir)
3. **Conversão Inteligente** (valor → token mais próximo)

**NUNCA usar valores hardcoded.**

## 📐 Breakpoints

- **Mobile (base):** < 768px
- **Tablet (md):** ≥ 768px e < 1280px
- **Desktop (lg):** ≥ 1280px e < 1920px
- **Wide/4K (xl):** ≥ 1920px

## 🔗 Links

- [Figma Design](https://www.figma.com/design/M056Ejtk50NYDYiZ4YrpkV/Workshop---Do-figma-MCP-ao-Cursor-AI-v.2--Community-?node-id=2004-5647)
- [Tokens Design System](https://docs.google.com/spreadsheets/d/1icfTxXdSbtd029FfOYnrlMs2pC8HJqk5PDuEmQF5Zjo/edit)

## 📝 Licença

Este projeto é privado.

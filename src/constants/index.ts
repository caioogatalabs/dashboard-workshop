// Constantes globais da aplicação

export const APP_NAME = 'mycash+';
export const APP_VERSION = '1.0.0';

// Rotas principais
export const ROUTES = {
  DASHBOARD: '/',
  TRANSACTIONS: '/transactions',
  CARDS: '/cards',
  GOALS: '/goals',
  PROFILE: '/profile',
} as const;

// Categorias padrão de transações
export const DEFAULT_INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Aluguel',
  'Outros',
] as const;

export const DEFAULT_EXPENSE_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Compras',
  'Contas',
  'Outros',
] as const;

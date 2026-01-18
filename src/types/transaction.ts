export type TransactionType = 'income' | 'expense';

export type TransactionStatus = 'completed' | 'pending' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
  accountId: string; // ID da conta bancária ou cartão de crédito
  memberId: string | null; // ID do membro da família (null = família geral)
  installments: number; // Número de parcelas (1 = à vista)
  currentInstallment: number; // Parcela atual (se parcelado)
  isRecurring: boolean; // Se é despesa/receita recorrente
  recurringPeriod?: 'monthly' | 'weekly' | 'yearly'; // Período de recorrência
  isPaid: boolean; // Se foi paga (para despesas)
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

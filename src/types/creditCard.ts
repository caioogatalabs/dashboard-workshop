export type CreditCardTheme = 'black' | 'lime' | 'white';

export interface CreditCard {
  id: string;
  name: string;
  holderId: string; // ID do membro da família titular
  bankName?: string;
  closingDay: number; // Dia de fechamento (1-31)
  dueDay: number; // Dia de vencimento (1-31)
  limit: number; // Limite total
  currentBill: number; // Fatura atual
  theme: CreditCardTheme;
  lastDigits?: string; // Últimos 4 dígitos do cartão
  createdAt: Date;
  updatedAt: Date;
}

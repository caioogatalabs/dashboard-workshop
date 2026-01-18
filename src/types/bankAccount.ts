export interface BankAccount {
  id: string;
  name: string;
  holderId: string; // ID do membro da família titular
  bankName?: string;
  balance: number; // Saldo atual
  accountNumber?: string;
  agency?: string;
  accountType?: 'checking' | 'savings' | 'investment';
  createdAt: Date;
  updatedAt: Date;
}

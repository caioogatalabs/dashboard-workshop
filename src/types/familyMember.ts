export interface FamilyMember {
  id: string;
  name: string;
  role: string; // Ex: "Pai", "Mãe", "Filho", etc.
  avatarUrl?: string; // URL da imagem do avatar
  monthlyIncome?: number; // Renda mensal estimada
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

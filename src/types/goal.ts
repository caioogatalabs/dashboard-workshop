export type GoalStatus = 'active' | 'completed' | 'paused' | 'cancelled';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  memberId: string | null; // ID do membro ou null para família
  status: GoalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type GoalCategory =
  | 'design_brand'
  | 'finance_savings'
  | 'travel_events'
  | 'focus_habits'
  | 'sales_marketing'
  | 'personal_lifestyle';

export type GoalPriority = 'high' | 'medium' | 'low';

export interface GoalSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface UserPersonalGoal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: GoalPriority;
  targetDate: string; // YYYY-MM-DD
  isCompleted: boolean;
  
  // Metas de Ahorro / Finanzas opcionales
  isFinancialGoal?: boolean;
  targetAmount?: number;
  currentAmount?: number;
  currency?: string;

  // Sub-tareas / Checklist interno
  subtasks: GoalSubtask[];

  createdAt: string;
}

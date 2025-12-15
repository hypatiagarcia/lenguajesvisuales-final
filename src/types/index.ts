export interface Habit {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'productivity' | 'mindfulness' | 'learning' | 'other';
  frequency: 'daily' | 'weekly';
  active: boolean;
  createdAt: string;
  completedDates: string[]; // ISO Date strings YYYY-MM-DD
}

export type NewHabit = Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'active'>;

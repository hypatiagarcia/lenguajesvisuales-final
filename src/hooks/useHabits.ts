import { useState, useEffect } from 'react';
import { Habit, NewHabit } from '../types';
import initialData from '../data/initialHabits.json';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('zen-habits');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('zen-habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabit: NewHabit) => {
    const habit: Habit = {
      ...newHabit,
      id: crypto.randomUUID(),
      active: true,
      createdAt: new Date().toISOString(),
      completedDates: []
    };
    setHabits(prev => [habit, ...prev]);
  };

  const toggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const isCompletedToday = habit.completedDates.includes(today);
        const newCompletedDates = isCompletedToday
          ? habit.completedDates.filter(d => d !== today)
          : [...habit.completedDates, today];
        
        return { ...habit, completedDates: newCompletedDates };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    // Instead of hard delete, we can archive it (soft delete) or actually delete.
    // Requirement says "Filtrar hábitos activos/inactivos", implying soft delete or status toggle.
    // But usually CRUD implies delete. Let's implement soft delete (archive) as the primary action for "remove" from view,
    // but maybe a real delete button too.
    // For this function, let's do a toggle active status (Archive/Restore).
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        return { ...habit, active: !habit.active };
      }
      return habit;
    }));
  };

  const getWeeklyProgress = () => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const activeHabitsCount = habits.filter(h => h.active).length;
      if (activeHabitsCount === 0) return { date, percentage: 0 };

      const completedCount = habits.filter(h => 
        h.active && h.completedDates.includes(date)
      ).length;

      return {
        date, // Format this in the chart component
        percentage: Math.round((completedCount / activeHabitsCount) * 100)
      };
    });
  };

  return {
    habits,
    addHabit,
    toggleHabit,
    deleteHabit,
    getWeeklyProgress
  };
};

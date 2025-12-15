import React from 'react';
import { Check, Archive, RotateCcw } from 'lucide-react';
import { Habit } from '../types';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HabitList: React.FC<HabitListProps> = ({ habits, onToggle, onDelete }) => {
  const today = new Date().toISOString().split('T')[0];

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>No hay hábitos para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map(habit => {
        const isCompleted = habit.completedDates.includes(today);
        
        return (
          <div 
            key={habit.id} 
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
              isCompleted 
                ? 'bg-green-50 border-green-100' 
                : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggle(habit.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-slate-100 text-slate-300 hover:bg-indigo-100 hover:text-indigo-400'
                }`}
              >
                <Check className="w-5 h-5" />
              </button>
              <div>
                <h3 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                  {habit.title}
                </h3>
                <p className="text-sm text-slate-400">{habit.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                habit.category === 'health' ? 'bg-red-100 text-red-600' :
                habit.category === 'productivity' ? 'bg-blue-100 text-blue-600' :
                habit.category === 'mindfulness' ? 'bg-purple-100 text-purple-600' :
                habit.category === 'learning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-slate-100 text-slate-600'
              }`}>
                {habit.category}
              </span>
              <button 
                onClick={() => onDelete(habit.id)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title={habit.active ? "Archivar" : "Restaurar"}
              >
                {habit.active ? <Archive className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

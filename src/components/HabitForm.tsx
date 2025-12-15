import React, { useState } from 'react';
import { NewHabit } from '../types';

interface HabitFormProps {
  onSubmit: (habit: NewHabit) => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<NewHabit['category']>('other');
  const [frequency, setFrequency] = useState<NewHabit['frequency']>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title,
      description,
      category,
      frequency
    });
    
    setTitle('');
    setDescription('');
    setCategory('other');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="Ej: Leer 30 minutos"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="Detalles opcionales..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as NewHabit['category'])}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="health">Salud</option>
            <option value="productivity">Productividad</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="learning">Aprendizaje</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Frecuencia</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as NewHabit['frequency'])}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="daily">Diario</option>
            <option value="weekly">Semanal</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
      >
        Crear Hábito
      </button>
    </form>
  );
};

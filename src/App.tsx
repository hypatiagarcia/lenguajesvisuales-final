import React, { useState } from 'react';
import { LayoutDashboard, Plus, CheckCircle2, XCircle, BarChart3, Search } from 'lucide-react';
import { HabitList } from './components/HabitList';
import { HabitForm } from './components/HabitForm';
import { ProgressChart } from './components/ProgressChart';
import { useHabits } from './hooks/useHabits';

function App() {
  const { habits, addHabit, toggleHabit, deleteHabit, getWeeklyProgress } = useHabits();
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredHabits = habits.filter(habit => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? habit.active :
      !habit.active;
    
    const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-indigo-600" />
              Zen Habit Tracker
            </h1>
            <p className="text-slate-500 mt-1">Construye tu mejor versión, un día a la vez.</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Nuevo Hábito
          </button>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              Progreso Semanal
            </h2>
            <div className="h-64 w-full">
              <ProgressChart data={getWeeklyProgress()} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center space-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {habits.filter(h => h.completedDates.includes(new Date().toISOString().split('T')[0])).length}
            </h3>
            <p className="text-slate-500">Hábitos completados hoy</p>
          </div>
        </section>

        {/* Main Content */}
        <main className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <h2 className="font-semibold text-slate-700">Mis Hábitos</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar hábito..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-48"
                />
              </div>

              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
                <button 
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'active' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Activos
                </button>
                <button 
                  onClick={() => setFilter('archived')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'archived' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Archivados
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <HabitList 
              habits={filteredHabits} 
              onToggle={toggleHabit} 
              onDelete={deleteHabit}
            />
          </div>
        </main>

        {/* Modal Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Crear Nuevo Hábito</h2>
              <HabitForm onSubmit={(habit) => {
                addHabit(habit);
                setIsFormOpen(false);
              }} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;

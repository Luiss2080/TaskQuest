import { useState, useEffect } from 'react'
import { Store, Trophy, Timer, Medal } from 'lucide-react'
import TaskList from './components/TaskList'
import Shop from './components/Shop'
import CharacterPanel from './components/CharacterPanel'

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'shop' | 'pomodoro' | 'achievements'>('tasks')

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="min-h-screen pb-12 font-sans relative">
      <div className="crt-overlay"></div>
      
      <header className="border-b border-quest-border bg-quest-dark/80 backdrop-blur-md p-4 sticky top-0 z-40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <h1 className="text-3xl font-gaming text-transparent bg-clip-text bg-gradient-to-r from-quest-neonCyan to-quest-neonPink tracking-tighter" style={{ textShadow: '0 0 10px rgba(0,243,255,0.5)' }}>
            TASK_QUEST OS v3.0
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 mt-6 relative z-10">
        
        <CharacterPanel />

        <div className="flex flex-wrap gap-2 mb-8 bg-black/50 border border-quest-border p-1 w-full mx-auto">
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          >
            <Trophy className="w-5 h-5" /> Misiones
          </button>
          <button 
            onClick={() => setActiveTab('shop')}
            className={`tab-btn ${activeTab === 'shop' ? 'active' : ''}`}
          >
            <Store className="w-5 h-5" /> Tienda
          </button>
          <button 
            onClick={() => setActiveTab('pomodoro')}
            className={`tab-btn ${activeTab === 'pomodoro' ? 'active' : ''}`}
          >
            <Timer className="w-5 h-5" /> Focus
          </button>
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          >
            <Medal className="w-5 h-5" /> Logros
          </button>
        </div>

        {activeTab === 'tasks' && <TaskList />}
        {activeTab === 'shop' && <Shop />}
        {activeTab === 'pomodoro' && <div className="text-center p-12 text-quest-neonCyan font-gaming">Módulo en construcción...</div>}
        {activeTab === 'achievements' && <div className="text-center p-12 text-quest-neonPink font-gaming">Módulo en construcción...</div>}
      </main>
    </div>
  )
}

export default App

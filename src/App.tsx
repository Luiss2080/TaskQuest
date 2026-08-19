import { useState, useEffect } from 'react'
import { Store, Sword, Trophy, Moon, Sun } from 'lucide-react'
import { useStore } from './store/useStore'
import TaskList from './components/TaskList'
import Shop from './components/Shop'

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'shop'>('tasks')
  const [darkMode, setDarkMode] = useState(true)
  const { level, xp, coins } = useStore()

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  const xpRequired = level * 100;
  const progress = (xp / xpRequired) * 100;

  return (
    <div className="min-h-screen pb-12">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-quest-card/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Sword className="text-quest-secondary w-8 h-8" />
            <h1 className="text-2xl font-gaming text-quest-primary tracking-tighter">TaskQuest</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Nivel</div>
              <div className="text-xl font-bold text-quest-secondary">{level}</div>
            </div>
            
            <div className="w-32 sm:w-48">
              <div className="flex justify-between text-xs mb-1 font-bold">
                <span className="text-gray-500">XP</span>
                <span className="text-quest-primary">{xp} / {xpRequired}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-quest-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="text-center bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-lg">
              <div className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-wider">Monedas</div>
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{coins}</div>
            </div>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-6">
        <div className="flex gap-2 mb-8 bg-gray-200 dark:bg-gray-800 p-1 rounded-xl w-full max-w-sm mx-auto">
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'tasks' ? 'bg-white dark:bg-quest-card shadow-sm text-quest-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <Trophy className="w-4 h-4" /> Misiones
          </button>
          <button 
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'shop' ? 'bg-white dark:bg-quest-card shadow-sm text-yellow-500' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <Store className="w-4 h-4" /> Tienda
          </button>
        </div>

        {activeTab === 'tasks' ? <TaskList /> : <Shop />}
      </main>
    </div>
  )
}

export default App

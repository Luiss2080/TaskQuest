import { useState, useEffect } from 'react'
import { Store, Trophy, Timer, Medal, Settings, Moon, Sun, Backpack, Swords } from 'lucide-react'
import TaskList from './components/TaskList'
import Shop from './components/Shop'
import CharacterPanel from './components/CharacterPanel'
import Pomodoro from './components/Pomodoro'
import Achievements from './components/Achievements'
import Inventory from './components/Inventory'
import SettingsPanel from './components/SettingsPanel'
import ToastContainer from './components/ToastContainer'

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'shop' | 'pomodoro' | 'achievements' | 'inventory' | 'settings'>('tasks')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  const menuItems = [
    { id: 'tasks', label: 'Misiones', icon: <Trophy className="w-5 h-5" /> },
    { id: 'pomodoro', label: 'Focus', icon: <Timer className="w-5 h-5" /> },
    { id: 'shop', label: 'Tienda', icon: <Store className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventario', icon: <Backpack className="w-5 h-5" /> },
    { id: 'achievements', label: 'Logros', icon: <Medal className="w-5 h-5" /> },
    { id: 'settings', label: 'Opciones', icon: <Settings className="w-5 h-5" /> },
  ] as const

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <ToastContainer />
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-quest-card/90 backdrop-blur-xl border-r border-gray-200 dark:border-quest-border flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-gray-200 dark:border-quest-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-quest-neon-cyan to-blue-600 rounded-xl shadow-neon-cyan">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-gaming font-bold text-transparent bg-clip-text bg-gradient-to-r from-quest-neon-cyan to-quest-neon-pink">
              TaskQuest
            </h1>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors md:hidden">
            {darkMode ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>
        </div>
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto flex flex-row md:flex-col gap-2 md:gap-0 overflow-x-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item whitespace-nowrap md:whitespace-normal flex-shrink-0 ${activeTab === item.id ? 'active' : ''}`}
            >
              {item.icon} <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Theme Toggle Desktop */}
        <div className="hidden md:flex p-4 border-t border-gray-200 dark:border-quest-border items-center justify-between">
          <span className="text-sm font-bold text-gray-500">Tema</span>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            {darkMode ? <Sun className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-h-screen overflow-y-auto p-4 sm:p-8 relative z-10 bg-gray-50/50 dark:bg-quest-dark/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <CharacterPanel />

          <div className="pb-20">
            {activeTab === 'tasks' && <TaskList />}
            {activeTab === 'shop' && <Shop />}
            {activeTab === 'pomodoro' && <Pomodoro />}
            {activeTab === 'achievements' && <Achievements />}
            {activeTab === 'inventory' && <Inventory />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

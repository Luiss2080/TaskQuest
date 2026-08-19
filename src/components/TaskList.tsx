import { useState } from 'react'
import { Plus, Trash2, Check, ShieldAlert, ShieldCheck, Shield, Skull } from 'lucide-react'
import { useStore, Task } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useStore()
  const [text, setText] = useState('')
  const [difficulty, setDifficulty] = useState<Task['difficulty']>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addTask(text.trim(), difficulty)
    setText('')
  }

  const difficultyConfig = {
    easy: { icon: <Shield className="w-5 h-5 text-green-500" />, label: 'Fácil (+10 XP)', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
    medium: { icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, label: 'Media (+25 XP)', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
    hard: { icon: <ShieldAlert className="w-5 h-5 text-purple-500" />, label: 'Difícil (+50 XP)', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' },
    epic: { icon: <Skull className="w-5 h-5 text-red-500" />, label: 'Épica (+100 XP)', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Nueva Misión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="¿Qué bestia (tarea) derrotarás hoy?"
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-quest-primary outline-none"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(difficultyConfig) as Task['difficulty'][]).map(diff => (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors flex items-center gap-1 ${difficulty === diff ? difficultyConfig[diff].bg : 'border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  {difficultyConfig[diff].icon}
                  <span className={difficulty === diff ? difficultyConfig[diff].color : ''}>
                    {difficultyConfig[diff].label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
            <button type="submit" className="relative px-6 py-3 bg-quest-neon-cyan text-white font-bold rounded-xl transition-all duration-300 hover:bg-cyan-600 hover:shadow-neon-cyan flex items-center justify-center gap-2 w-full sm:w-auto">
              <Plus className="w-5 h-5" /> Añadir Misión
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {tasks.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8 text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
              No tienes misiones activas. ¡Añade una para ganar XP!
            </motion.div>
          ) : (
            tasks.sort((a, b) => Number(a.completed) - Number(b.completed) || b.createdAt - a.createdAt).map(task => {
              const config = difficultyConfig[task.difficulty];
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`card p-3 sm:p-4 flex items-center gap-4 transition-all ${task.completed ? 'opacity-50 grayscale' : ''}`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-colors ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 text-transparent hover:border-green-500 hover:text-green-200'}`}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-lg truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.text}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {config.icon}
                      <span className={`text-xs font-bold ${config.color}`}>{config.label}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

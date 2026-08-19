import { useState } from 'react'
import { Plus, Trash2, Check, ShieldAlert, ShieldCheck, Shield, Skull } from 'lucide-react'
import { useStore, Task } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function ListaMisiones() {
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
    easy: { icon: <Shield className="w-5 h-5" />, label: 'Fácil', color: 'text-green-400', bg: 'bg-green-500/20' },
    medium: { icon: <ShieldCheck className="w-5 h-5" />, label: 'Media', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    hard: { icon: <ShieldAlert className="w-5 h-5" />, label: 'Difícil', color: 'text-purple-400', bg: 'bg-purple-500/20' },
    epic: { icon: <Skull className="w-5 h-5" />, label: 'Épica', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-rose-900 rounded-[2rem] p-6 shadow-xl border border-white/5">
          <h2 className="text-xl font-bold mb-4 text-white">Nueva Partida</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="¿Qué misión cumplirás?"
              className="w-full p-4 bg-rose-950 border border-white/10 rounded-2xl focus:border-rose-500 outline-none text-white placeholder-white/30"
            />
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(difficultyConfig) as Task['difficulty'][]).map(diff => (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-3 rounded-xl text-sm font-bold border transition-all flex flex-col items-center gap-2 ${difficulty === diff ? `border-transparent ${difficultyConfig[diff].bg} ${difficultyConfig[diff].color}` : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                >
                  {difficultyConfig[diff].icon}
                  <span>{difficultyConfig[diff].label}</span>
                </button>
              ))}
            </div>
            <button type="submit" className="relative mt-2 py-4 px-6 bg-rose-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Añadir
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 bg-rose-900 rounded-[2rem] p-6 shadow-xl border border-white/5 flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-white">Misiones Activas</h2>
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          <AnimatePresence>
            {tasks.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center text-white/30 font-bold border-2 border-dashed border-white/10 rounded-3xl p-8 text-center">
                El mapa está despejado. Añade una misión.
              </motion.div>
            ) : (
              tasks.sort((a, b) => Number(a.completed) - Number(b.completed) || b.createdAt - a.createdAt).map(task => {
                const config = difficultyConfig[task.difficulty];
                return (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, height: 0, margin: 0 }}
                    className={`bg-rose-950 border border-white/5 p-4 rounded-2xl flex items-center gap-4 transition-all ${task.completed ? 'opacity-40 grayscale' : 'hover:border-white/20'}`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 flex-shrink-0 transition-all
                        ${task.completed ? 'bg-rose-500 border-rose-500 text-white' : 'border-white/20 text-transparent hover:border-rose-500 hover:text-rose-500'}`}
                    >
                      <Check className="w-6 h-6" />
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-lg truncate text-white ${task.completed ? 'line-through' : ''}`}>
                        {task.text}
                      </p>
                      <div className={`flex items-center gap-1 mt-1 text-xs font-bold ${config.color}`}>
                        {config.label}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-3 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all flex-shrink-0"
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
    </div>
  )
}

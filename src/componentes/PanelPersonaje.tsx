import { useStore } from '../store/useStore'
import { Heart, Coins, Star, Trophy, Target } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PanelPersonaje() {
  const { level, xp, coins, health, maxHealth, playerClass, tasks, user } = useStore()
  
  const xpRequired = level * 100
  const progress = (xp / xpRequired) * 100
  const hpProgress = (health / maxHealth) * 100
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length

  return (
    <div className="h-full bg-rose-950 rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col items-center p-8 relative overflow-hidden">
      {/* Efecto de luz de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full filter blur-[120px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

      {/* Avatar Destacado */}
      <div className="relative group z-10 mt-4 mb-6">
        <motion.div whileHover={{ scale: 1.05 }} className="w-40 h-40 rounded-[2rem] bg-rose-900 border-4 border-rose-500/30 p-2 shadow-[0_0_40px_rgba(244,63,94,0.3)] overflow-hidden cursor-pointer relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover drop-shadow-2xl relative z-10" />
        </motion.div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white font-bold text-sm px-6 py-2 rounded-xl shadow-xl border border-white/20 whitespace-nowrap">
          NIVEL {level}
        </div>
      </div>

      {/* Nombres y Títulos */}
      <div className="text-center space-y-2 z-10 mb-8 mt-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">{user ?? 'Player_One'}</h2>
        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full text-sm font-bold text-rose-400 border border-white/5">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
          {playerClass}
        </div>
      </div>

      {/* Dinero rápido */}
      <div className="w-full flex justify-center mb-8 z-10">
        <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 px-6 py-3 rounded-2xl text-yellow-400 font-bold shadow-inner">
          <Coins className="w-6 h-6" /> <span className="text-2xl">{coins} CR</span>
        </div>
      </div>

      {/* Stats Detallados Verticales */}
      <div className="w-full space-y-5 z-10 flex-1">
        {/* Salud */}
        <div className="bg-black/20 p-5 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex justify-between text-sm font-bold mb-3 text-white/80">
            <span className="flex items-center gap-2 uppercase tracking-wider"><Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Salud</span>
            <span className="text-rose-200">{health} / {maxHealth}</span>
          </div>
          <div className="h-4 bg-rose-950 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-rose-500 transition-all duration-500 ease-out" style={{ width: `${hpProgress}%` }} />
          </div>
        </div>

        {/* XP */}
        <div className="bg-black/20 p-5 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex justify-between text-sm font-bold mb-3 text-white/80">
            <span className="flex items-center gap-2 uppercase tracking-wider"><Star className="w-4 h-4 text-blue-400 fill-blue-400" /> XP</span>
            <span className="text-blue-200">{xp} / {xpRequired}</span>
          </div>
          <div className="h-4 bg-rose-950 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-blue-500 transition-all duration-500 ease-out relative" style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Resumen Inferior */}
      <div className="w-full grid grid-cols-2 gap-4 mt-4 z-10">
        <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
          <Target className="w-6 h-6 text-white/50 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{completedTasks}/{totalTasks}</p>
          <p className="text-xs text-white/50 uppercase font-bold">Misiones</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
          <Trophy className="w-6 h-6 text-white/50 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{level}</p>
          <p className="text-xs text-white/50 uppercase font-bold">Rango</p>
        </div>
      </div>
    </div>
  )
}

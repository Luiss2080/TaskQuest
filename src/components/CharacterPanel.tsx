import { useStore } from '../store/useStore'
import { Heart, Coins, Star } from 'lucide-react'

export default function CharacterPanel() {
  const { level, xp, coins, health, maxHealth, playerClass, user } = useStore()
  
  const xpRequired = level * 100
  const progress = (xp / xpRequired) * 100
  const hpProgress = (health / maxHealth) * 100

  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-8 mb-6 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-quest-neon-cyan via-quest-neon-pink to-quest-neon-cyan opacity-50"></div>
      
      <div className="relative group cursor-pointer">
        <div className="w-28 h-28 rounded-2xl border-2 border-quest-neon-cyan/50 bg-slate-900 p-2 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all overflow-hidden flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=cyber" alt="Avatar" className="w-full h-full object-cover relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-quest-neon-pink text-white font-bold text-sm px-3 py-1.5 rounded-xl border border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5)] transform rotate-3">
          NIVEL {level}
        </div>
      </div>

      <div className="flex-1 w-full space-y-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-3xl font-gaming text-gray-800 dark:text-white tracking-tight">{user ?? 'Player_One'}</h2>
            <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 bg-cyan-500/10 text-quest-neon-cyan rounded-lg text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-quest-neon-cyan animate-pulse"></span>
              {playerClass}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl text-yellow-600 dark:text-yellow-400 font-bold shadow-inner">
            <Coins className="w-6 h-6" /> <span className="text-xl">{coins}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* HP Bar */}
          <div className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between text-xs font-bold mb-2 text-red-500">
              <span className="flex items-center gap-1.5 uppercase tracking-wider"><Heart className="w-4 h-4" /> Salud</span>
              <span className="bg-red-500/10 px-2 py-0.5 rounded-md">{health} / {maxHealth}</span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 ease-out" style={{ width: `${hpProgress}%` }} />
            </div>
          </div>

          {/* XP Bar */}
          <div className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between text-xs font-bold mb-2 text-quest-neon-cyan">
              <span className="flex items-center gap-1.5 uppercase tracking-wider"><Star className="w-4 h-4" /> Experiencia</span>
              <span className="bg-cyan-500/10 px-2 py-0.5 rounded-md">{xp} / {xpRequired}</span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

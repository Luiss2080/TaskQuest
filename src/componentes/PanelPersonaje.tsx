import { useStore } from '../store/useStore'
import { Heart, Coins, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PanelPersonaje() {
  const { level, xp, coins, health, maxHealth, playerClass } = useStore()
  
  const xpRequired = level * 100
  const progress = (xp / xpRequired) * 100
  const hpProgress = (health / maxHealth) * 100

  return (
    <div className="bg-gradient-to-br from-rose-900 to-rose-950 rounded-[2rem] p-6 shadow-xl border border-white/5 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="relative group z-10">
        <motion.div whileHover={{ scale: 1.05 }} className="w-32 h-32 rounded-3xl bg-rose-950 border-4 border-rose-500/30 p-2 shadow-[0_0_30px_rgba(244,63,94,0.2)] overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover drop-shadow-2xl" />
        </motion.div>
        <div className="absolute -bottom-3 -right-3 bg-rose-500 text-white font-bold text-sm px-4 py-1.5 rounded-xl shadow-lg border border-white/20">
          LVL {level}
        </div>
      </div>

      <div className="flex-1 w-full space-y-6 z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Player_One</h2>
            <span className="bg-rose-950 px-3 py-1 rounded-full text-xs font-bold text-rose-400 border border-white/5">
              {playerClass}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-rose-950 border border-white/5 px-4 py-2 rounded-2xl text-yellow-400 font-bold shadow-inner">
            <Coins className="w-5 h-5" /> <span className="text-xl">{coins}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/50 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between text-xs font-bold mb-2 text-white/70">
              <span className="flex items-center gap-2 uppercase"><Heart className="w-4 h-4 text-rose-500" /> Salud</span>
              <span>{health} / {maxHealth}</span>
            </div>
            <div className="h-3 bg-rose-950 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 transition-all duration-500 ease-out" style={{ width: `${hpProgress}%` }} />
            </div>
          </div>

          <div className="bg-rose-950/50 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between text-xs font-bold mb-2 text-white/70">
              <span className="flex items-center gap-2 uppercase"><Star className="w-4 h-4 text-blue-400" /> Experiencia</span>
              <span>{xp} / {xpRequired}</span>
            </div>
            <div className="h-3 bg-rose-950 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

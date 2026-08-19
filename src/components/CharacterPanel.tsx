import { useStore } from '../store/useStore'
import { Heart, Coins, Star } from 'lucide-react'

export default function CharacterPanel() {
  const { level, xp, coins, health, maxHealth, playerClass } = useStore()
  
  const xpRequired = level * 100
  const progress = (xp / xpRequired) * 100
  const hpProgress = (health / maxHealth) * 100

  return (
    <div className="card border-quest-neonCyan/30 mb-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-none border-2 border-quest-neonCyan bg-black p-2 shadow-neon-cyan flex items-center justify-center">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=cyber" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-3 -right-3 bg-quest-neonPink text-black font-gaming text-xs px-2 py-1 border border-black shadow-neon-pink">
          LVL {level}
        </div>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-gaming text-white uppercase tracking-wider">Player_One</h2>
            <p className="text-quest-neonCyan text-sm font-bold tracking-widest">{playerClass}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-quest-neonYellow font-bold">
              <Coins className="w-5 h-5" /> {coins} CREDITS
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1 text-red-400">
            <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> HP (INTEGRIDAD)</span>
            <span>{health} / {maxHealth}</span>
          </div>
          <div className="h-3 bg-gray-900 border border-red-900/50 p-[1px]">
            <div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-300" style={{ width: `${hpProgress}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1 text-quest-neonCyan">
            <span className="flex items-center gap-1"><Star className="w-3 h-3" /> XP (EXPERIENCIA)</span>
            <span>{xp} / {xpRequired}</span>
          </div>
          <div className="h-3 bg-gray-900 border border-quest-neonCyan/50 p-[1px]">
            <div className="h-full bg-quest-neonCyan shadow-neon-cyan transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

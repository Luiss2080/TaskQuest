import { useStore } from '../store/useStore'
import { Medal, Star, Zap, Shield, Crown } from 'lucide-react'

export default function Achievements() {
  const { level, coins, tasks } = useStore()

  const completedTasks = tasks.filter(t => t.completed).length

  const achievements = [
    { id: 1, title: 'Iniciado', desc: 'Alcanza el Nivel 2', unlocked: level >= 2, icon: <Star className="w-8 h-8" />, color: 'text-quest-neonCyan' },
    { id: 2, title: 'Cibernauta', desc: 'Alcanza el Nivel 10', unlocked: level >= 10, icon: <Crown className="w-8 h-8" />, color: 'text-quest-neonYellow' },
    { id: 3, title: 'Máquina', desc: 'Completa 5 misiones', unlocked: completedTasks >= 5, icon: <Zap className="w-8 h-8" />, color: 'text-quest-neonPink' },
    { id: 4, title: 'Millonario', desc: 'Acumula 200 Créditos', unlocked: coins >= 200, icon: <Shield className="w-8 h-8" />, color: 'text-quest-neonGreen' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-gaming text-quest-neonPink mb-2">Salón de la Fama</h2>
        <p className="text-gray-400">Desbloquea medallas demostrando tu valía.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map(a => (
          <div key={a.id} className={`card flex items-center gap-4 transition-all ${a.unlocked ? 'border-quest-neonPink/50 shadow-neon-pink bg-quest-neonPink/5' : 'opacity-50 grayscale'}`}>
            <div className={`p-4 bg-black border ${a.unlocked ? `border-quest-neonPink ${a.color}` : 'border-gray-700 text-gray-600'}`}>
              {a.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">{a.title}</h3>
              <p className="text-sm text-gray-400">{a.desc}</p>
            </div>
            <div className="ml-auto">
              {a.unlocked ? <Medal className="w-6 h-6 text-quest-neonYellow drop-shadow-[0_0_5px_rgba(255,230,0,0.8)]" /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

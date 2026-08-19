import { useStore } from '../store/useStore'
import { Medal, Star, Zap, Shield, Crown } from 'lucide-react'

export default function Logros() {
  const { level, coins, tasks } = useStore()

  const completedTasks = tasks.filter(t => t.completed).length

  const logros = [
    { id: 1, title: 'Iniciado', desc: 'Alcanza el Nivel 2', unlocked: level >= 2, icon: <Star className="w-8 h-8" />, color: 'text-blue-400' },
    { id: 2, title: 'Cibernauta', desc: 'Alcanza el Nivel 10', unlocked: level >= 10, icon: <Crown className="w-8 h-8" />, color: 'text-yellow-400' },
    { id: 3, title: 'Máquina', desc: 'Completa 5 misiones', unlocked: completedTasks >= 5, icon: <Zap className="w-8 h-8" />, color: 'text-bento-accent' },
    { id: 4, title: 'Millonario', desc: 'Acumula 200 Créditos', unlocked: coins >= 200, icon: <Shield className="w-8 h-8" />, color: 'text-green-400' },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Salón de la Fama</h2>
        <p className="text-white/50">Tus hazañas y recompensas permanentes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {logros.map(a => (
          <div key={a.id} className={`bento-card flex items-center gap-6 transition-all ${a.unlocked ? 'bg-bento-sidebar border-white/10' : 'opacity-40 grayscale bg-transparent border-dashed border-2 border-white/10'}`}>
            <div className={`p-5 rounded-3xl ${a.unlocked ? `bg-bento-window shadow-inner border border-white/5 ${a.color}` : 'bg-black/20 text-white/30'}`}>
              {a.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{a.title}</h3>
              <p className="text-sm text-white/50">{a.desc}</p>
            </div>
            <div className="pr-4">
              {a.unlocked ? <Medal className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

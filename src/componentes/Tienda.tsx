import { Store, Coffee, Gamepad2, Tv, Pizza, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useStore, Reward } from '../store/useStore'
import { motion } from 'framer-motion'

export default function Tienda() {
  const { coins, buyReward } = useStore()
  const [customRewards, setCustomRewards] = useState<Reward[]>([
    { id: '1', title: '1 Hora de Netflix', cost: 50, icon: 'Tv' },
    { id: '2', title: 'Partida de Valorant', cost: 30, icon: 'Gamepad2' },
    { id: '3', title: 'Comida Especial', cost: 100, icon: 'Pizza' },
    { id: '4', title: 'Descanso Libre', cost: 15, icon: 'Coffee' },
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newCost, setNewCost] = useState(10)

  const handleBuy = (reward: Reward) => {
    buyReward(reward)
  }

  const addReward = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || newCost <= 0) return
    setCustomRewards([...customRewards, { id: crypto.randomUUID(), title: newTitle, cost: newCost, icon: 'Store' }])
    setNewTitle('')
    setNewCost(10)
  }

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Tv': return <Tv className="w-8 h-8" />
      case 'Gamepad2': return <Gamepad2 className="w-8 h-8" />
      case 'Pizza': return <Pizza className="w-8 h-8" />
      case 'Coffee': return <Coffee className="w-8 h-8" />
      default: return <Store className="w-8 h-8" />
    }
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Mercado Negro</h2>
          <p className="text-white/50">Intercambia créditos por recompensas del mundo real.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Formulario Añadir */}
        <div className="bento-card border-dashed border-2 border-white/20 bg-transparent flex flex-col justify-center">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-bento-accent" /> Nuevo Ítem
          </h3>
          <form onSubmit={addReward} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre del ítem..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white text-sm"
            />
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Valor"
                value={newCost}
                onChange={(e) => setNewCost(Number(e.target.value))}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white text-sm"
              />
              <button type="submit" className="bento-btn py-3 px-4 rounded-xl">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {customRewards.map((reward) => (
          <motion.div whileHover={{ y: -5 }} key={reward.id} className="bento-card bg-bento-sidebar flex flex-col items-center text-center relative group">
            <button 
              onClick={() => setCustomRewards(customRewards.filter(r => r.id !== reward.id))}
              className="absolute top-4 right-4 p-2 text-white/30 hover:text-bento-accent opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="text-bento-accent mb-4 bg-bento-window p-4 rounded-3xl border border-white/5">
              {renderIcon(reward.icon)}
            </div>
            <h3 className="font-bold text-lg text-white mb-6 leading-tight">{reward.title}</h3>
            
            <div className="mt-auto w-full">
              <button 
                onClick={() => handleBuy(reward)}
                disabled={coins < reward.cost}
                className={`w-full py-3 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all ${coins >= reward.cost ? 'bg-white text-bento-sidebar hover:scale-105' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
              >
                Comprar <span className="opacity-80 text-sm">{reward.cost} CR</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

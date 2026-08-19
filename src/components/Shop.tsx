import { Store, Coffee, Gamepad2, Tv, Pizza, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useStore, Reward } from '../store/useStore'
import { motion } from 'framer-motion'

export default function Shop() {
  const { coins, buyReward } = useStore()
  const [customRewards, setCustomRewards] = useState<Reward[]>([
    { id: '1', title: '1 Hora de Series', cost: 50, icon: 'Tv' },
    { id: '2', title: '30 Min. Videojuegos', cost: 30, icon: 'Gamepad2' },
    { id: '3', title: 'Comida Especial', cost: 100, icon: 'Pizza' },
    { id: '4', title: 'Descanso 15 Min.', cost: 15, icon: 'Coffee' },
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newCost, setNewCost] = useState(10)

  const handleBuy = (cost: number) => {
    const success = buyReward(cost)
    if (success) {
      alert('¡Recompensa comprada con éxito!')
    } else {
      alert('No tienes suficientes monedas.')
    }
  }

  const addReward = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || newCost <= 0) return
    setCustomRewards([...customRewards, { id: crypto.randomUUID(), title: newTitle, cost: newCost, icon: 'Store' }])
    setNewTitle('')
    setNewCost(10)
  }

  const removeReward = (id: string) => {
    setCustomRewards(customRewards.filter(r => r.id !== id))
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-gaming text-yellow-500 mb-2">Mercado Épico</h2>
        <p className="text-gray-500 dark:text-gray-400">Gasta tus monedas ganadas en recompensas de la vida real.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customRewards.map((reward) => (
          <motion.div whileHover={{ scale: 1.02 }} key={reward.id} className="card flex flex-col items-center text-center relative group">
            <button 
              onClick={() => removeReward(reward.id)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="text-purple-500 mb-4 bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
              {renderIcon(reward.icon)}
            </div>
            <h3 className="font-bold text-lg mb-4">{reward.title}</h3>
            <button 
              onClick={() => handleBuy(reward.cost)}
              disabled={coins < reward.cost}
              className={`w-full py-2 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors ${coins >= reward.cost ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}
            >
              Comprar <span>({reward.cost} <span className="text-xs uppercase">monedas</span>)</span>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="card max-w-md mx-auto">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-quest-primary" /> Crear Recompensa
        </h3>
        <form onSubmit={addReward} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Ej: Ver un episodio"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none"
          />
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Costo"
              value={newCost}
              onChange={(e) => setNewCost(Number(e.target.value))}
              className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

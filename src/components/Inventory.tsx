import { useStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageOpen, Utensils, MonitorPlay, Coffee, Sparkles } from 'lucide-react'

export default function Inventory() {
  const { inventory, consumeItem } = useStore()

  const handleConsume = (instanceId: string) => {
    if (confirm('¿Quieres consumir esta recompensa ahora?')) {
      consumeItem(instanceId)
    }
  }

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Tv': return <MonitorPlay className="w-8 h-8" />
      case 'Gamepad2': return <MonitorPlay className="w-8 h-8" />
      case 'Pizza': return <Utensils className="w-8 h-8" />
      case 'Coffee': return <Coffee className="w-8 h-8" />
      default: return <Sparkles className="w-8 h-8" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-gaming text-quest-neon-pink mb-2">Mi Inventario</h2>
        <p className="text-gray-500 dark:text-gray-400">Recompensas compradas listas para ser reclamadas.</p>
      </div>

      {inventory.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl text-gray-500">
          <PackageOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Tu inventario está vacío. ¡Ve a la tienda a comprar algo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {inventory.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key={item.instanceId}
                className="card flex flex-col items-center text-center relative border-quest-neon-pink/30 shadow-[0_0_15px_rgba(217,70,239,0.1)]"
              >
                <div className="text-white mb-4 bg-quest-neon-pink p-4 rounded-2xl shadow-neon-pink">
                  {renderIcon(item.icon)}
                </div>
                <h3 className="font-bold text-lg mb-4">{item.title}</h3>
                <button 
                  onClick={() => handleConsume(item.instanceId)}
                  className="w-full py-3 rounded-xl font-bold bg-quest-neon-pink hover:bg-fuchsia-600 text-white transition-colors shadow-neon-pink"
                >
                  Consumir Recompensa
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

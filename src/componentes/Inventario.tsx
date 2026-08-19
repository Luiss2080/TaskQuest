import { useStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageOpen, Sparkles } from 'lucide-react'

export default function Inventario() {
  const { inventory, consumeItem } = useStore()

  const handleConsume = (instanceId: string) => {
    consumeItem(instanceId)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Mi Inventario</h2>
        <p className="text-white/50">Tu colección de recompensas adquiridas.</p>
      </div>

      {inventory.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white/30 border-2 border-dashed border-white/10 rounded-4xl p-12">
          <PackageOpen className="w-20 h-20 mb-4 opacity-50" />
          <p className="text-xl font-bold">Mochila Vacía</p>
          <p className="text-sm">Ve a la tienda para conseguir loot.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {inventory.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                key={item.instanceId}
                className="bento-card bg-bento-accent/10 border-bento-accent/30 flex flex-col items-center text-center"
              >
                <div className="text-white mb-4 bg-bento-accent p-4 rounded-3xl shadow-[0_0_20px_rgba(255,71,87,0.4)]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-white mb-6">{item.title}</h3>
                <button 
                  onClick={() => handleConsume(item.instanceId)}
                  className="bento-btn w-full py-3 rounded-2xl"
                >
                  Usar Ahora
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

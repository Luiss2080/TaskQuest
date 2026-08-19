import { useStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, Zap } from 'lucide-react'

export default function ContenedorNotificaciones() {
  const { toasts, removeToast } = useStore()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-6 h-6 text-green-400" />
      case 'error': return <AlertCircle className="w-6 h-6 text-red-500" />
      case 'levelUp': return <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
      default: return <Info className="w-6 h-6 text-blue-400" />
    }
  }

  const getBorder = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-400/50 shadow-[0_0_20px_rgba(74,222,128,0.2)]'
      case 'error': return 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
      case 'levelUp': return 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]'
      default: return 'border-blue-400/50 shadow-[0_0_20px_rgba(96,165,250,0.2)]'
    }
  }

  return (
    <div className="absolute bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-4 bg-bento-window/95 backdrop-blur-xl p-5 rounded-2xl border-2 ${getBorder(toast.type)} min-w-[300px] cursor-pointer`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="bg-white/10 p-2 rounded-xl">
              {getIcon(toast.type)}
            </div>
            <p className={`font-bold ${toast.type === 'levelUp' ? 'text-yellow-400 uppercase tracking-widest text-xl' : 'text-white text-lg'}`}>
              {toast.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

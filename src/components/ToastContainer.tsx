import { useStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, Zap } from 'lucide-react'

export default function ToastContainer() {
  const { toasts, removeToast } = useStore()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-quest-neon-green" />
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'levelUp': return <Zap className="w-6 h-6 text-quest-neon-yellow animate-pulse" />
      default: return <Info className="w-5 h-5 text-quest-neon-cyan" />
    }
  }

  const getBorder = (type: string) => {
    switch (type) {
      case 'success': return 'border-quest-neon-green/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
      case 'error': return 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
      case 'levelUp': return 'border-quest-neon-yellow shadow-[0_0_20px_rgba(245,158,11,0.5)]'
      default: return 'border-quest-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border ${getBorder(toast.type)} min-w-[250px]`}
            onClick={() => removeToast(toast.id)}
          >
            {getIcon(toast.type)}
            <p className={`font-bold ${toast.type === 'levelUp' ? 'text-quest-neon-yellow uppercase tracking-wider text-lg' : 'text-white'}`}>
              {toast.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

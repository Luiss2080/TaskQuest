import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Brain, Coffee } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Temporizador() {
  const { addCoins, heal, addToast } = useStore()
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      if (mode === 'work') {
        addCoins(20)
        heal(10)
        addToast('¡Focus completado! +20 CR, +10 HP', 'success')
      } else {
        addToast('Descanso finalizado', 'info')
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode, addCoins, heal, addToast])

  const toggleTimer = () => setIsRunning(!isRunning)
  
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60)
  }

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode)
    setIsRunning(false)
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60)
  }

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const seconds = (timeLeft % 60).toString().padStart(2, '0')

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-rose-900/80 rounded-[2.5rem] shadow-2xl p-10 max-w-lg w-full text-center relative overflow-hidden border border-white/5">
        <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full filter blur-[120px] opacity-20 pointer-events-none ${mode === 'work' ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
        
        <h2 className="text-3xl font-bold text-white mb-8 z-10 relative">MODO ENFOQUE</h2>
        
        <div className="flex justify-center gap-4 mb-10 z-10 relative bg-rose-950 p-2 rounded-full mx-auto w-max">
          <button 
            onClick={() => switchMode('work')}
            className={`px-6 py-2 font-bold uppercase rounded-full transition-all flex items-center gap-2 ${mode === 'work' ? 'bg-rose-500 text-white shadow-lg' : 'text-white/50 hover:text-white'}`}
          >
            <Brain className="w-4 h-4" /> Trabajo
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`px-6 py-2 font-bold uppercase rounded-full transition-all flex items-center gap-2 ${mode === 'break' ? 'bg-blue-500 text-white shadow-lg' : 'text-white/50 hover:text-white'}`}
          >
            <Coffee className="w-4 h-4" /> Descanso
          </button>
        </div>

        <div className="text-8xl md:text-9xl font-bold text-white mb-12 z-10 relative tracking-tighter" style={{ textShadow: mode === 'work' ? '0 0 40px rgba(244,63,94,0.3)' : '0 0 40px rgba(59,130,246,0.3)' }}>
          {minutes}:{seconds}
        </div>

        <div className="flex justify-center gap-6 z-10 relative">
          <button onClick={toggleTimer} className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 ${mode === 'work' ? 'bg-rose-500 hover:bg-red-500' : 'bg-blue-500 hover:bg-blue-400'}`}>
            {isRunning ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
          </button>
          <button onClick={resetTimer} className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  )
}

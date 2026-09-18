import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Pomodoro() {
  const { addCoins, heal } = useStore()
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (mode === 'work') {
        addCoins(20)
        heal(10)
        alert('¡Focus completado! +20 Créditos, +10 HP')
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode, addCoins, heal])

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
    <div className="card max-w-md mx-auto text-center border-quest-neonGreen/30">
      <h2 className="text-2xl font-gaming text-quest-neonGreen mb-6">FOCUS MODE</h2>
      
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => switchMode('work')}
          className={`px-4 py-2 font-bold uppercase tracking-wider text-sm border transition-colors ${mode === 'work' ? 'border-quest-neonGreen text-quest-neonGreen bg-quest-neonGreen/10 shadow-neon-green' : 'border-quest-border text-gray-500'}`}
        >
          Trabajo
        </button>
        <button 
          onClick={() => switchMode('break')}
          className={`px-4 py-2 font-bold uppercase tracking-wider text-sm border transition-colors ${mode === 'break' ? 'border-quest-neonCyan text-quest-neonCyan bg-quest-neonCyan/10 shadow-neon-cyan' : 'border-quest-border text-gray-500'}`}
        >
          Descanso
        </button>
      </div>

      <div className="text-7xl font-gaming text-white mb-8" style={{ textShadow: mode === 'work' ? '0 0 20px rgba(57,255,20,0.5)' : '0 0 20px rgba(0,243,255,0.5)' }}>
        {minutes}:{seconds}
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={toggleTimer} className="btn-primary bg-quest-neonGreen text-black hover:bg-quest-neonGreen hover:text-white border-quest-neonGreen shadow-neon-green">
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button onClick={resetTimer} className="p-3 bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

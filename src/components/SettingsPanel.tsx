import { useStore } from '../store/useStore'
import { Download, Upload, Power } from 'lucide-react'

export default function SettingsPanel() {
  const { resetData, importData } = useStore()

  const handleExport = () => {
    const data = localStorage.getItem('taskquest-modern-storage')
    if (!data) return
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `taskquest_backup_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        if (parsed.state) {
          importData(parsed.state)
          alert('¡Datos importados correctamente!')
        }
      } catch (err) {
        alert('Error al leer el archivo de guardado.')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirm('⚠️ ¿ESTÁS SEGURO? Se borrará todo tu progreso, misiones, monedas y nivel. ¡Esto no se puede deshacer!')) {
      resetData()
      alert('Progreso reiniciado. Un nuevo comienzo...')
    }
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-gaming text-gray-400 mb-2">Sistema</h2>
        <p className="text-gray-500">Configuraciones de partida y gestión de datos.</p>
      </div>

      <div className="card space-y-6">
        <h3 className="text-xl font-bold border-b border-gray-200 dark:border-slate-700 pb-2">Gestión de Partida</h3>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
          <div>
            <h4 className="font-bold flex items-center gap-2"><Download className="w-5 h-5 text-quest-neon-cyan" /> Exportar Guardado</h4>
            <p className="text-sm text-gray-500">Guarda una copia de seguridad local.</p>
          </div>
          <button onClick={handleExport} className="relative px-6 py-3 bg-quest-neon-cyan text-white font-bold rounded-xl transition-all duration-300 hover:bg-cyan-600 hover:shadow-neon-cyan flex items-center justify-center gap-2 w-full sm:w-auto">
            <Download className="w-4 h-4" /> Exportar
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl relative">
          <div>
            <h4 className="font-bold flex items-center gap-2"><Upload className="w-5 h-5 text-quest-neon-pink" /> Importar Guardado</h4>
            <p className="text-sm text-gray-500">Carga un archivo .json previo.</p>
          </div>
          <label className="relative px-6 py-3 bg-quest-neon-pink text-white font-bold rounded-xl transition-all duration-300 hover:bg-fuchsia-600 hover:shadow-neon-pink flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer">
            <Upload className="w-4 h-4" /> Importar
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
          <div>
            <h4 className="font-bold text-red-600 dark:text-red-400">Peligro: Reset Total</h4>
            <p className="text-sm text-red-500/80">Borra todo y empieza de Nivel 1.</p>
          </div>
          <button onClick={handleReset} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2 transition-colors">
            <Power className="w-4 h-4" /> Resetear
          </button>
        </div>
      </div>
    </div>
  )
}

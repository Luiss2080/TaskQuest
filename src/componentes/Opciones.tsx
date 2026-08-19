import { useStore } from '../store/useStore'
import { Download, Upload, Power, Save } from 'lucide-react'

export default function Opciones() {
  const { resetData, importData, addToast } = useStore()

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
    addToast('Partida guardada localmente', 'success')
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
          addToast('Partida cargada exitosamente', 'success')
        }
      } catch (err) {
        addToast('Error al leer archivo', 'error')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirm('⚠️ ¿Estás seguro de querer borrar TODO tu progreso?')) {
      resetData()
      addToast('Progreso reiniciado por completo.', 'error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-full space-y-8">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-white mb-2">Sistema</h2>
        <p className="text-white/50">Gestiona tu archivo de guardado y opciones.</p>
      </div>

      <div className="bento-card bg-bento-sidebar border-white/5 space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Gestión de Datos</h3>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-5 bg-bento-window rounded-3xl border border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
              <Save className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white">Exportar Guardado</h4>
              <p className="text-sm text-white/50">Descarga un archivo de respaldo (.json).</p>
            </div>
          </div>
          <button onClick={handleExport} className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Exportar
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-5 bg-bento-window rounded-3xl border border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-2xl">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white">Importar Guardado</h4>
              <p className="text-sm text-white/50">Restaura un archivo de progreso previo.</p>
            </div>
          </div>
          <label className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5" /> Importar
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-5 bg-bento-accent/10 border border-bento-accent/30 rounded-3xl mt-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-bento-accent text-white rounded-2xl shadow-lg">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-bento-accent">Borrar Datos (Hard Reset)</h4>
              <p className="text-sm text-bento-accent/70">Pierdes todo de forma permanente.</p>
            </div>
          </div>
          <button onClick={handleReset} className="w-full sm:w-auto px-6 py-3 bg-bento-accent hover:bg-red-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(255,71,87,0.3)]">
            Resetear
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { LayoutGrid, Target, ShoppingBag, Backpack, Trophy, Settings, Search, Bell, Menu, Timer as TimerIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import PanelPersonaje from './componentes/PanelPersonaje'
import ListaMisiones from './componentes/ListaMisiones'
import Tienda from './componentes/Tienda'
import Inventario from './componentes/Inventario'
import Temporizador from './componentes/Temporizador'
import Logros from './componentes/Logros'
import Opciones from './componentes/Opciones'
import ContenedorNotificaciones from './componentes/ContenedorNotificaciones'

export default function Aplicacion() {
  const [pestanaActiva, setPestanaActiva] = useState('misiones')

  const menu = [
    { id: 'misiones', icon: <Target className="w-6 h-6" />, tooltip: 'Misiones' },
    { id: 'focus', icon: <TimerIcon className="w-6 h-6" />, tooltip: 'Focus' },
    { id: 'tienda', icon: <ShoppingBag className="w-6 h-6" />, tooltip: 'Tienda' },
    { id: 'inventario', icon: <Backpack className="w-6 h-6" />, tooltip: 'Inventario' },
    { id: 'logros', icon: <Trophy className="w-6 h-6" />, tooltip: 'Logros' },
    { id: 'opciones', icon: <Settings className="w-6 h-6" />, tooltip: 'Opciones' },
  ]

  return (
    <div className="w-screen h-screen flex gap-4 md:gap-6 p-4 md:p-6 overflow-hidden relative">
      <ContenedorNotificaciones />
      
      {/* ISLA 1: Sidebar Compacto Flotante */}
      <aside className="w-20 md:w-24 h-full bg-rose-950 rounded-[2rem] shadow-2xl flex flex-col items-center py-8 justify-between border border-white/5 z-20 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        <div className="flex flex-col gap-8 z-10">
          <div className="p-3 bg-rose-500 rounded-2xl shadow-[0_0_20px_rgba(244,63,94,0.4)] mx-auto cursor-pointer hover:scale-105 transition-transform">
            <LayoutGrid className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {menu.map(item => (
              <button
                key={item.id}
                onClick={() => setPestanaActiva(item.id)}
                className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer group relative flex justify-center items-center ${pestanaActiva === item.id ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-110' : 'text-rose-200 hover:bg-white/10 hover:text-white hover:scale-110'}`}
                title={item.tooltip}
              >
                {item.icon}
                <span className="absolute left-16 bg-white text-rose-950 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50 whitespace-nowrap">
                  {item.tooltip}
                </span>
              </button>
            ))}
          </div>
        </div>
        <button className="p-4 rounded-2xl text-rose-200 hover:bg-white/10 hover:text-white transition-all z-10 hover:scale-110">
          <Menu className="w-6 h-6" />
        </button>
      </aside>

      {/* Columna Central (Header + Contenido) */}
      <main className="flex-1 h-full flex flex-col gap-4 md:gap-6 overflow-hidden min-w-0">
        
        {/* ISLA 2: Header Flotante */}
        <header className="h-20 md:h-24 bg-rose-950 rounded-[2rem] shadow-xl px-6 md:px-8 flex justify-between items-center border border-white/5 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-wide">
              Buenas tardes, <span className="text-rose-400">JUGADOR</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6 z-10">
            <div className="hidden lg:flex bg-rose-900/50 px-5 py-3 rounded-2xl items-center gap-3 border border-white/5 focus-within:border-rose-500/50 transition-colors">
              <Search className="w-5 h-5 text-rose-300" />
              <input type="text" placeholder="Buscar comando..." className="bg-transparent border-none outline-none text-white placeholder-rose-300/50 w-48 font-medium" />
            </div>
            <button className="relative p-3 rounded-2xl bg-rose-900/50 border border-white/5 hover:bg-white/10 transition-colors">
              <Bell className="w-6 h-6 text-rose-300" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-rose-950 shadow-[0_0_10px_rgba(244,63,94,1)]"></span>
            </button>
          </div>
        </header>

        {/* ISLA 3: Área de Componentes (Ocupa todo el espacio restante) */}
        <div className="flex-1 bg-rose-950/40 rounded-[2.5rem] p-6 md:p-8 border border-white/5 overflow-y-auto shadow-inner relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pestanaActiva}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              {pestanaActiva === 'misiones' && <ListaMisiones />}
              {pestanaActiva === 'focus' && <Temporizador />}
              {pestanaActiva === 'tienda' && <Tienda />}
              {pestanaActiva === 'inventario' && <Inventario />}
              {pestanaActiva === 'logros' && <Logros />}
              {pestanaActiva === 'opciones' && <Opciones />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ISLA 4: Panel Lateral de Estadísticas (A la derecha, visible en pantallas grandes) */}
      <aside className="hidden lg:flex w-80 h-full flex-col gap-6 shrink-0">
        <PanelPersonaje />
      </aside>

      {/* Panel Personaje móvil si no hay espacio (mostrado debajo del header si fuera necesario, pero por ahora lo ocultamos en móvil para priorizar contenido, o se puede ver en opciones) */}
    </div>
  )
}

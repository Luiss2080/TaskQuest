import { useState } from 'react'
import { LayoutGrid, Target, ShoppingBag, Backpack, Trophy, Settings, Search, Bell, Menu } from 'lucide-react'
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
    <div className="w-[98vw] h-[96vh] md:w-[95vw] md:h-[90vh] bg-bento-window rounded-4xl md:rounded-5xl shadow-2xl flex overflow-hidden border border-white/10 relative">
      <ContenedorNotificaciones />
      
      {/* Sidebar Compacto */}
      <aside className="w-20 bg-bento-sidebar flex flex-col items-center py-8 justify-between border-r border-white/5 z-20">
        <div className="flex flex-col gap-8">
          <div className="p-3 bg-bento-accent rounded-2xl shadow-[0_0_20px_rgba(255,71,87,0.4)]">
            <LayoutGrid className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col gap-4">
            {menu.map(item => (
              <button
                key={item.id}
                onClick={() => setPestanaActiva(item.id)}
                className={`sidebar-icon group relative ${pestanaActiva === item.id ? 'active' : ''}`}
                title={item.tooltip}
              >
                {item.icon}
                <span className="absolute left-14 bg-white text-black px-2 py-1 rounded-md text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.tooltip}
                </span>
              </button>
            ))}
          </div>
        </div>
        <button className="sidebar-icon">
          <Menu className="w-6 h-6" />
        </button>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-24 px-8 flex justify-between items-center z-10">
          <div>
            <h1 className="text-2xl font-gaming font-bold text-white">
              Buenas tardes, <span className="text-bento-accent">JUGADOR</span>
            </h1>
            <p className="text-bento-muted text-sm">Tu aventura de productividad continúa.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex bg-bento-card px-4 py-2 rounded-full items-center gap-2 border border-white/10">
              <Search className="w-4 h-4 text-bento-muted" />
              <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm text-white placeholder-bento-muted/50 w-32" />
            </div>
            <button className="relative p-2 rounded-full bg-bento-card border border-white/10 hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-bento-muted" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-bento-accent rounded-full border-2 border-bento-window"></span>
            </button>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 bg-white/10 rounded-full border-2 border-bento-accent" />
          </div>
        </header>

        {/* Área de Componentes Interactivos */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col gap-6">
          <PanelPersonaje />
          
          <div className="flex-1 bg-bento-sidebar/50 rounded-4xl p-6 border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={pestanaActiva}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
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
        </div>
      </main>
    </div>
  )
}

function TimerIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}

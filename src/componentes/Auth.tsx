import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Swords, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Auth() {
  const { login, addToast } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return addToast('Completa todos los campos', 'error');

    setLoading(true);
    const endpoint = isLogin ? '/api/login' : '/api/register';

    try {
      // Usamos el puerto 3001 configurado en nuestro backend de Node
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        if (!isLogin) {
          addToast('Cuenta creada. Iniciando sesión...', 'success');
          setTimeout(() => login(username), 1000);
        } else {
          login(data.username);
        }
      } else {
        addToast(data.error || 'Error de autenticación', 'error');
      }
    } catch (err) {
      // Si el servidor de BD no responde, para no bloquear el UI (Fallback Offline Demo)
      console.error(err);
      addToast('Modo Offline: Servidor BD no detectado. Accediendo como Invitado', 'info');
      setTimeout(() => login(username || 'Jugador Invitado'), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0c0a0b]">
      {/* Elementos decorativos estilo isla flotante */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-rose-600 rounded-full blur-[150px] opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-rose-950/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-500 rounded-[1.5rem] shadow-[0_0_30px_rgba(244,63,94,0.4)] mx-auto flex items-center justify-center mb-6 transform -rotate-6">
            <Swords className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-wider">TASK<span className="text-rose-500">QUEST</span></h2>
          <p className="text-rose-200/60 mt-2">Productividad gamificada al siguiente nivel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-rose-200/80 ml-1">Jugador</label>
            <input 
              type="text" 
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-rose-900/50 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-rose-200/80 ml-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-rose-900/50 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:scale-105 group disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                {isLogin ? 'ENTRAR AL JUEGO' : 'CREAR AVATAR'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-rose-300 hover:text-white transition-colors text-sm font-medium"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate gratis' : '¿Ya eres jugador? Inicia sesión'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

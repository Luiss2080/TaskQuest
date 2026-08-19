import { motorSonidos } from '../utilidades/ServicioSonidos.js';

export class ComponentePomodoro {
    constructor(contenedorId, controlador) {
        this.contenedor = document.getElementById(contenedorId);
        this.controlador = controlador;
    }

    renderizar() {
        if (!this.contenedor) return;

        this.contenedor.innerHTML = `
            <div class="card dark:bg-slate-800 dark:text-white transition-colors duration-300">
                <h2 class="text-xl font-bold mb-4 flex items-center text-red-500">
                    <i class="fas fa-stopwatch mr-2"></i> Pomodoro Quest
                </h2>
                
                <div class="flex justify-center space-x-2 mb-4">
                    <button id="btn-modo-trabajo" class="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600 font-bold dark:bg-red-900 dark:text-red-300">Trabajo</button>
                    <button id="btn-modo-corto" class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900 dark:text-blue-300">Descanso Corto</button>
                    <button id="btn-modo-largo" class="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-600 font-bold dark:bg-purple-900 dark:text-purple-300">Descanso Largo</button>
                </div>
                
                <div class="text-center mb-6">
                    <div id="pomodoro-tiempo" class="text-5xl font-gaming text-gray-800 dark:text-white mb-2">25:00</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Recompensa: +30 XP</div>
                </div>
                
                <div class="flex justify-center space-x-3">
                    <button id="btn-pomo-iniciar" class="btn-primary flex-1">
                        <i class="fas fa-play mr-2"></i> Iniciar
                    </button>
                    <button id="btn-pomo-pausar" class="btn-secondary flex-1 hidden">
                        <i class="fas fa-pause mr-2"></i> Pausar
                    </button>
                    <button id="btn-pomo-reiniciar" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-3">
                        <i class="fas fa-redo-alt"></i>
                    </button>
                </div>
            </div>
        `;

        this.configurarEventos();
    }

    configurarEventos() {
        const btnIniciar = document.getElementById('btn-pomo-iniciar');
        const btnPausar = document.getElementById('btn-pomo-pausar');
        const btnReiniciar = document.getElementById('btn-pomo-reiniciar');
        
        const btnModoTrabajo = document.getElementById('btn-modo-trabajo');
        const btnModoCorto = document.getElementById('btn-modo-corto');
        const btnModoLargo = document.getElementById('btn-modo-largo');

        btnIniciar.addEventListener('click', () => {
            this.controlador.iniciar();
            motorSonidos._reproducirTono(500, 'sine', 0.1, 0.05); // blip
        });
        
        btnPausar.addEventListener('click', () => {
            this.controlador.pausar();
        });
        
        btnReiniciar.addEventListener('click', () => {
            this.controlador.reiniciar();
        });

        btnModoTrabajo.addEventListener('click', () => this.controlador.establecerModo('trabajo'));
        btnModoCorto.addEventListener('click', () => this.controlador.establecerModo('descanso_corto'));
        btnModoLargo.addEventListener('click', () => this.controlador.establecerModo('descanso_largo'));

        // Escuchar al controlador
        this.controlador.agregarObservador((estado) => this.actualizarUI(estado));
    }

    actualizarUI(estadoInfo) {
        const elTiempo = document.getElementById('pomodoro-tiempo');
        const btnIniciar = document.getElementById('btn-pomo-iniciar');
        const btnPausar = document.getElementById('btn-pomo-pausar');

        // Formatear tiempo
        const minutos = Math.floor(estadoInfo.tiempoRestante / 60).toString().padStart(2, '0');
        const segundos = (estadoInfo.tiempoRestante % 60).toString().padStart(2, '0');
        elTiempo.textContent = \`\${minutos}:\${segundos}\`;

        // Botones
        if (estadoInfo.estado === 'corriendo') {
            btnIniciar.classList.add('hidden');
            btnPausar.classList.remove('hidden');
        } else {
            btnIniciar.classList.remove('hidden');
            btnPausar.classList.add('hidden');
        }
    }
}

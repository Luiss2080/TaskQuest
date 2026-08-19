import { ServicioAnimaciones } from '../utilidades/animaciones.js';

export class ComponentePantallaCarga {
    constructor() {
        this.elemento = document.getElementById('pantalla-carga');
    }

    renderizar() {
        if (!this.elemento) {
            // Crear la pantalla si no existe en el HTML
            this.elemento = document.createElement('div');
            this.elemento.id = 'pantalla-carga';
            this.elemento.className = 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-white transition-opacity duration-500';
            this.elemento.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-gamepad text-6xl text-pink-600 mb-4 animate-bounce"></i>
                    <h1 class="text-4xl font-gaming text-indigo-400 mb-2">TaskQuest</h1>
                    <p class="text-gray-400 font-mono mb-6">Cargando partida...</p>
                    <div class="w-64 h-4 bg-gray-700 rounded-full overflow-hidden mx-auto">
                        <div id="barra-carga" class="h-full bg-gradient-to-r from-pink-500 to-indigo-500 w-0 transition-all duration-[2000ms] ease-out"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(this.elemento);
        }
    }

    iniciar() {
        this.renderizar();
        
        // Simular progreso de carga
        const barra = document.getElementById('barra-carga');
        setTimeout(() => {
            if (barra) barra.style.width = '100%';
        }, 100);

        // Ocultar después de la carga
        setTimeout(() => {
            this.ocultar();
        }, 2000); // 2 segundos de pantalla de carga
    }

    ocultar() {
        if (this.elemento) {
            this.elemento.style.opacity = '0';
            setTimeout(() => {
                this.elemento.style.display = 'none';
            }, 500); // Dar tiempo a la transición de opacidad
        }
    }
}

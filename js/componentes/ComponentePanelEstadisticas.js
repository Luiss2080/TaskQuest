// Componente de Panel de Estadísticas
export class ComponentePanelEstadisticas {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.elementosDOM = {};
    }

    /**
     * Renderiza el panel de estadísticas
     */
    renderizar() {
        if (!this.contenedor) return;

        this.contenedor.innerHTML = `
            <div class="card-jugador">
                <div class="text-center">
                    <div class="w-24 h-24 mx-auto bg-gradient-to-br from-pink-600 to-indigo-500 rounded-full flex items-center justify-center text-4xl mb-4">
                        <i class="fas fa-user-ninja"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Guerrero de Tareas</h3>
                    <div class="insignia-nivel">
                        Nivel <span id="panel-nivel">1</span>
                    </div>
                </div>
                
                <div class="mt-6 space-y-3">
                    <div class="flex justify-between">
                        <span class="opacity-75">Tareas completadas:</span>
                        <span id="panel-completadas" class="font-bold">0</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="opacity-75">Racha actual:</span>
                        <span id="panel-racha" class="font-bold">0 días</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="opacity-75">XP Total:</span>
                        <span id="panel-xp-total" class="font-bold">0</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="opacity-75">Tareas hoy:</span>
                        <span id="panel-tareas-hoy" class="font-bold">0</span>
                    </div>
                </div>
            </div>
        `;

        this.capturarElementos();
    }

    /**
     * Captura referencias a elementos DOM
     */
    capturarElementos() {
        this.elementosDOM = {
            nivel: document.getElementById('panel-nivel'),
            completadas: document.getElementById('panel-completadas'),
            racha: document.getElementById('panel-racha'),
            xpTotal: document.getElementById('panel-xp-total'),
            tareasHoy: document.getElementById('panel-tareas-hoy')
        };
    }

    /**
     * Actualiza todos los datos del panel
     * @param {object} datos 
     */
    actualizarDatos(datos) {
        if (this.elementosDOM.nivel) {
            this.elementosDOM.nivel.textContent = datos.nivel;
        }
        if (this.elementosDOM.completadas) {
            this.elementosDOM.completadas.textContent = datos.tareasCompletadas;
        }
        if (this.elementosDOM.racha) {
            this.elementosDOM.racha.textContent = `${datos.racha} días`;
        }
        if (this.elementosDOM.xpTotal) {
            this.elementosDOM.xpTotal.textContent = datos.xpTotal;
        }
        if (this.elementosDOM.tareasHoy) {
            this.elementosDOM.tareasHoy.textContent = datos.tareasHoy;
        }
    }
}

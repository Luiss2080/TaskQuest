// Componente de Quest Diaria
export class ComponenteQuestDiaria {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.elementosDOM = {};
    }

    /**
     * Renderiza la quest diaria
     */
    renderizar() {
        if (!this.contenedor) return;

        this.contenedor.innerHTML = `
            <div class="card bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <h3 class="text-xl font-bold mb-3 flex items-center">
                    <i class="fas fa-calendar-day mr-2 text-yellow-400"></i>
                    Quest Diaria
                </h3>
                <p class="text-sm mb-3" id="quest-descripcion">
                    Completa 3 tareas hoy para obtener un bonus de +50 XP
                </p>
                <div class="flex items-center space-x-2">
                    <div class="flex-1 contenedor-barra-progreso">
                        <div id="quest-barra" class="barra-progreso-diaria" style="width: 0%"></div>
                    </div>
                    <span id="quest-progreso" class="text-sm font-bold">0/3</span>
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
            descripcion: document.getElementById('quest-descripcion'),
            barra: document.getElementById('quest-barra'),
            progreso: document.getElementById('quest-progreso')
        };
    }

    /**
     * Actualiza el estado de la quest
     * @param {object} estado 
     */
    actualizarEstado(estado) {
        if (this.elementosDOM.barra) {
            this.elementosDOM.barra.style.width = `${estado.porcentajeProgreso}%`;
        }
        if (this.elementosDOM.progreso) {
            this.elementosDOM.progreso.textContent = `${estado.progreso}/${estado.meta}`;
        }
        if (this.elementosDOM.descripcion && estado.estaCompletada) {
            this.elementosDOM.descripcion.innerHTML = `
                <span class="text-green-400">✓ ¡Quest completada hoy!</span>
            `;
        }
    }
}

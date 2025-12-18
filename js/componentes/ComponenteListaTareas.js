// Componente de Lista de Tareas
import { CONFIGURACION_DIFICULTAD, ICONOS_CATEGORIA } from '../utilidades/constantes.js';

export class ComponenteListaTareas {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.callbackCompletar = null;
        this.callbackEliminar = null;
        this.callbackLimpiar = null;
    }

    /**
     * Renderiza la lista de tareas
     * @param {Array} tareas 
     */
    renderizar(tareas) {
        if (!this.contenedor) return;

        const htmlLista = tareas.length > 0 
            ? this.generarHTMLTareas(tareas)
            : this.generarHTMLVacio();

        this.contenedor.innerHTML = `
            <div class="card">
                <h2 class="text-2xl font-bold mb-4 flex items-center justify-between">
                    <span>
                        <i class="fas fa-list-check mr-3 text-purple-600"></i>
                        Misiones Activas
                    </span>
                    <button id="btn-limpiar-completadas" class="text-sm btn-secondary py-1 px-3">
                        <i class="fas fa-trash-alt mr-1"></i>
                        Limpiar
                    </button>
                </h2>
                
                <div id="contenedor-tareas" class="lista-items">
                    ${htmlLista}
                </div>
            </div>
        `;

        this.configurarEventos();
    }

    /**
     * Genera el HTML para las tareas
     * @param {Array} tareas 
     */
    generarHTMLTareas(tareas) {
        return tareas.map(tarea => this.generarHTMLTarea(tarea)).join('');
    }

    /**
     * Genera el HTML para una tarea individual
     * @param {object} tarea 
     */
    generarHTMLTarea(tarea) {
        const config = CONFIGURACION_DIFICULTAD[tarea.dificultad];
        const icono = ICONOS_CATEGORIA[tarea.categoria];
        const completadaClass = tarea.completada ? 'completada opacity-50' : '';
        const textoTachado = tarea.completada ? 'line-through' : '';
        const checkMarca = tarea.completada ? '<i class="fas fa-check text-white text-xs"></i>' : '';
        const botonClass = tarea.completada ? 'completado' : 'pendiente';

        return `
            <div class="task-item ${completadaClass}" data-tarea-id="${tarea.id}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3 flex-1">
                        <button 
                            class="btn-completar ${botonClass}" 
                            data-accion="completar"
                            data-id="${tarea.id}"
                        >
                            ${checkMarca}
                        </button>
                        
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-1">
                                <span class="text-lg">${icono}</span>
                                <span class="text-sm" style="color: ${config.color}">${config.estrellas}</span>
                            </div>
                            <p class="font-medium ${textoTachado}">${tarea.texto}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                        <div class="contenedor-estadisticas">
                            <div class="text-xs opacity-75">XP</div>
                            <div class="font-bold" style="color: ${config.color}">+${config.xp}</div>
                        </div>
                        <button 
                            class="text-red-500 hover:text-red-700 transition-colors"
                            data-accion="eliminar"
                            data-id="${tarea.id}"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Genera el HTML para cuando no hay tareas
     */
    generarHTMLVacio() {
        return `
            <div class="text-center py-12 opacity-50">
                <i class="fas fa-dragon text-6xl mb-4"></i>
                <p class="text-lg">No hay misiones activas. ¡Crea tu primera quest!</p>
            </div>
        `;
    }

    /**
     * Configura los eventos de la lista
     */
    configurarEventos() {
        const contenedorTareas = document.getElementById('contenedor-tareas');
        const btnLimpiar = document.getElementById('btn-limpiar-completadas');

        if (contenedorTareas) {
            contenedorTareas.addEventListener('click', (e) => {
                const boton = e.target.closest('[data-accion]');
                if (!boton) return;

                const accion = boton.dataset.accion;
                const id = boton.dataset.id;

                if (accion === 'completar' && this.callbackCompletar) {
                    this.callbackCompletar(id);
                } else if (accion === 'eliminar' && this.callbackEliminar) {
                    this.callbackEliminar(id);
                }
            });
        }

        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', () => {
                if (this.callbackLimpiar) {
                    this.callbackLimpiar();
                }
            });
        }
    }

    /**
     * Configura el callback para completar tareas
     * @param {Function} callback 
     */
    alCompletar(callback) {
        this.callbackCompletar = callback;
    }

    /**
     * Configura el callback para eliminar tareas
     * @param {Function} callback 
     */
    alEliminar(callback) {
        this.callbackEliminar = callback;
    }

    /**
     * Configura el callback para limpiar completadas
     * @param {Function} callback 
     */
    alLimpiar(callback) {
        this.callbackLimpiar = callback;
    }
}

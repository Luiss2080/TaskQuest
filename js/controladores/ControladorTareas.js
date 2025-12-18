// Controlador de Tareas
import { Tarea } from '../modelos/Tarea.js';
import { ServicioAlmacenamiento } from '../utilidades/almacenamiento.js';
import { CLAVES_ALMACENAMIENTO } from '../utilidades/constantes.js';

export class ControladorTareas {
    constructor() {
        this.tareas = [];
        this.observadores = [];
        this.cargar();
    }

    /**
     * Añade un observador para cambios
     * @param {Function} callback 
     */
    agregarObservador(callback) {
        this.observadores.push(callback);
    }

    /**
     * Notifica a todos los observadores
     */
    notificarCambios() {
        this.observadores.forEach(callback => callback(this.tareas));
    }

    /**
     * Obtiene todas las tareas
     */
    obtenerTodas() {
        return [...this.tareas];
    }

    /**
     * Obtiene tareas pendientes
     */
    obtenerPendientes() {
        return this.tareas.filter(t => !t.completada);
    }

    /**
     * Obtiene tareas completadas
     */
    obtenerCompletadas() {
        return this.tareas.filter(t => t.completada);
    }

    /**
     * Obtiene una tarea por ID
     * @param {string} id 
     */
    obtenerPorId(id) {
        return this.tareas.find(t => t.id === id);
    }

    /**
     * Crea una nueva tarea
     * @param {string} texto 
     * @param {string} dificultad 
     * @param {string} categoria 
     */
    crearTarea(texto, dificultad, categoria) {
        const validacion = Tarea.validar(texto, dificultad, categoria);
        
        if (!validacion.valido) {
            throw new Error(validacion.errores.join(', '));
        }

        const tarea = new Tarea(texto, dificultad, categoria);
        this.tareas.unshift(tarea);
        this.guardar();
        this.notificarCambios();
        return tarea;
    }

    /**
     * Completa una tarea
     * @param {string} id 
     */
    completarTarea(id) {
        const tarea = this.obtenerPorId(id);
        
        if (!tarea) {
            throw new Error('Tarea no encontrada');
        }

        if (tarea.completada) {
            return null;
        }

        tarea.marcarCompletada();
        this.guardar();
        this.notificarCambios();
        return tarea;
    }

    /**
     * Alterna el estado de una tarea
     * @param {string} id 
     */
    alternarTarea(id) {
        const tarea = this.obtenerPorId(id);
        
        if (!tarea) {
            throw new Error('Tarea no encontrada');
        }

        const estabaCompletada = tarea.completada;
        tarea.alternarCompletada();
        this.guardar();
        this.notificarCambios();
        
        return {
            tarea,
            seCompleto: !estabaCompletada && tarea.completada
        };
    }

    /**
     * Elimina una tarea
     * @param {string} id 
     */
    eliminarTarea(id) {
        const indice = this.tareas.findIndex(t => t.id === id);
        
        if (indice === -1) {
            throw new Error('Tarea no encontrada');
        }

        const tareaEliminada = this.tareas.splice(indice, 1)[0];
        this.guardar();
        this.notificarCambios();
        return tareaEliminada;
    }

    /**
     * Elimina todas las tareas completadas
     */
    eliminarCompletadas() {
        const tareasEliminadas = this.obtenerCompletadas();
        this.tareas = this.obtenerPendientes();
        this.guardar();
        this.notificarCambios();
        return tareasEliminadas;
    }

    /**
     * Actualiza una tarea
     * @param {string} id 
     * @param {object} cambios 
     */
    actualizarTarea(id, cambios) {
        const tarea = this.obtenerPorId(id);
        
        if (!tarea) {
            throw new Error('Tarea no encontrada');
        }

        if (cambios.texto !== undefined) {
            tarea.actualizarTexto(cambios.texto);
        }

        if (cambios.dificultad !== undefined) {
            tarea.actualizarDificultad(cambios.dificultad);
        }

        if (cambios.categoria !== undefined) {
            tarea.actualizarCategoria(cambios.categoria);
        }

        this.guardar();
        this.notificarCambios();
        return tarea;
    }

    /**
     * Obtiene estadísticas de tareas
     */
    obtenerEstadisticas() {
        return {
            total: this.tareas.length,
            completadas: this.obtenerCompletadas().length,
            pendientes: this.obtenerPendientes().length,
            porDificultad: this.contarPorDificultad(),
            porCategoria: this.contarPorCategoria()
        };
    }

    /**
     * Cuenta tareas por dificultad
     */
    contarPorDificultad() {
        return this.tareas.reduce((acc, tarea) => {
            acc[tarea.dificultad] = (acc[tarea.dificultad] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Cuenta tareas por categoría
     */
    contarPorCategoria() {
        return this.tareas.reduce((acc, tarea) => {
            acc[tarea.categoria] = (acc[tarea.categoria] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Filtra tareas
     * @param {Function} predicado 
     */
    filtrar(predicado) {
        return this.tareas.filter(predicado);
    }

    /**
     * Ordena tareas
     * @param {Function} comparador 
     */
    ordenar(comparador) {
        this.tareas.sort(comparador);
        this.guardar();
        this.notificarCambios();
    }

    /**
     * Guarda las tareas
     */
    guardar() {
        const datos = this.tareas.map(t => t.aObjeto());
        ServicioAlmacenamiento.guardar(CLAVES_ALMACENAMIENTO.TAREAS, datos);
    }

    /**
     * Carga las tareas
     */
    cargar() {
        const datos = ServicioAlmacenamiento.cargar(CLAVES_ALMACENAMIENTO.TAREAS, []);
        this.tareas = datos.map(d => Tarea.desdeObjeto(d));
    }

    /**
     * Reinicia todas las tareas
     */
    reiniciar() {
        this.tareas = [];
        this.guardar();
        this.notificarCambios();
    }
}

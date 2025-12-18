// Modelo de Tarea
import { CONFIGURACION_DIFICULTAD } from '../utilidades/constantes.js';
import { Utilidades } from '../utilidades/helpers.js';

export class Tarea {
    constructor(texto, dificultad = 'media', categoria = 'otros') {
        this.id = Utilidades.generarId();
        this.texto = Utilidades.limpiarTexto(texto);
        this.dificultad = dificultad;
        this.categoria = categoria;
        this.completada = false;
        this.fechaCreacion = new Date().toISOString();
        this.fechaCompletada = null;
    }

    /**
     * Obtiene la recompensa de XP de la tarea
     */
    get recompensaXP() {
        return CONFIGURACION_DIFICULTAD[this.dificultad].xp;
    }

    /**
     * Obtiene la configuración de la dificultad
     */
    get configuracionDificultad() {
        return CONFIGURACION_DIFICULTAD[this.dificultad];
    }

    /**
     * Alterna el estado de completada
     */
    alternarCompletada() {
        this.completada = !this.completada;
        if (this.completada) {
            this.fechaCompletada = new Date().toISOString();
        } else {
            this.fechaCompletada = null;
        }
    }

    /**
     * Marca la tarea como completada
     */
    marcarCompletada() {
        if (!this.completada) {
            this.completada = true;
            this.fechaCompletada = new Date().toISOString();
        }
    }

    /**
     * Marca la tarea como pendiente
     */
    marcarPendiente() {
        this.completada = false;
        this.fechaCompletada = null;
    }

    /**
     * Actualiza el texto de la tarea
     * @param {string} nuevoTexto 
     */
    actualizarTexto(nuevoTexto) {
        this.texto = Utilidades.limpiarTexto(nuevoTexto);
    }

    /**
     * Actualiza la dificultad de la tarea
     * @param {string} nuevaDificultad 
     */
    actualizarDificultad(nuevaDificultad) {
        if (CONFIGURACION_DIFICULTAD[nuevaDificultad]) {
            this.dificultad = nuevaDificultad;
        }
    }

    /**
     * Actualiza la categoría de la tarea
     * @param {string} nuevaCategoria 
     */
    actualizarCategoria(nuevaCategoria) {
        this.categoria = nuevaCategoria;
    }

    /**
     * Convierte la tarea a objeto plano
     */
    aObjeto() {
        return {
            id: this.id,
            texto: this.texto,
            dificultad: this.dificultad,
            categoria: this.categoria,
            completada: this.completada,
            fechaCreacion: this.fechaCreacion,
            fechaCompletada: this.fechaCompletada
        };
    }

    /**
     * Crea una tarea desde un objeto
     * @param {object} datos 
     */
    static desdeObjeto(datos) {
        const tarea = new Tarea(datos.texto, datos.dificultad, datos.categoria);
        tarea.id = datos.id;
        tarea.completada = datos.completada;
        tarea.fechaCreacion = datos.fechaCreacion;
        tarea.fechaCompletada = datos.fechaCompletada;
        return tarea;
    }

    /**
     * Valida los datos de una tarea
     * @param {string} texto 
     * @param {string} dificultad 
     * @param {string} categoria 
     */
    static validar(texto, dificultad, categoria) {
        const errores = [];

        if (!texto || texto.trim().length === 0) {
            errores.push('El texto de la tarea no puede estar vacío');
        }

        if (!CONFIGURACION_DIFICULTAD[dificultad]) {
            errores.push('Dificultad inválida');
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }
}

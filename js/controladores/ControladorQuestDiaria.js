// Controlador de Quest Diaria
import { QuestDiaria } from '../modelos/QuestDiaria.js';

export class ControladorQuestDiaria {
    constructor() {
        this.questDiaria = new QuestDiaria();
        this.observadores = [];
        this.observadoresCompletada = [];
    }

    /**
     * Añade un observador para cambios
     * @param {Function} callback 
     */
    agregarObservador(callback) {
        this.observadores.push(callback);
    }

    /**
     * Añade un observador para cuando se completa
     * @param {Function} callback 
     */
    agregarObservadorCompletada(callback) {
        this.observadoresCompletada.push(callback);
    }

    /**
     * Notifica a todos los observadores
     */
    notificarCambios() {
        this.observadores.forEach(callback => callback(this.questDiaria));
    }

    /**
     * Notifica que se completó la quest
     */
    notificarCompletada() {
        this.observadoresCompletada.forEach(callback => callback(this.questDiaria));
    }

    /**
     * Obtiene la quest diaria
     */
    obtenerQuest() {
        return this.questDiaria;
    }

    /**
     * Añade progreso a la quest
     */
    agregarProgreso() {
        const seCompleto = this.questDiaria.agregarProgreso();
        this.notificarCambios();
        
        if (seCompleto) {
            this.notificarCompletada();
        }
        
        return seCompleto;
    }

    /**
     * Obtiene el estado de la quest
     */
    obtenerEstado() {
        return {
            meta: this.questDiaria.meta,
            progreso: this.questDiaria.progreso,
            porcentajeProgreso: this.questDiaria.porcentajeProgreso,
            estaCompletada: this.questDiaria.estaCompletada,
            completadaHoy: this.questDiaria.completadaHoy,
            bonusXP: this.questDiaria.bonusXP,
            vecesCompletada: this.questDiaria.vecesCompletada
        };
    }

    /**
     * Verifica si debe reiniciarse
     */
    verificarReinicio() {
        this.questDiaria.verificarReinicio();
        this.notificarCambios();
    }

    /**
     * Reinicia la quest
     */
    reiniciar() {
        this.questDiaria.reiniciar();
        this.notificarCambios();
    }

    /**
     * Exporta los datos de la quest
     */
    exportar() {
        return this.questDiaria.exportar();
    }
}

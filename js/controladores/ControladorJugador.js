// Controlador de Jugador
import { Jugador } from '../modelos/Jugador.js';

export class ControladorJugador {
    constructor() {
        this.jugador = new Jugador();
        this.observadores = [];
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
        this.observadores.forEach(callback => callback(this.jugador));
    }

    /**
     * Obtiene el jugador
     */
    obtenerJugador() {
        return this.jugador;
    }

    /**
     * Añade XP al jugador
     * @param {number} cantidad 
     * @returns {boolean} True si subió de nivel
     */
    agregarXP(cantidad) {
        const subioNivel = this.jugador.agregarXP(cantidad);
        this.notificarCambios();
        return subioNivel;
    }

    /**
     * Registra una tarea completada
     */
    registrarTareaCompletada() {
        this.jugador.completarTarea();
        this.notificarCambios();
    }

    /**
     * Obtiene estadísticas del jugador
     */
    obtenerEstadisticas() {
        return {
            nivel: this.jugador.nivel,
            xp: this.jugador.xp,
            xpTotal: this.jugador.xpTotal,
            xpParaSiguienteNivel: this.jugador.xpParaSiguienteNivel,
            progresoXP: this.jugador.progresoXP,
            tareasCompletadas: this.jugador.tareasCompletadas,
            racha: this.jugador.racha,
            tareasHoy: this.jugador.tareasHoy
        };
    }

    /**
     * Reinicia el progreso del jugador
     */
    reiniciar() {
        this.jugador.reiniciar();
        this.notificarCambios();
    }

    /**
     * Exporta los datos del jugador
     */
    exportar() {
        return this.jugador.exportar();
    }

    /**
     * Verifica y actualiza el contador de tareas de hoy
     */
    verificarDiaActual() {
        this.jugador.verificarReinicoTareasHoy();
        this.notificarCambios();
    }
}

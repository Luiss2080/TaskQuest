// Modelo de Jugador
import { ServicioAlmacenamiento } from '../utilidades/almacenamiento.js';
import { CLAVES_ALMACENAMIENTO } from '../utilidades/constantes.js';
import { UtilidadesFechas } from '../utilidades/fechas.js';

export class Jugador {
    constructor() {
        this.nivel = 1;
        this.xp = 0;
        this.xpTotal = 0;
        this.tareasCompletadas = 0;
        this.racha = 0;
        this.ultimaFechaCompletada = null;
        this.tareasHoy = 0;
        this.ultimoDiaContado = null;
        this.cargar();
    }

    /**
     * Calcula el XP necesario para el siguiente nivel
     */
    get xpParaSiguienteNivel() {
        return this.nivel * 100;
    }

    /**
     * Calcula el porcentaje de progreso del XP
     */
    get progresoXP() {
        return (this.xp / this.xpParaSiguienteNivel) * 100;
    }

    /**
     * Añade XP al jugador
     * @param {number} cantidad - Cantidad de XP a añadir
     * @returns {boolean} - True si subió de nivel
     */
    agregarXP(cantidad) {
        this.xp += cantidad;
        this.xpTotal += cantidad;
        
        let subioNivel = false;
        
        // Verificar si sube de nivel
        while (this.xp >= this.xpParaSiguienteNivel) {
            this.subirNivel();
            subioNivel = true;
        }
        
        this.guardar();
        return subioNivel;
    }

    /**
     * Sube el nivel del jugador
     */
    subirNivel() {
        this.xp -= this.xpParaSiguienteNivel;
        this.nivel++;
    }

    /**
     * Registra una tarea completada
     */
    completarTarea() {
        this.tareasCompletadas++;
        this.actualizarRacha();
        this.actualizarTareasHoy();
        this.guardar();
    }

    /**
     * Actualiza la racha del jugador
     */
    actualizarRacha() {
        const hoy = UtilidadesFechas.obtenerHoyString();
        const ayer = UtilidadesFechas.obtenerAyerString();
        
        if (this.ultimaFechaCompletada) {
            if (this.ultimaFechaCompletada === hoy) {
                // Ya completó una tarea hoy
                return;
            } else if (this.ultimaFechaCompletada === ayer) {
                // Mantiene la racha
                this.racha++;
            } else {
                // Se rompió la racha
                this.racha = 1;
            }
        } else {
            this.racha = 1;
        }
        
        this.ultimaFechaCompletada = hoy;
    }

    /**
     * Actualiza el contador de tareas de hoy
     */
    actualizarTareasHoy() {
        const hoy = UtilidadesFechas.obtenerHoyString();
        
        if (this.ultimoDiaContado !== hoy) {
            this.tareasHoy = 0;
            this.ultimoDiaContado = hoy;
        }
        
        this.tareasHoy++;
    }

    /**
     * Reinicia el contador de tareas de hoy si es necesario
     */
    verificarReinicoTareasHoy() {
        const hoy = UtilidadesFechas.obtenerHoyString();
        if (this.ultimoDiaContado !== hoy) {
            this.tareasHoy = 0;
            this.ultimoDiaContado = hoy;
            this.guardar();
        }
    }

    /**
     * Guarda el estado del jugador
     */
    guardar() {
        const datos = {
            nivel: this.nivel,
            xp: this.xp,
            xpTotal: this.xpTotal,
            tareasCompletadas: this.tareasCompletadas,
            racha: this.racha,
            ultimaFechaCompletada: this.ultimaFechaCompletada,
            tareasHoy: this.tareasHoy,
            ultimoDiaContado: this.ultimoDiaContado
        };
        ServicioAlmacenamiento.guardar(CLAVES_ALMACENAMIENTO.JUGADOR, datos);
    }

    /**
     * Carga el estado del jugador
     */
    cargar() {
        const datos = ServicioAlmacenamiento.cargar(CLAVES_ALMACENAMIENTO.JUGADOR);
        if (datos) {
            Object.assign(this, datos);
            this.verificarReinicoTareasHoy();
        }
    }

    /**
     * Reinicia el progreso del jugador
     */
    reiniciar() {
        this.nivel = 1;
        this.xp = 0;
        this.xpTotal = 0;
        this.tareasCompletadas = 0;
        this.racha = 0;
        this.ultimaFechaCompletada = null;
        this.tareasHoy = 0;
        this.ultimoDiaContado = null;
        this.guardar();
    }

    /**
     * Exporta los datos del jugador
     */
    exportar() {
        return {
            nivel: this.nivel,
            xp: this.xp,
            xpTotal: this.xpTotal,
            tareasCompletadas: this.tareasCompletadas,
            racha: this.racha,
            ultimaFechaCompletada: this.ultimaFechaCompletada,
            tareasHoy: this.tareasHoy,
            ultimoDiaContado: this.ultimoDiaContado
        };
    }
}

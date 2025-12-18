// Modelo de Quest Diaria
import { ServicioAlmacenamiento } from '../utilidades/almacenamiento.js';
import { CLAVES_ALMACENAMIENTO, CONFIGURACION_QUEST_DIARIA } from '../utilidades/constantes.js';
import { UtilidadesFechas } from '../utilidades/fechas.js';

export class QuestDiaria {
    constructor() {
        this.meta = CONFIGURACION_QUEST_DIARIA.meta;
        this.progreso = 0;
        this.ultimoReinicio = null;
        this.completadaHoy = false;
        this.vecesCompletada = 0;
        this.cargar();
        this.verificarReinicio();
    }

    /**
     * Calcula el porcentaje de progreso
     */
    get porcentajeProgreso() {
        return (this.progreso / this.meta) * 100;
    }

    /**
     * Verifica si está completada
     */
    get estaCompletada() {
        return this.progreso >= this.meta;
    }

    /**
     * Obtiene el bonus de XP
     */
    get bonusXP() {
        return CONFIGURACION_QUEST_DIARIA.bonusXP;
    }

    /**
     * Verifica si debe reiniciarse
     */
    verificarReinicio() {
        const hoy = UtilidadesFechas.obtenerHoyString();
        
        if (this.ultimoReinicio !== hoy) {
            this.reiniciarDiaria();
        }
    }

    /**
     * Reinicia la quest diaria
     */
    reiniciarDiaria() {
        this.progreso = 0;
        this.completadaHoy = false;
        this.ultimoReinicio = UtilidadesFechas.obtenerHoyString();
        this.guardar();
    }

    /**
     * Añade progreso a la quest
     */
    agregarProgreso() {
        if (!this.completadaHoy && this.progreso < this.meta) {
            this.progreso++;
            
            if (this.estaCompletada && !this.completadaHoy) {
                this.completadaHoy = true;
                this.vecesCompletada++;
            }
            
            this.guardar();
            return this.completadaHoy;
        }
        
        return false;
    }

    /**
     * Guarda el estado de la quest diaria
     */
    guardar() {
        const datos = {
            meta: this.meta,
            progreso: this.progreso,
            ultimoReinicio: this.ultimoReinicio,
            completadaHoy: this.completadaHoy,
            vecesCompletada: this.vecesCompletada
        };
        ServicioAlmacenamiento.guardar(CLAVES_ALMACENAMIENTO.QUEST_DIARIA, datos);
    }

    /**
     * Carga el estado de la quest diaria
     */
    cargar() {
        const datos = ServicioAlmacenamiento.cargar(CLAVES_ALMACENAMIENTO.QUEST_DIARIA);
        if (datos) {
            Object.assign(this, datos);
        }
    }

    /**
     * Reinicia completamente
     */
    reiniciar() {
        this.progreso = 0;
        this.ultimoReinicio = null;
        this.completadaHoy = false;
        this.vecesCompletada = 0;
        this.guardar();
    }

    /**
     * Exporta los datos
     */
    exportar() {
        return {
            meta: this.meta,
            progreso: this.progreso,
            ultimoReinicio: this.ultimoReinicio,
            completadaHoy: this.completadaHoy,
            vecesCompletada: this.vecesCompletada
        };
    }
}

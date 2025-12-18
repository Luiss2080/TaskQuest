// Utilidades para fechas
export class UtilidadesFechas {
    /**
     * Obtiene la fecha de hoy en formato string
     * @returns {string} Fecha en formato YYYY-MM-DD
     */
    static obtenerHoyString() {
        return new Date().toDateString();
    }

    /**
     * Obtiene la fecha de ayer
     * @returns {string} Fecha de ayer en formato YYYY-MM-DD
     */
    static obtenerAyerString() {
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        return ayer.toDateString();
    }

    /**
     * Verifica si dos fechas son el mismo día
     * @param {Date|string} fecha1 
     * @param {Date|string} fecha2 
     * @returns {boolean}
     */
    static esMismoDia(fecha1, fecha2) {
        const d1 = typeof fecha1 === 'string' ? new Date(fecha1) : fecha1;
        const d2 = typeof fecha2 === 'string' ? new Date(fecha2) : fecha2;
        return d1.toDateString() === d2.toDateString();
    }

    /**
     * Formatea una fecha a formato legible
     * @param {Date|string} fecha 
     * @returns {string}
     */
    static formatearFecha(fecha) {
        const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
        return d.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    /**
     * Formatea fecha y hora
     * @param {Date|string} fecha 
     * @returns {string}
     */
    static formatearFechaHora(fecha) {
        const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
        return d.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Calcula días entre dos fechas
     * @param {Date|string} fecha1 
     * @param {Date|string} fecha2 
     * @returns {number}
     */
    static diasEntre(fecha1, fecha2) {
        const d1 = typeof fecha1 === 'string' ? new Date(fecha1) : fecha1;
        const d2 = typeof fecha2 === 'string' ? new Date(fecha2) : fecha2;
        const diferencia = Math.abs(d2 - d1);
        return Math.floor(diferencia / (1000 * 60 * 60 * 24));
    }
}

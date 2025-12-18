// Utilidades generales
export class Utilidades {
    /**
     * Genera un ID único
     * @returns {string}
     */
    static generarId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Espera un tiempo determinado
     * @param {number} ms - Milisegundos a esperar
     * @returns {Promise}
     */
    static esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Limpia texto de espacios extra
     * @param {string} texto 
     * @returns {string}
     */
    static limpiarTexto(texto) {
        return texto.trim().replace(/\s+/g, ' ');
    }

    /**
     * Capitaliza primera letra
     * @param {string} texto 
     * @returns {string}
     */
    static capitalizar(texto) {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    /**
     * Formatea número con separadores
     * @param {number} numero 
     * @returns {string}
     */
    static formatearNumero(numero) {
        return numero.toLocaleString('es-ES');
    }

    /**
     * Clona un objeto profundamente
     * @param {object} objeto 
     * @returns {object}
     */
    static clonarObjeto(objeto) {
        return JSON.parse(JSON.stringify(objeto));
    }

    /**
     * Mezcla un array aleatoriamente
     * @param {Array} array 
     * @returns {Array}
     */
    static mezclarArray(array) {
        const copia = [...array];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }

    /**
     * Debounce para optimizar llamadas frecuentes
     * @param {Function} func 
     * @param {number} wait 
     * @returns {Function}
     */
    static debounce(func, wait) {
        let timeout;
        return function ejecutar(...args) {
            const despues = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(despues, wait);
        };
    }
}

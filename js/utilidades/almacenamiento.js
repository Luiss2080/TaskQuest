// Utilidades para almacenamiento en LocalStorage
export class ServicioAlmacenamiento {
    /**
     * Guarda datos en localStorage
     * @param {string} clave - Clave para almacenar
     * @param {*} datos - Datos a guardar
     */
    static guardar(clave, datos) {
        try {
            const datosJSON = JSON.stringify(datos);
            localStorage.setItem(clave, datosJSON);
            return true;
        } catch (error) {
            console.error(`Error al guardar ${clave}:`, error);
            return false;
        }
    }

    /**
     * Carga datos desde localStorage
     * @param {string} clave - Clave a cargar
     * @param {*} valorPorDefecto - Valor por defecto si no existe
     * @returns {*} Datos cargados o valor por defecto
     */
    static cargar(clave, valorPorDefecto = null) {
        try {
            const datosJSON = localStorage.getItem(clave);
            if (datosJSON === null) {
                return valorPorDefecto;
            }
            return JSON.parse(datosJSON);
        } catch (error) {
            console.error(`Error al cargar ${clave}:`, error);
            return valorPorDefecto;
        }
    }

    /**
     * Elimina una clave del localStorage
     * @param {string} clave - Clave a eliminar
     */
    static eliminar(clave) {
        try {
            localStorage.removeItem(clave);
            return true;
        } catch (error) {
            console.error(`Error al eliminar ${clave}:`, error);
            return false;
        }
    }

    /**
     * Limpia todo el localStorage de la aplicación
     */
    static limpiarTodo() {
        try {
            const claves = Object.keys(localStorage);
            const clavesApp = claves.filter(c => c.startsWith('taskquest_'));
            clavesApp.forEach(clave => localStorage.removeItem(clave));
            return true;
        } catch (error) {
            console.error('Error al limpiar localStorage:', error);
            return false;
        }
    }

    /**
     * Verifica si existe una clave
     * @param {string} clave - Clave a verificar
     * @returns {boolean}
     */
    static existe(clave) {
        return localStorage.getItem(clave) !== null;
    }

    /**
     * Exporta todos los datos de la app
     * @returns {object} Todos los datos
     */
    static exportarDatos() {
        const claves = Object.keys(localStorage);
        const clavesApp = claves.filter(c => c.startsWith('taskquest_'));
        const datos = {};
        
        clavesApp.forEach(clave => {
            datos[clave] = this.cargar(clave);
        });
        
        return datos;
    }

    /**
     * Importa datos a la app
     * @param {object} datos - Datos a importar
     */
    static importarDatos(datos) {
        try {
            Object.keys(datos).forEach(clave => {
                this.guardar(clave, datos[clave]);
            });
            return true;
        } catch (error) {
            console.error('Error al importar datos:', error);
            return false;
        }
    }
}

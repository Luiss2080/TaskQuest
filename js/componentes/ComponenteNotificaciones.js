// Componente de Notificaciones
import { ServicioAnimaciones } from '../utilidades/animaciones.js';

export class ComponenteNotificaciones {
    /**
     * Muestra una notificación
     * @param {string} mensaje 
     * @param {string} tipo - 'exito', 'info', 'error'
     * @param {number} duracion - Duración en milisegundos
     */
    static mostrar(mensaje, tipo = 'exito', duracion = 3000) {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        
        const icono = this.obtenerIcono(tipo);
        
        notificacion.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="${icono} text-2xl"></i>
                <div>
                    <div class="font-bold">${mensaje}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notificacion);
        
        ServicioAnimaciones.animarDeslizarDesdeRerecha(notificacion)
            .finished.then(() => {
                setTimeout(() => {
                    ServicioAnimaciones.animarDeslizarHaciaDerecha(notificacion)
                        .finished.then(() => notificacion.remove());
                }, duracion);
            });
    }

    /**
     * Muestra notificación de quest completada
     * @param {number} bonusXP 
     */
    static mostrarQuestCompletada(bonusXP) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion notificacion-exito';
        
        notificacion.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-trophy text-2xl"></i>
                <div>
                    <div class="font-bold">¡Quest Diaria Completada!</div>
                    <div class="text-sm">+${bonusXP} XP Bonus</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notificacion);
        
        ServicioAnimaciones.animarDeslizarDesdeRerecha(notificacion)
            .finished.then(() => {
                setTimeout(() => {
                    ServicioAnimaciones.animarDeslizarHaciaDerecha(notificacion)
                        .finished.then(() => notificacion.remove());
                }, 3000);
            });
    }

    /**
     * Obtiene el icono según el tipo
     * @param {string} tipo 
     */
    static obtenerIcono(tipo) {
        const iconos = {
            exito: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            error: 'fas fa-exclamation-circle'
        };
        return iconos[tipo] || iconos.info;
    }
}

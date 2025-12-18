// Utilidades para animaciones con Anime.js
import anime from '../../node_modules/animejs/lib/anime.es.js';

export class ServicioAnimaciones {
    /**
     * Anima la aparición de un elemento
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarAparicion(objetivo) {
        return anime({
            targets: objetivo,
            opacity: [0, 1],
            translateY: [-20, 0],
            scale: [0.9, 1],
            duration: 400,
            easing: 'easeOutQuad'
        });
    }

    /**
     * Anima la desaparición de un elemento
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarDesaparicion(objetivo) {
        return anime({
            targets: objetivo,
            opacity: [1, 0],
            translateX: [0, 100],
            scale: [1, 0.8],
            duration: 500,
            easing: 'easeInQuad'
        });
    }

    /**
     * Anima el nivel subido
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarNivelSubido(objetivo) {
        return anime({
            targets: objetivo,
            scale: [1, 1.5, 1],
            rotate: [0, 360, 0],
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }

    /**
     * Anima un rebote
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarRebote(objetivo) {
        return anime({
            targets: objetivo,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
    }

    /**
     * Anima entrada desde la derecha
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarDeslizarDesdeRerecha(objetivo) {
        return anime({
            targets: objetivo,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }

    /**
     * Anima salida hacia la derecha
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarDeslizarHaciaDerecha(objetivo) {
        return anime({
            targets: objetivo,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuad'
        });
    }

    /**
     * Anima un pulso
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarPulso(objetivo) {
        return anime({
            targets: objetivo,
            scale: [1, 1.1, 1],
            duration: 600,
            easing: 'easeInOutQuad',
            loop: true
        });
    }

    /**
     * Anima una sacudida
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarSacudida(objetivo) {
        return anime({
            targets: objetivo,
            translateX: [
                { value: -10, duration: 100 },
                { value: 10, duration: 100 },
                { value: -10, duration: 100 },
                { value: 10, duration: 100 },
                { value: 0, duration: 100 }
            ],
            easing: 'easeInOutQuad'
        });
    }

    /**
     * Anima la barra de progreso
     * @param {string|Element} objetivo - Selector o elemento
     * @param {number} porcentaje - Porcentaje de progreso (0-100)
     */
    static animarBarraProgreso(objetivo, porcentaje) {
        return anime({
            targets: objetivo,
            width: `${porcentaje}%`,
            duration: 800,
            easing: 'easeOutQuad'
        });
    }

    /**
     * Anima rotación continua
     * @param {string|Element} objetivo - Selector o elemento
     */
    static animarRotacionContinua(objetivo) {
        return anime({
            targets: objetivo,
            rotate: '1turn',
            duration: 2000,
            easing: 'linear',
            loop: true
        });
    }
}

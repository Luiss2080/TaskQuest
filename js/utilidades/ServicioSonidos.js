// Servicio de Sonidos (Web Audio API)
// Genera sonidos estilo 8-bits retro sin necesitar archivos MP3 externos.

export class ServicioSonidos {
    constructor() {
        // Inicializar contexto en la primera interacción del usuario
        this.contextoAudio = null;
        this.habilitado = true;
    }

    _initContexto() {
        if (!this.contextoAudio) {
            this.contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    /**
     * Alternar el estado de los sonidos (mute/unmute)
     */
    alternarSilencio() {
        this.habilitado = !this.habilitado;
        return this.habilitado;
    }

    /**
     * Genera un tono básico
     */
    _reproducirTono(frecuencia, tipo, duracion, volumen = 0.1) {
        if (!this.habilitado) return;
        this._initContexto();

        const oscilador = this.contextoAudio.createOscillator();
        const ganancia = this.contextoAudio.createGain();

        oscilador.type = tipo;
        oscilador.frequency.setValueAtTime(frecuencia, this.contextoAudio.currentTime);

        ganancia.gain.setValueAtTime(volumen, this.contextoAudio.currentTime);
        ganancia.gain.exponentialRampToValueAtTime(0.01, this.contextoAudio.currentTime + duracion);

        oscilador.connect(ganancia);
        ganancia.connect(this.contextoAudio.destination);

        oscilador.start();
        oscilador.stop(this.contextoAudio.currentTime + duracion);
    }

    /**
     * Sonido de tarea completada (estilo moneda)
     */
    tareaCompletada() {
        this._reproducirTono(800, 'square', 0.1, 0.05);
        setTimeout(() => this._reproducirTono(1200, 'square', 0.15, 0.05), 100);
    }

    /**
     * Sonido al subir de nivel (arpegio épico)
     */
    subirNivel() {
        const notas = [440, 554, 659, 880]; // A4, C#5, E5, A5
        notas.forEach((freq, i) => {
            setTimeout(() => this._reproducirTono(freq, 'square', 0.2, 0.1), i * 150);
        });
        setTimeout(() => this._reproducirTono(1108, 'square', 0.4, 0.1), notas.length * 150);
    }

    /**
     * Sonido de error o eliminar
     */
    error() {
        this._reproducirTono(300, 'sawtooth', 0.2, 0.1);
        setTimeout(() => this._reproducirTono(200, 'sawtooth', 0.3, 0.1), 100);
    }
}

// Instancia única (Singleton) para toda la aplicación
export const motorSonidos = new ServicioSonidos();

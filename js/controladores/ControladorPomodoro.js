export class ControladorPomodoro {
    constructor() {
        this.tiempoRestante = 25 * 60; // 25 minutos por defecto
        this.estado = 'detenido'; // detenido, corriendo, pausa
        this.modo = 'trabajo'; // trabajo, descanso_corto, descanso_largo
        this.intervalo = null;
        this.observadores = [];
    }

    agregarObservador(callback) {
        this.observadores.push(callback);
    }

    notificar() {
        this.observadores.forEach(obs => obs({
            tiempoRestante: this.tiempoRestante,
            estado: this.estado,
            modo: this.modo
        }));
    }

    iniciar() {
        if (this.estado === 'corriendo') return;
        this.estado = 'corriendo';
        this.intervalo = setInterval(() => {
            this.tiempoRestante--;
            if (this.tiempoRestante <= 0) {
                this.completarSesion();
            } else {
                this.notificar();
            }
        }, 1000);
        this.notificar();
    }

    pausar() {
        if (this.estado !== 'corriendo') return;
        this.estado = 'pausa';
        clearInterval(this.intervalo);
        this.notificar();
    }

    reiniciar() {
        this.estado = 'detenido';
        clearInterval(this.intervalo);
        this.establecerModo(this.modo);
    }

    establecerModo(modo) {
        this.modo = modo;
        this.estado = 'detenido';
        clearInterval(this.intervalo);
        
        switch (modo) {
            case 'trabajo':
                this.tiempoRestante = 25 * 60;
                break;
            case 'descanso_corto':
                this.tiempoRestante = 5 * 60;
                break;
            case 'descanso_largo':
                this.tiempoRestante = 15 * 60;
                break;
        }
        this.notificar();
    }

    completarSesion() {
        this.reiniciar();
        // Notificar que se completó (para dar XP)
        if (this.modo === 'trabajo') {
            const evento = new CustomEvent('pomodoroCompletado', { detail: { xp: 30 } });
            document.dispatchEvent(evento);
        } else {
            const evento = new CustomEvent('descansoCompletado');
            document.dispatchEvent(evento);
        }
    }
}

// Componente del Encabezado
export class ComponenteEncabezado {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.elementosDOM = {};
    }

    /**
     * Renderiza el encabezado
     */
    renderizar() {
        if (!this.contenedor) return;

        this.contenedor.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <i class="fas fa-gamepad text-4xl text-pink-600"></i>
                    <h1 class="text-3xl font-bold text-indigo-500">TaskQuest</h1>
                </div>
                
                <div class="flex items-center space-x-6">
                    <div class="contenedor-estadisticas">
                        <div class="text-sm opacity-75">Nivel</div>
                        <div id="jugador-nivel" class="text-2xl font-bold text-pink-600">1</div>
                    </div>
                    <div class="contenedor-estadisticas">
                        <div class="text-sm opacity-75">XP</div>
                        <div id="jugador-xp" class="text-xl font-bold">0 / 100</div>
                    </div>
                    <div class="contenedor-estadisticas">
                        <div class="text-sm opacity-75">Racha</div>
                        <div id="jugador-racha" class="text-xl font-bold text-yellow-400">
                            <i class="fas fa-fire"></i> 0
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 contenedor-barra-progreso">
                <div id="barra-xp" class="barra-progreso-xp" style="width: 0%"></div>
            </div>
        `;

        this.capturarElementos();
    }

    /**
     * Captura referencias a elementos DOM
     */
    capturarElementos() {
        this.elementosDOM = {
            nivel: document.getElementById('jugador-nivel'),
            xp: document.getElementById('jugador-xp'),
            racha: document.getElementById('jugador-racha'),
            barraXP: document.getElementById('barra-xp')
        };
    }

    /**
     * Actualiza el nivel mostrado
     * @param {number} nivel 
     */
    actualizarNivel(nivel) {
        if (this.elementosDOM.nivel) {
            this.elementosDOM.nivel.textContent = nivel;
        }
    }

    /**
     * Actualiza el XP mostrado
     * @param {number} xpActual 
     * @param {number} xpNecesario 
     */
    actualizarXP(xpActual, xpNecesario) {
        if (this.elementosDOM.xp) {
            this.elementosDOM.xp.textContent = `${xpActual} / ${xpNecesario}`;
        }
    }

    /**
     * Actualiza la racha mostrada
     * @param {number} racha 
     */
    actualizarRacha(racha) {
        if (this.elementosDOM.racha) {
            this.elementosDOM.racha.innerHTML = `<i class="fas fa-fire"></i> ${racha}`;
        }
    }

    /**
     * Actualiza la barra de progreso de XP
     * @param {number} porcentaje 
     */
    actualizarBarraXP(porcentaje) {
        if (this.elementosDOM.barraXP) {
            this.elementosDOM.barraXP.style.width = `${porcentaje}%`;
        }
    }

    /**
     * Actualiza todos los datos del jugador
     * @param {object} datosJugador 
     */
    actualizarDatos(datosJugador) {
        this.actualizarNivel(datosJugador.nivel);
        this.actualizarXP(datosJugador.xp, datosJugador.xpParaSiguienteNivel);
        this.actualizarRacha(datosJugador.racha);
        this.actualizarBarraXP(datosJugador.progresoXP);
    }
}

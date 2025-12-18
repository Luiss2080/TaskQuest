// Componente de Modal
export class ComponenteModal {
    constructor() {
        this.modal = null;
        this.crear();
    }

    /**
     * Crea el modal en el DOM
     */
    crear() {
        const modalHTML = `
            <div id="modal-nivel" class="modal-overlay" style="display: none;">
                <div class="modal-contenido animate-bounce-in">
                    <i class="fas fa-trophy text-8xl text-yellow-400 mb-4"></i>
                    <h2 class="modal-titulo">¡NIVEL UP!</h2>
                    <p class="modal-nivel">Nivel <span id="modal-nivel-numero">2</span></p>
                    <p class="text-xl mb-6">¡Sigue así, guerrero!</p>
                    <button id="btn-cerrar-modal" class="btn-primary">
                        Continuar
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('modal-nivel');
        this.configurarEventos();
    }

    /**
     * Configura los eventos del modal
     */
    configurarEventos() {
        const btnCerrar = document.getElementById('btn-cerrar-modal');
        if (btnCerrar) {
            btnCerrar.addEventListener('click', () => this.cerrar());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.cerrar();
                }
            });
        }
    }

    /**
     * Muestra el modal de nivel subido
     * @param {number} nivel 
     */
    mostrarNivelSubido(nivel) {
        const numeroNivel = document.getElementById('modal-nivel-numero');
        if (numeroNivel) {
            numeroNivel.textContent = nivel;
        }
        this.abrir();
    }

    /**
     * Abre el modal
     */
    abrir() {
        if (this.modal) {
            this.modal.style.display = 'flex';
        }
    }

    /**
     * Cierra el modal
     */
    cerrar() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
}

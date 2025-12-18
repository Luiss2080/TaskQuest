// Componente del Formulario de Tareas
export class ComponenteFormulario {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.callback = null;
    }

    /**
     * Renderiza el formulario
     */
    renderizar() {
        if (!this.contenedor) return;

        this.contenedor.innerHTML = `
            <div class="card">
                <h2 class="text-2xl font-bold mb-4 flex items-center">
                    <i class="fas fa-plus-circle mr-3 text-indigo-500"></i>
                    Nueva Misión
                </h2>
                
                <form id="formulario-tarea" class="contenedor-formulario">
                    <div class="grupo-formulario">
                        <input 
                            type="text" 
                            id="input-tarea" 
                            placeholder="Describe tu misión..." 
                            class="input-texto"
                            required
                        >
                    </div>
                    
                    <div class="fila-formulario">
                        <div class="grupo-formulario">
                            <label class="label-formulario">Dificultad</label>
                            <select id="select-dificultad" class="input-select">
                                <option value="facil">⭐ Fácil (+10 XP)</option>
                                <option value="media" selected>⭐⭐ Media (+25 XP)</option>
                                <option value="dificil">⭐⭐⭐ Difícil (+50 XP)</option>
                                <option value="epica">⭐⭐⭐⭐ Épica (+100 XP)</option>
                            </select>
                        </div>
                        
                        <div class="grupo-formulario">
                            <label class="label-formulario">Categoría</label>
                            <select id="select-categoria" class="input-select">
                                <option value="trabajo">💼 Trabajo</option>
                                <option value="estudio">📚 Estudio</option>
                                <option value="salud">❤️ Salud</option>
                                <option value="personal">🎯 Personal</option>
                                <option value="otros">📌 Otros</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="w-full btn-primary">
                        <i class="fas fa-scroll mr-2"></i>
                        Aceptar Misión
                    </button>
                </form>
            </div>
        `;

        this.configurarEventos();
    }

    /**
     * Configura los eventos del formulario
     */
    configurarEventos() {
        const formulario = document.getElementById('formulario-tarea');
        
        if (formulario) {
            formulario.addEventListener('submit', (e) => {
                e.preventDefault();
                this.manejarEnvio();
            });
        }
    }

    /**
     * Maneja el envío del formulario
     */
    manejarEnvio() {
        const input = document.getElementById('input-tarea');
        const selectDificultad = document.getElementById('select-dificultad');
        const selectCategoria = document.getElementById('select-categoria');

        const datos = {
            texto: input.value.trim(),
            dificultad: selectDificultad.value,
            categoria: selectCategoria.value
        };

        if (this.callback && datos.texto) {
            this.callback(datos);
            this.limpiarFormulario();
        }
    }

    /**
     * Limpia el formulario
     */
    limpiarFormulario() {
        const input = document.getElementById('input-tarea');
        if (input) {
            input.value = '';
        }
    }

    /**
     * Configura el callback para cuando se envía el formulario
     * @param {Function} callback 
     */
    alEnviar(callback) {
        this.callback = callback;
    }
}

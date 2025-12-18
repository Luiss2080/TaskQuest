// Aplicación Principal de TaskQuest
import { ControladorTareas } from './controladores/ControladorTareas.js';
import { ControladorJugador } from './controladores/ControladorJugador.js';
import { ControladorQuestDiaria } from './controladores/ControladorQuestDiaria.js';
import { ComponenteEncabezado } from './componentes/ComponenteEncabezado.js';
import { ComponenteFormulario } from './componentes/ComponenteFormulario.js';
import { ComponenteListaTareas } from './componentes/ComponenteListaTareas.js';
import { ComponentePanelEstadisticas } from './componentes/ComponentePanelEstadisticas.js';
import { ComponenteQuestDiaria } from './componentes/ComponenteQuestDiaria.js';
import { ComponenteModal } from './componentes/ComponenteModal.js';
import { ComponenteNotificaciones } from './componentes/ComponenteNotificaciones.js';
import { ServicioAnimaciones } from './utilidades/animaciones.js';

export class Aplicacion {
    constructor() {
        // Controladores
        this.controladorTareas = new ControladorTareas();
        this.controladorJugador = new ControladorJugador();
        this.controladorQuestDiaria = new ControladorQuestDiaria();

        // Componentes
        this.componenteEncabezado = null;
        this.componenteFormulario = null;
        this.componenteListaTareas = null;
        this.componentePanelEstadisticas = null;
        this.componenteQuestDiaria = null;
        this.componenteModal = null;
    }

    /**
     * Inicializa la aplicación
     */
    inicializar() {
        this.inicializarComponentes();
        this.configurarObservadores();
        this.configurarEventosComponentes();
        this.verificarEstadoInicial();
        this.renderizarTodo();
    }

    /**
     * Inicializa todos los componentes
     */
    inicializarComponentes() {
        this.componenteEncabezado = new ComponenteEncabezado('encabezado-app');
        this.componenteFormulario = new ComponenteFormulario('formulario-container');
        this.componenteListaTareas = new ComponenteListaTareas('lista-tareas-container');
        this.componentePanelEstadisticas = new ComponentePanelEstadisticas('panel-estadisticas');
        this.componenteQuestDiaria = new ComponenteQuestDiaria('quest-diaria-container');
        this.componenteModal = new ComponenteModal();

        // Renderizar componentes iniciales
        this.componenteEncabezado.renderizar();
        this.componenteFormulario.renderizar();
        this.componentePanelEstadisticas.renderizar();
        this.componenteQuestDiaria.renderizar();
    }

    /**
     * Configura los observadores de los controladores
     */
    configurarObservadores() {
        // Observador de tareas
        this.controladorTareas.agregarObservador((tareas) => {
            this.componenteListaTareas.renderizar(tareas);
        });

        // Observador de jugador
        this.controladorJugador.agregarObservador((jugador) => {
            const stats = this.controladorJugador.obtenerEstadisticas();
            this.componenteEncabezado.actualizarDatos(stats);
            this.componentePanelEstadisticas.actualizarDatos(stats);
        });

        // Observador de quest diaria
        this.controladorQuestDiaria.agregarObservador((quest) => {
            const estado = this.controladorQuestDiaria.obtenerEstado();
            this.componenteQuestDiaria.actualizarEstado(estado);
        });

        // Observador de quest completada
        this.controladorQuestDiaria.agregarObservadorCompletada((quest) => {
            this.manejarQuestCompletada();
        });
    }

    /**
     * Configura los eventos de los componentes
     */
    configurarEventosComponentes() {
        // Evento de formulario
        this.componenteFormulario.alEnviar((datos) => {
            this.manejarCrearTarea(datos);
        });

        // Eventos de lista de tareas
        this.componenteListaTareas.alCompletar((id) => {
            this.manejarCompletarTarea(id);
        });

        this.componenteListaTareas.alEliminar((id) => {
            this.manejarEliminarTarea(id);
        });

        this.componenteListaTareas.alLimpiar(() => {
            this.manejarLimpiarCompletadas();
        });
    }

    /**
     * Verifica el estado inicial
     */
    verificarEstadoInicial() {
        this.controladorJugador.verificarDiaActual();
        this.controladorQuestDiaria.verificarReinicio();
    }

    /**
     * Renderiza todo el contenido inicial
     */
    renderizarTodo() {
        const tareas = this.controladorTareas.obtenerTodas();
        const stats = this.controladorJugador.obtenerEstadisticas();
        const estado = this.controladorQuestDiaria.obtenerEstado();

        this.componenteListaTareas.renderizar(tareas);
        this.componenteEncabezado.actualizarDatos(stats);
        this.componentePanelEstadisticas.actualizarDatos(stats);
        this.componenteQuestDiaria.actualizarEstado(estado);
    }

    /**
     * Maneja la creación de una tarea
     * @param {object} datos 
     */
    manejarCrearTarea(datos) {
        try {
            const tarea = this.controladorTareas.crearTarea(
                datos.texto,
                datos.dificultad,
                datos.categoria
            );

            // Animación del botón
            const btnSubmit = document.querySelector('#formulario-tarea button[type="submit"]');
            if (btnSubmit) {
                ServicioAnimaciones.animarRebote(btnSubmit);
            }

            ComponenteNotificaciones.mostrar('¡Misión aceptada!', 'exito', 2000);
        } catch (error) {
            ComponenteNotificaciones.mostrar(error.message, 'error');
        }
    }

    /**
     * Maneja completar una tarea
     * @param {string} id 
     */
    manejarCompletarTarea(id) {
        try {
            const resultado = this.controladorTareas.alternarTarea(id);
            
            if (resultado.seCompleto) {
                const tarea = resultado.tarea;
                
                // Añadir XP al jugador
                const subioNivel = this.controladorJugador.agregarXP(tarea.recompensaXP);
                this.controladorJugador.registrarTareaCompletada();
                
                // Actualizar quest diaria
                const completoQuest = this.controladorQuestDiaria.agregarProgreso();
                
                // Animaciones
                this.animarTareaCompletada(id);
                
                // Mostrar modal si subió de nivel
                if (subioNivel) {
                    setTimeout(() => {
                        this.manejarNivelSubido();
                    }, 500);
                }
                
                ComponenteNotificaciones.mostrar(
                    `+${tarea.recompensaXP} XP`,
                    'exito',
                    1500
                );
            }
        } catch (error) {
            ComponenteNotificaciones.mostrar(error.message, 'error');
        }
    }

    /**
     * Maneja eliminar una tarea
     * @param {string} id 
     */
    manejarEliminarTarea(id) {
        try {
            this.controladorTareas.eliminarTarea(id);
        } catch (error) {
            ComponenteNotificaciones.mostrar(error.message, 'error');
        }
    }

    /**
     * Maneja limpiar tareas completadas
     */
    manejarLimpiarCompletadas() {
        this.controladorTareas.eliminarCompletadas();
        ComponenteNotificaciones.mostrar('Tareas completadas eliminadas', 'info', 2000);
    }

    /**
     * Maneja cuando el jugador sube de nivel
     */
    manejarNivelSubido() {
        const stats = this.controladorJugador.obtenerEstadisticas();
        this.componenteModal.mostrarNivelSubido(stats.nivel);
        
        // Animación de nivel
        ServicioAnimaciones.animarNivelSubido('#jugador-nivel');
        ServicioAnimaciones.animarNivelSubido('#panel-nivel');
    }

    /**
     * Maneja cuando se completa la quest diaria
     */
    manejarQuestCompletada() {
        const estado = this.controladorQuestDiaria.obtenerEstado();
        this.controladorJugador.agregarXP(estado.bonusXP);
        ComponenteNotificaciones.mostrarQuestCompletada(estado.bonusXP);
    }

    /**
     * Anima una tarea completada
     * @param {string} id 
     */
    animarTareaCompletada(id) {
        const elemento = document.querySelector(`[data-tarea-id="${id}"]`);
        if (elemento) {
            ServicioAnimaciones.animarDesaparicion(elemento);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const app = new Aplicacion();
    app.inicializar();
});

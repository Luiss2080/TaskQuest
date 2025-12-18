// Constantes de la aplicación
export const CLAVES_ALMACENAMIENTO = {
    TAREAS: 'taskquest_tareas',
    JUGADOR: 'taskquest_jugador',
    LOGROS: 'taskquest_logros',
    QUEST_DIARIA: 'taskquest_quest_diaria'
};

export const CONFIGURACION_DIFICULTAD = {
    facil: { 
        xp: 10, 
        estrellas: '⭐', 
        color: '#22c55e',
        nombre: 'Fácil'
    },
    media: { 
        xp: 25, 
        estrellas: '⭐⭐', 
        color: '#3b82f6',
        nombre: 'Media'
    },
    dificil: { 
        xp: 50, 
        estrellas: '⭐⭐⭐', 
        color: '#a855f7',
        nombre: 'Difícil'
    },
    epica: { 
        xp: 100, 
        estrellas: '⭐⭐⭐⭐', 
        color: '#f59e0b',
        nombre: 'Épica'
    }
};

export const ICONOS_CATEGORIA = {
    trabajo: '💼',
    estudio: '📚',
    salud: '❤️',
    personal: '🎯',
    otros: '📌'
};

export const NOMBRES_CATEGORIA = {
    trabajo: 'Trabajo',
    estudio: 'Estudio',
    salud: 'Salud',
    personal: 'Personal',
    otros: 'Otros'
};

export const CONFIGURACION_QUEST_DIARIA = {
    meta: 3,
    bonusXP: 50
};

export const CONFIGURACION_LOGROS = [
    {
        id: 'primera_mision',
        nombre: 'Primera Misión',
        descripcion: 'Completa tu primera tarea',
        icono: 'fa-medal',
        condicion: (jugador) => jugador.tareasCompletadas >= 1
    },
    {
        id: 'racha_fuego',
        nombre: 'Racha de Fuego',
        descripcion: 'Completa tareas 7 días seguidos',
        icono: 'fa-fire',
        condicion: (jugador) => jugador.racha >= 7
    },
    {
        id: 'nivel_10',
        nombre: 'Nivel 10',
        descripcion: 'Alcanza el nivel 10',
        icono: 'fa-star',
        condicion: (jugador) => jugador.nivel >= 10
    },
    {
        id: 'maestro_tareas',
        nombre: 'Maestro de Tareas',
        descripcion: 'Completa 50 tareas',
        icono: 'fa-trophy',
        condicion: (jugador) => jugador.tareasCompletadas >= 50
    },
    {
        id: 'velocista',
        nombre: 'Velocista',
        descripcion: 'Completa 10 tareas en un día',
        icono: 'fa-bolt',
        condicion: (jugador) => jugador.tareasHoy >= 10
    }
];

export const MENSAJES = {
    tareaCreada: '¡Misión aceptada!',
    tareaCompletada: '¡Misión completada!',
    nivelSubido: '¡NIVEL UP!',
    questDiariaCompletada: '¡Quest Diaria Completada!',
    logroDesbloqueado: '¡Logro Desbloqueado!',
    sinTareas: 'No hay misiones activas. ¡Crea tu primera quest!',
    errorGeneral: 'Ocurrió un error. Inténtalo de nuevo.'
};

export const SONIDOS = {
    tareaCompletada: 'task_complete.mp3',
    nivelSubido: 'level_up.mp3',
    questCompletada: 'quest_complete.mp3',
    logroDesbloqueado: 'achievement.mp3'
};

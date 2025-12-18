# TaskQuest 🎮

**Convierte tus tareas en misiones épicas**

## 📁 Estructura del Proyecto

El proyecto está organizado de forma modular con archivos pequeños y especializados:

```
TaskQuest/
├── vistas/                          # Archivos HTML
│   └── index.html                  # Vista principal
│
├── estilos/                         # Archivos CSS
│   ├── principal.css               # Archivo principal que importa todo
│   ├── output.css                  # CSS compilado (generado)
│   └── componentes/                # Estilos por componente
│       ├── botones.css            # Estilos de botones
│       ├── tarjetas.css           # Estilos de tarjetas y contenedores
│       ├── formularios.css        # Estilos de formularios e inputs
│       ├── animaciones.css        # Animaciones personalizadas
│       ├── barras-progreso.css    # Barras de progreso
│       ├── modal.css              # Modales y notificaciones
│       └── layout.css             # Estructura y layout
│
├── js/                              # Archivos JavaScript
│   ├── principal.js                # Aplicación principal
│   │
│   ├── modelos/                    # Modelos de datos
│   │   ├── Jugador.js             # Modelo del jugador
│   │   ├── Tarea.js               # Modelo de tarea
│   │   └── QuestDiaria.js         # Modelo de quest diaria
│   │
│   ├── controladores/              # Lógica de negocio
│   │   ├── ControladorTareas.js   # Gestión de tareas
│   │   ├── ControladorJugador.js  # Gestión del jugador
│   │   └── ControladorQuestDiaria.js # Gestión de quest diaria
│   │
│   ├── componentes/                # Componentes de UI
│   │   ├── ComponenteEncabezado.js       # Header del app
│   │   ├── ComponenteFormulario.js       # Formulario de tareas
│   │   ├── ComponenteListaTareas.js      # Lista de tareas
│   │   ├── ComponentePanelEstadisticas.js # Panel lateral
│   │   ├── ComponenteQuestDiaria.js      # Quest diaria
│   │   ├── ComponenteModal.js            # Modal de nivel
│   │   └── ComponenteNotificaciones.js   # Notificaciones
│   │
│   └── utilidades/                 # Funciones auxiliares
│       ├── constantes.js          # Configuración y constantes
│       ├── almacenamiento.js      # Gestión de LocalStorage
│       ├── animaciones.js         # Utilidades de animación
│       ├── fechas.js              # Utilidades de fechas
│       └── helpers.js             # Funciones auxiliares
│
├── assets/                          # Recursos multimedia
│   ├── imagenes/
│   └── sonidos/
│
├── node_modules/                    # Dependencias
├── package.json                     # Configuración npm
├── tailwind.config.js              # Configuración Tailwind
├── postcss.config.js               # Configuración PostCSS
└── README.md                        # Este archivo
```

## 🎯 Descripción de Archivos

### Modelos (js/modelos/)
- **Jugador.js**: Gestiona nivel, XP, racha y estadísticas del jugador
- **Tarea.js**: Define la estructura y comportamiento de una tarea
- **QuestDiaria.js**: Maneja la quest diaria y su progreso

### Controladores (js/controladores/)
- **ControladorTareas.js**: CRUD de tareas, filtros, ordenamiento
- **ControladorJugador.js**: Gestión de XP, niveles, estadísticas
- **ControladorQuestDiaria.js**: Control de progreso diario

### Componentes de UI (js/componentes/)
- **ComponenteEncabezado.js**: Renderiza y actualiza el header
- **ComponenteFormulario.js**: Maneja el formulario de nueva tarea
- **ComponenteListaTareas.js**: Renderiza la lista de tareas
- **ComponentePanelEstadisticas.js**: Panel lateral con stats
- **ComponenteQuestDiaria.js**: Muestra progreso de quest diaria
- **ComponenteModal.js**: Modal de subida de nivel
- **ComponenteNotificaciones.js**: Sistema de notificaciones

### Utilidades (js/utilidades/)
- **constantes.js**: Todas las constantes de la app
- **almacenamiento.js**: Wrapper de LocalStorage
- **animaciones.js**: Funciones de animación con Anime.js
- **fechas.js**: Utilidades para manejo de fechas
- **helpers.js**: Funciones auxiliares generales

### Estilos (estilos/componentes/)
- **botones.css**: Todos los estilos de botones
- **tarjetas.css**: Tarjetas y contenedores
- **formularios.css**: Inputs y selects
- **animaciones.css**: Animaciones CSS
- **barras-progreso.css**: Barras de progreso
- **modal.css**: Modales y notificaciones
- **layout.css**: Estructura general

## 🚀 Cómo usar

### Instalación
```bash
cd c:\laragon\www\TaskQuest
npm install
```

### Desarrollo
```bash
# Modo watch (recompila automáticamente)
npm run dev
```

### Producción
```bash
# Compilación optimizada
npm run build
```

### Ejecutar
Abre en tu navegador:
```
http://localhost/TaskQuest/vistas/
```

## 🎮 Características

- ✅ Sistema de niveles y XP
- ✅ 4 dificultades (Fácil, Media, Difícil, Épica)
- ✅ 5 categorías de tareas
- ✅ Sistema de rachas diarias
- ✅ Quest diaria con bonus
- ✅ Animaciones fluidas
- ✅ Persistencia con LocalStorage
- ✅ Diseño responsivo

## 📝 Arquitectura

El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)**:

- **Modelos**: Clases con la lógica de datos
- **Vistas**: Componentes que renderizan UI
- **Controladores**: Coordinan modelos y vistas

Además utiliza el patrón **Observer** para la comunicación entre componentes.

## 🔧 Tecnologías

- JavaScript ES6+ (Módulos)
- TailwindCSS v4
- Anime.js
- LocalStorage API
- Font Awesome
- Google Fonts

---

**¡Proyecto completamente modular y organizado! 🎉**

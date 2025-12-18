<div align="center">

# 🎮 TaskQuest

### **Convierte tus tareas aburridas en misiones épicas**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Anime.js](https://img.shields.io/badge/Anime.js-Animation-FF0080?style=for-the-badge)](https://animejs.com)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

**¿Cansado de hacer listas de tareas aburridas? 😴**  
**¡Conviértete en un guerrero de la productividad! ⚔️**

[🚀 Demo](#) · [📖 Documentación](ESTRUCTURA.md) · [🐛 Reportar Bug](#) · [✨ Solicitar Feature](#)

</div>

---

## 🎯 ¿Qué es TaskQuest?

**TaskQuest** transforma tu lista de tareas en un **juego RPG adictivo**. Cada tarea completada te da **XP**, subes de **nivel**, mantienes **rachas diarias** y desbloqueas **logros**.

> 💡 **¿Por qué es diferente?**  
> No es solo otra app de tareas. Es tu propio videojuego de productividad donde TÚ eres el protagonista.

### ✨ Características Principales

<table>
<tr>
<td width="50%">

#### 🎮 **Gamificación Total**
- ⬆️ Sistema de niveles y XP
- 🔥 Rachas diarias que te motivan
- 🏆 Logros desbloqueables
- 💪 Quest diaria con bonus

</td>
<td width="50%">

#### ⚡ **Súper Productivo**
- 📝 4 niveles de dificultad
- 🏷️ 5 categorías organizadas
- 📊 Estadísticas detalladas
- 💾 Exportar/Importar datos

</td>
</tr>
</table>

---

## 🚀 Demo Rápida

```bash
# 1. Clonar el repo
git clone https://github.com/tu-usuario/TaskQuest.git

# 2. Instalar dependencias
cd TaskQuest
npm install

# 3. Compilar estilos
npm run build

# 4. ¡Abrir y jugar!
# Abrir vistas/index.html en tu navegador
```

**O con Laragon:**  
`http://localhost/TaskQuest/vistas/`

---

## 🎮 Cómo Jugar

### 1️⃣ **Crea tu Misión**
```
📝 "Terminar informe de ventas"
⭐⭐⭐ Difícil → +50 XP
💼 Categoría: Trabajo
```

### 2️⃣ **Completa y Gana XP**
```
✅ Tarea completada
💰 +50 XP ganados
📈 Progreso: 150/200 XP
```

### 3️⃣ **¡Sube de Nivel!**
```
🎊 ¡NIVEL UP!
⬆️ Nivel 2 alcanzado
🎯 Siguiente nivel: 200 XP
```

### 4️⃣ **Mantén tu Racha**
```
🔥 Racha actual: 7 días
📅 Quest diaria: 3/3 (+50 XP bonus)
```

---

## 📊 Sistema de Recompensas

| Dificultad | Estrellas | XP | Cuándo usar |
|------------|-----------|-----|-------------|
| **Fácil** | ⭐ | +10 XP | 5-15 minutos |
| **Media** | ⭐⭐ | +25 XP | 30-60 minutos |
| **Difícil** | ⭐⭐⭐ | +50 XP | 1-3 horas |
| **Épica** | ⭐⭐⭐⭐ | +100 XP | 3+ horas |

### 🎁 Bonus Especiales

- 🌟 **Quest Diaria**: Completa 3 tareas → **+50 XP**
- 🔥 **Racha de 7 días**: Desbloquea logro especial
- 📈 **Nivel 10**: Conviértete en maestro de tareas

---

## 🏗️ Arquitectura (Para Desarrolladores)

### 🎨 **Diseño Modular**

El proyecto está **súper organizado** con **28 archivos** especializados:

```
TaskQuest/
├── 📂 vistas/           → 4 páginas HTML
├── 📂 estilos/          → 7 archivos CSS modulares
├── 📂 js/
│   ├── modelos/        → 3 clases de datos
│   ├── controladores/  → 3 gestores de lógica
│   ├── componentes/    → 7 componentes UI
│   └── utilidades/     → 5 helpers
└── 📄 principal.js      → Orquestador
```

**[📖 Ver estructura completa →](ESTRUCTURA.md)**

### 🔧 **Stack Tecnológico**

```javascript
const stack = {
  frontend: ['JavaScript ES6+', 'TailwindCSS v4', 'HTML5'],
  animaciones: ['Anime.js'],
  almacenamiento: ['LocalStorage API'],
  arquitectura: ['MVC', 'Observer Pattern', 'Modular Design'],
  estilo: ['Utility-First CSS', 'Component-Based']
};
```

### 📦 **Scripts Disponibles**

```bash
npm run dev    # 🔥 Modo desarrollo (watch)
npm run build  # 📦 Compilar para producción
```

---

## 🎨 Capturas de Pantalla

<div align="center">

### 🏠 **Pantalla Principal**
La interfaz donde la magia sucede

### 📊 **Estadísticas**
Todas tus métricas en un solo lugar

### ⚙️ **Configuración**
Controla tus datos y progreso

### ❓ **Tutorial Interactivo**
Aprende mientras juegas

</div>

---

## 🎯 Casos de Uso

### 👨‍💻 **Para Desarrolladores**
```javascript
// Ideal para sprint planning
const tarea = {
  texto: "Implementar autenticación OAuth",
  dificultad: "epica",  // +100 XP
  categoria: "trabajo"
};
```

### 📚 **Para Estudiantes**
```javascript
// Organiza tu estudio
const tareas = [
  { texto: "Leer capítulo 3", dificultad: "media" },
  { texto: "Hacer ejercicios", dificultad: "dificil" },
  { texto: "Repasar apuntes", dificultad: "facil" }
];
```

### 🏋️ **Para Fitness**
```javascript
// Mantén tu rutina
const workout = {
  texto: "30 min cardio",
  dificultad: "media",
  categoria: "salud"  // ❤️
};
```

---

## 🚀 Características Futuras

- [ ] 🎵 Sonidos de videojuego
- [ ] 🌙 Modo oscuro/claro
- [ ] 👤 Sistema de avatares
- [ ] 🏆 Más logros desbloqueables
- [ ] 📱 PWA (App móvil)
- [ ] ⏱️ Timer Pomodoro integrado
- [ ] 🌐 Sincronización en la nube
- [ ] 🤝 Modo multijugador

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/nuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nuevaCaracteristica`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 💖 Agradecimientos

- **TailwindCSS** - Por hacer el CSS divertido
- **Anime.js** - Por las animaciones épicas
- **Font Awesome** - Por los iconos increíbles
- **Google Fonts** - Por la tipografía perfecta

---

<div align="center">

### ⭐ ¿Te gusta TaskQuest?

**¡Dale una estrella al repo!** ⭐

**Hecho con 💜 y mucho ☕**

[🔝 Volver arriba](#-taskquest)

</div>

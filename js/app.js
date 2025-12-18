// TaskQuest - Sistema de gamificación para tareas
// LocalStorage keys
const STORAGE_KEYS = {
    TASKS: 'taskquest_tasks',
    PLAYER: 'taskquest_player',
    ACHIEVEMENTS: 'taskquest_achievements',
    DAILY: 'taskquest_daily'
};

// Configuración de dificultades
const DIFFICULTY_CONFIG = {
    easy: { xp: 10, stars: '⭐', color: '#22c55e' },
    medium: { xp: 25, stars: '⭐⭐', color: '#3b82f6' },
    hard: { xp: 50, stars: '⭐⭐⭐', color: '#a855f7' },
    epic: { xp: 100, stars: '⭐⭐⭐⭐', color: '#f59e0b' }
};

// Configuración de categorías
const CATEGORY_ICONS = {
    work: '💼',
    study: '📚',
    health: '❤️',
    personal: '🎯',
    other: '📌'
};

// Estado del jugador
class Player {
    constructor() {
        this.level = 1;
        this.xp = 0;
        this.totalXP = 0;
        this.completedTasks = 0;
        this.streak = 0;
        this.lastCompletedDate = null;
        this.load();
    }

    get xpForNextLevel() {
        return this.level * 100;
    }

    get xpProgress() {
        return (this.xp / this.xpForNextLevel) * 100;
    }

    addXP(amount) {
        this.xp += amount;
        this.totalXP += amount;
        
        // Verificar si sube de nivel
        while (this.xp >= this.xpForNextLevel) {
            this.levelUp();
        }
        
        this.save();
        this.updateUI();
    }

    levelUp() {
        this.xp -= this.xpForNextLevel;
        this.level++;
        this.showLevelUpModal();
        this.playLevelUpAnimation();
    }

    completeTask() {
        this.completedTasks++;
        this.updateStreak();
        this.save();
        this.updateUI();
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastDate = this.lastCompletedDate;
        
        if (lastDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate === today) {
                // Ya completó una tarea hoy
                return;
            } else if (lastDate === yesterday.toDateString()) {
                // Mantiene la racha
                this.streak++;
            } else {
                // Se rompió la racha
                this.streak = 1;
            }
        } else {
            this.streak = 1;
        }
        
        this.lastCompletedDate = today;
    }

    showLevelUpModal() {
        const modal = document.getElementById('level-up-modal');
        const modalLevel = document.getElementById('modal-level');
        
        modalLevel.textContent = this.level;
        modal.style.display = 'flex';
        
        // Sonido de nivel up (si existiera)
        this.playSound('levelup');
    }

    playLevelUpAnimation() {
        anime({
            targets: '#player-level, #sidebar-level',
            scale: [1, 1.5, 1],
            rotate: [0, 360, 0],
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }

    playSound(soundName) {
        // Placeholder para sonidos futuros
        console.log(`Playing sound: ${soundName}`);
    }

    updateUI() {
        // Actualizar nivel
        document.getElementById('player-level').textContent = this.level;
        document.getElementById('sidebar-level').textContent = this.level;
        
        // Actualizar XP
        document.getElementById('player-xp').textContent = `${this.xp} / ${this.xpForNextLevel}`;
        document.getElementById('total-xp').textContent = this.totalXP;
        
        // Actualizar barra de XP
        document.getElementById('xp-bar').style.width = `${this.xpProgress}%`;
        
        // Actualizar racha
        document.getElementById('player-streak').innerHTML = `<i class="fas fa-fire"></i> ${this.streak}`;
        document.getElementById('sidebar-streak').textContent = `${this.streak} días`;
        
        // Actualizar tareas completadas
        document.getElementById('total-completed').textContent = this.completedTasks;
    }

    save() {
        localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify({
            level: this.level,
            xp: this.xp,
            totalXP: this.totalXP,
            completedTasks: this.completedTasks,
            streak: this.streak,
            lastCompletedDate: this.lastCompletedDate
        }));
    }

    load() {
        const data = localStorage.getItem(STORAGE_KEYS.PLAYER);
        if (data) {
            const parsed = JSON.parse(data);
            Object.assign(this, parsed);
        }
    }
}

// Clase de Tarea
class Task {
    constructor(text, difficulty = 'medium', category = 'other') {
        this.id = Date.now().toString();
        this.text = text;
        this.difficulty = difficulty;
        this.category = category;
        this.completed = false;
        this.createdAt = new Date().toISOString();
    }

    get xpReward() {
        return DIFFICULTY_CONFIG[this.difficulty].xp;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

// Gestor de tareas
class TaskManager {
    constructor() {
        this.tasks = [];
        this.load();
    }

    addTask(task) {
        this.tasks.unshift(task);
        this.save();
        this.render();
        this.animateNewTask(task.id);
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task && !task.completed) {
            task.toggle();
            
            // Añadir XP al jugador
            player.addXP(task.xpReward);
            player.completeTask();
            
            // Actualizar daily quest
            dailyQuest.addProgress();
            
            // Animación de completado
            this.animateTaskComplete(id);
            
            // Guardar y renderizar después de la animación
            setTimeout(() => {
                this.save();
                this.render();
            }, 500);
        }
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.save();
        this.render();
    }

    animateNewTask(id) {
        const element = document.querySelector(`[data-task-id="${id}"]`);
        if (element) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [-20, 0],
                scale: [0.9, 1],
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    }

    animateTaskComplete(id) {
        const element = document.querySelector(`[data-task-id="${id}"]`);
        if (element) {
            anime({
                targets: element,
                opacity: [1, 0],
                translateX: [0, 100],
                scale: [1, 0.8],
                duration: 500,
                easing: 'easeInQuad'
            });
        }
    }

    render() {
        const container = document.getElementById('tasks-container');
        const emptyState = document.getElementById('empty-state');
        
        if (this.tasks.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        
        container.innerHTML = this.tasks.map(task => {
            const config = DIFFICULTY_CONFIG[task.difficulty];
            const icon = CATEGORY_ICONS[task.category];
            
            return `
                <div class="task-item ${task.completed ? 'opacity-50' : ''}" data-task-id="${task.id}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3 flex-1">
                            <button 
                                onclick="taskManager.toggleTask('${task.id}')"
                                class="w-6 h-6 rounded-full border-2 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'} flex items-center justify-center transition-all hover:scale-110"
                            >
                                ${task.completed ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
                            </button>
                            
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="text-lg">${icon}</span>
                                    <span class="text-sm" style="color: ${config.color}">${config.stars}</span>
                                </div>
                                <p class="font-medium ${task.completed ? 'line-through' : ''}">${task.text}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-3">
                            <div class="text-center">
                                <div class="text-xs opacity-75">XP</div>
                                <div class="font-bold" style="color: ${config.color}">+${config.xp}</div>
                            </div>
                            <button 
                                onclick="taskManager.removeTask('${task.id}')"
                                class="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    save() {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
    }

    load() {
        const data = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
}

// Daily Quest
class DailyQuest {
    constructor() {
        this.goal = 3;
        this.progress = 0;
        this.lastResetDate = null;
        this.load();
        this.checkReset();
    }

    checkReset() {
        const today = new Date().toDateString();
        if (this.lastResetDate !== today) {
            this.progress = 0;
            this.lastResetDate = today;
            this.save();
        }
    }

    addProgress() {
        if (this.progress < this.goal) {
            this.progress++;
            
            if (this.progress === this.goal) {
                this.complete();
            }
            
            this.save();
            this.updateUI();
        }
    }

    complete() {
        player.addXP(50);
        this.showCompletionNotification();
    }

    showCompletionNotification() {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-trophy text-2xl"></i>
                <div>
                    <div class="font-bold">¡Quest Diaria Completada!</div>
                    <div class="text-sm">+50 XP Bonus</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuad',
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: notification,
                        translateX: [0, 300],
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeInQuad',
                        complete: () => notification.remove()
                    });
                }, 3000);
            }
        });
    }

    updateUI() {
        const percentage = (this.progress / this.goal) * 100;
        document.getElementById('daily-progress').style.width = `${percentage}%`;
        document.getElementById('daily-count').textContent = `${this.progress}/${this.goal}`;
    }

    save() {
        localStorage.setItem(STORAGE_KEYS.DAILY, JSON.stringify({
            progress: this.progress,
            lastResetDate: this.lastResetDate
        }));
    }

    load() {
        const data = localStorage.getItem(STORAGE_KEYS.DAILY);
        if (data) {
            Object.assign(this, JSON.parse(data));
        }
    }
}

// Instancias globales
const player = new Player();
const taskManager = new TaskManager();
const dailyQuest = new DailyQuest();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar UI
    player.updateUI();
    taskManager.render();
    dailyQuest.updateUI();
    
    // Form de nueva tarea
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = document.getElementById('task-input');
        const difficulty = document.getElementById('task-difficulty').value;
        const category = document.getElementById('task-category').value;
        
        if (input.value.trim()) {
            const task = new Task(input.value.trim(), difficulty, category);
            taskManager.addTask(task);
            input.value = '';
            
            // Animación del botón
            anime({
                targets: 'button[type="submit"]',
                scale: [1, 0.95, 1],
                duration: 200
            });
        }
    });
    
    // Limpiar completadas
    document.getElementById('clear-completed').addEventListener('click', () => {
        taskManager.clearCompleted();
    });
    
    // Cerrar modal de level up
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('level-up-modal').style.display = 'none';
    });
});

// Exponer para uso en HTML
window.taskManager = taskManager;

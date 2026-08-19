import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  completed: boolean;
  createdAt: number;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  icon: string;
}

export interface InventoryItem extends Reward {
  instanceId: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'levelUp';
}

interface GameState {
  tasks: Task[];
  xp: number;
  level: number;
  coins: number;
  health: number;
  maxHealth: number;
  playerClass: 'Cyber Samurai' | 'Neon Mage' | 'Tech Sniper';
  inventory: InventoryItem[];
  toasts: ToastMessage[];
  
  addTask: (text: string, difficulty: Task['difficulty']) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  buyReward: (reward: Reward) => boolean;
  consumeItem: (instanceId: string) => void;
  addCoins: (amount: number) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  setClass: (c: GameState['playerClass']) => void;
  resetData: () => void;
  importData: (data: any) => void;
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const XP_MAP = { easy: 10, medium: 25, hard: 50, epic: 100 };

const initialState = {
  tasks: [],
  xp: 0,
  level: 1,
  coins: 50,
  health: 100,
  maxHealth: 100,
  playerClass: 'Cyber Samurai' as const,
  inventory: [],
  toasts: []
};

export const useStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      toasts: [], // Don't persist toasts
      
      addToast: (message, type = 'info') => {
        const id = crypto.randomUUID();
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
        }, 3000);
      },
      
      removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),

      addTask: (text, difficulty) => {
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), text, difficulty, completed: false, createdAt: Date.now() }
          ]
        }))
        get().addToast('Nueva misión añadida', 'info');
      },
      
      toggleTask: (id) => set((state) => {
        const task = state.tasks.find(t => t.id === id);
        if (!task) return state;
        
        const isCompleting = !task.completed;
        const xpGained = isCompleting ? XP_MAP[task.difficulty] : -XP_MAP[task.difficulty];
        const coinsGained = isCompleting ? Math.floor(XP_MAP[task.difficulty] / 2) : -Math.floor(XP_MAP[task.difficulty] / 2);
        
        let newXp = state.xp + xpGained;
        let newLevel = state.level;
        let leveledUp = false;
        
        while (newXp >= newLevel * 100) {
          newXp -= newLevel * 100;
          newLevel++;
          leveledUp = true;
        }
        if (newXp < 0 && newLevel > 1) {
          newLevel--;
          newXp = (newLevel * 100) + newXp;
        }

        const newHealth = isCompleting ? Math.min(state.maxHealth, state.health + 5) : state.health;

        if (isCompleting) {
           get().addToast(`¡Completado! +${xpGained} XP, +${coinsGained} Créditos`, 'success');
           if (leveledUp) get().addToast(`¡NIVEL AUMENTADO A ${newLevel}!`, 'levelUp');
        }

        return {
          tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t),
          xp: Math.max(0, newXp),
          level: newLevel,
          coins: Math.max(0, state.coins + coinsGained),
          health: newHealth
        };
      }),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      buyReward: (reward) => {
        const { coins, inventory, addToast } = get();
        if (coins >= reward.cost) {
          set({ 
            coins: coins - reward.cost,
            inventory: [...inventory, { ...reward, instanceId: crypto.randomUUID() }]
          });
          addToast(`Has comprado: ${reward.title}`, 'success');
          return true;
        }
        addToast('Créditos insuficientes', 'error');
        return false;
      },

      consumeItem: (instanceId) => {
        const item = get().inventory.find(i => i.instanceId === instanceId);
        set((state) => ({
          inventory: state.inventory.filter(i => i.instanceId !== instanceId)
        }))
        if(item) get().addToast(`Recompensa consumida: ${item.title}`, 'info');
      },

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      takeDamage: (amount) => set((state) => ({ health: Math.max(0, state.health - amount) })),
      heal: (amount) => set((state) => ({ health: Math.min(state.maxHealth, state.health + amount) })),
      setClass: (c) => set({ playerClass: c }),
      resetData: () => set(initialState),
      importData: (data) => set(data)
    }),
    {
      name: 'taskquest-modern-storage',
      partialize: (state) => ({ ...state, toasts: [] }) // Omit toasts from storage
    }
  )
)

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

interface GameState {
  tasks: Task[];
  xp: number;
  level: number;
  coins: number;
  addTask: (text: string, difficulty: Task['difficulty']) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  buyReward: (cost: number) => boolean;
  addCoins: (amount: number) => void;
}

const XP_MAP = { easy: 10, medium: 25, hard: 50, epic: 100 };

export const useStore = create<GameState>()(
  persist(
    (set, get) => ({
      tasks: [],
      xp: 0,
      level: 1,
      coins: 0,
      
      addTask: (text, difficulty) => set((state) => ({
        tasks: [
          ...state.tasks,
          { id: crypto.randomUUID(), text, difficulty, completed: false, createdAt: Date.now() }
        ]
      })),
      
      toggleTask: (id) => set((state) => {
        const task = state.tasks.find(t => t.id === id);
        if (!task) return state;
        
        const isCompleting = !task.completed;
        const xpGained = isCompleting ? XP_MAP[task.difficulty] : -XP_MAP[task.difficulty];
        const coinsGained = isCompleting ? Math.floor(XP_MAP[task.difficulty] / 2) : -Math.floor(XP_MAP[task.difficulty] / 2);
        
        let newXp = state.xp + xpGained;
        let newLevel = state.level;
        
        while (newXp >= newLevel * 100) {
          newXp -= newLevel * 100;
          newLevel++;
        }
        if (newXp < 0 && newLevel > 1) {
          newLevel--;
          newXp = (newLevel * 100) + newXp;
        }

        return {
          tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t),
          xp: Math.max(0, newXp),
          level: newLevel,
          coins: Math.max(0, state.coins + coinsGained)
        };
      }),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      buyReward: (cost) => {
        const { coins } = get();
        if (coins >= cost) {
          set({ coins: coins - cost });
          return true;
        }
        return false;
      },

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount }))
    }),
    {
      name: 'taskquest-storage',
    }
  )
)

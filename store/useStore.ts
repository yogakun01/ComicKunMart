import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Item = {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  bought: boolean;
  price?: number;
  createdAt?: string;
};

type State = {
  items: Item[];
  addItem: (it: Item) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  toggleBought: (id: string) => Promise<void>;
  editItem: (id: string, updated: Partial<Item>) => Promise<void>;
  loadItems: () => Promise<void>;
  clearAll: () => Promise<void>;
};

const STORAGE_KEY = "comickunmart_items_v1";

export const useStore = create<State>((set, get) => ({
  items: [],

  addItem: async (it) => {
    const newItems = [...get().items, it];
    set({ items: newItems });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  },

  removeItem: async (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    set({ items: newItems });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  },

  toggleBought: async (id) => {
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, bought: !i.bought } : i
    );
    set({ items: newItems });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  },

  editItem: async (id, updated) => {
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, ...updated } : i
    );
    set({ items: newItems });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  },

  loadItems: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) set({ items: JSON.parse(raw) });
    } catch (e) {
      console.warn("Failed to load items:", e);
    }
  },

  clearAll: async () => {
    set({ items: [] });
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
}));

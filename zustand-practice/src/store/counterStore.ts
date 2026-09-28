import { create } from "zustand";

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,

  // Functional state update: accesses previous state to increment 'age' by 1
  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),

  // Functional state update: accesses previous state to decrement 'age' by 1
  decrement: () =>
    set((state) => ({
      count: state.count - 1,
    })),
}));

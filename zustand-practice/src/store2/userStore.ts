import { create } from "zustand";

// Types for the store's state and actions shape
interface UserStore {
  name: string;
  age: number;

  setName: (name: string) => void;
  increaseAge: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  name: "Sita",
  age: 20,

  // Direct state update: replaces 'name' with the new string provided
  setName: (name) =>
    set({
      name: name,
    }),

  // Functional state update: accesses previous state to increment 'age' by 1
  increaseAge: () =>
    set((state) => ({
      age: state.age + 1,
    })),
}));

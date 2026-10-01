import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

interface UsersState {
  users: User[];
  editingUser: User | null;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
  setEditingUser: (user: User | null) => void;
  clearEditingUser: () => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set) => ({
      users: [],
      editingUser: null,
      
      addUser: (user) => set((state) => ({ users: [user, ...state.users] })),
      
      updateUser: (user) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),
      
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),
      
      setEditingUser: (user) => set({ editingUser: user }),
      
      clearEditingUser: () => set({ editingUser: null }),
    }),
    {
      name: "users-storage",
    }
  )
);

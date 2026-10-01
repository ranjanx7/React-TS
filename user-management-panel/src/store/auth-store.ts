import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  registeredUsers: RegisteredUser[];
  currentUser: RegisteredUser | null;
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      registeredUsers: [],
      currentUser: null,

      register: (name, email, password) => {
        const { registeredUsers } = get();
        
        // Check if email already exists
        const existingUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
          return { success: false, message: "Email already registered" };
        }

        const newUser: RegisteredUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
        };

        set({ registeredUsers: [...registeredUsers, newUser] });
        return { success: true, message: "Registration successful" };
      },

      login: (email, password) => {
        const { registeredUsers } = get();
        
        const user = registeredUsers.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!user) {
          return { success: false, message: "Invalid email or password" };
        }

        set({ currentUser: user });
        return { success: true, message: "Login successful" };
      },

      logout: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

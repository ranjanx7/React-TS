// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import type { User } from "../types/user";

// interface UserStore {
//   users: User[];

//   addUser: (user: User) => void;
//   updateUser: (user: User) => void;
//   deleteUser: (id: number) => void;
// }

// export const useUserStore = create<UserStore>()(
//   persist(
//     (set) => ({
//       users: [],

//       addUser: (user) =>
//         set((state) => ({
//           users: [...state.users, user],
//         })),

//       updateUser: (updatedUser) =>
//         set((state) => ({
//           users: state.users.map((user) =>
//             user.id === updatedUser.id ? updatedUser : user,
//           ),
//         })),

//       deleteUser: (id) =>
//         set((state) => ({
//           users: state.users.filter((user) => user.id !== id),
//         })),
//     }),
//     {
//       name: "user-storage", // Unique key in localStorage
//       storage: createJSONStorage(() => localStorage), // Defaults to localStorage if omitted
//     },
//   ),
// );

import { create } from "zustand";
import type { User } from "../types/user";

interface UserStore {
  users: User[];

  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));

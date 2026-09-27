import axios from "axios";
import type { User, UserForm } from "../types/types";

// ==================== READ ====================

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users",
  );

  return response.data;
};

// ==================== CREATE ====================

export const addUser = async (user: UserForm): Promise<User> => {
  const response = await axios.post<User>(
    "https://jsonplaceholder.typicode.com/users",
    user,
  );

  return response.data;
};

// ==================== UPDATE ====================

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put<User>(
    `https://jsonplaceholder.typicode.com/users/${user.id}`,
    user,
  );

  return response.data;
};

// ==================== DELETE ====================

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
};

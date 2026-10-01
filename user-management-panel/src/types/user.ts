export type Gender = "Male" | "Female" | "Other";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  gender: Gender;
  skills: string[];
  country: string;
  termsAccepted: boolean;
}

export type CreateUserPayload = Omit<User, "id">;
export type UpdateUserPayload = User;

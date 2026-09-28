import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "../store/userStore";
import type { User } from "../types/user";
import { userSchema, type UserFormData } from "../schema/userSchema";

import { message } from "antd";

interface UserFormProps {
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}

export function UserForm({ editingUser, setEditingUser }: UserFormProps) {
  const addUser = useUserStore((state) => state.addUser);

  const updateUser = useUserStore((state) => state.updateUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
    },
  });

  // Fill the form when editingUser changes, reset when null
  useEffect(() => {
    if (editingUser) {
      reset({
        name: editingUser.name,
        email: editingUser.email,
        age: editingUser.age,
      });
    } else {
      reset({
        name: "",
        email: "",
        age: "",
        // age: undefined,
      });
    }
  }, [editingUser, reset]);

  const onSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateUser({
        id: editingUser.id,
        name: data.name,
        email: data.email,
        age: data.age,
      });
      message.success("User updated successfully");

      setEditingUser(null);
    } else {
      addUser({
        id: Date.now(),
        name: data.name,
        email: data.email,
        age: data.age,
      });
      message.success("User created successfully");
    }

    reset();
  };

  const handleCancel = () => {
    reset({
      name: "",
      email: "",
      age: undefined,
    });

    setEditingUser(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {editingUser ? "Update User" : "Add User"}
      </h2>

      <div>
        <input
          type="text"
          placeholder="Enter name"
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Enter email"
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          placeholder="Enter age"
          {...register("age", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>

        {editingUser && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

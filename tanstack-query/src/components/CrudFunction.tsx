import type { User } from "../types/types.tsx";
import { fetchUsers, addUser, updateUser, deleteUser } from "./Api.tsx";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema } from "../schema/validation.ts";
import type { UserForm } from "../schema/validation.ts";

import "./CrudFunction.css";

function CRUD() {
  const queryClient = useQueryClient();

  // ==================== READ ====================

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  // ==================== EDITING ID ====================

  const [editingId, setEditingId] = useState<number | null>(null);

  // ==================== REACT HOOK FORM ====================

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // ==================== CREATE ====================

  const addMutation = useMutation({
    mutationFn: addUser,

    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
        if (!oldUsers) {
          return [newUser];
        }

        return [...oldUsers, newUser];
      });
      reset();
    },

    onError: (error) => {
      alert(`Failed to add user: ${error.message}`);
    },
  });

  // ==================== UPDATE ====================

  const updateMutation = useMutation({
    mutationFn: updateUser,

    onSuccess: (updatedUser) => {
      // Manually update the cached "users" data.
      queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
        if (!oldUsers) {
          return [];
        }

        return oldUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        );
      });
      reset();

      // Exit edit mode
      setEditingId(null);
    },

    onError: (error) => {
      alert(`Failed to update user: ${error.message}`);
    },
  });

  // ==================== DELETE ====================

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: (_, deletedUserId) => {
      // Update the cached users after deletion.
      queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
        if (!oldUsers) {
          return [];
        }

        return oldUsers.filter((user) => user.id !== deletedUserId);
      });
    },

    onError: (error) => {
      alert(`Failed to delete user: ${error.message}`);
    },
  });

  // ==================== FORM SUBMIT ====================

  const onSubmit = (formData: UserForm) => {
    // UPDATE
    if (editingId !== null) {
      updateMutation.mutate({
        id: editingId,
        ...formData,
      });

      return;
    }

    // CREATE
    addMutation.mutate(formData);
  };

  // ==================== EDIT ====================

  const handleEdit = (user: User) => {
    setEditingId(user.id);

    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
  };

  // ==================== CANCEL ====================

  const handleCancel = () => {
    setEditingId(null);

    reset();
  };

  // ==================== LOADING ====================

  if (isLoading) {
    return <h2>Fetching data...</h2>;
  }

  // ==================== ERROR ====================

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div>
      <div className="App-Body">
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <div className="input-group">
            <input type="text" placeholder="Name" {...register("name")} />

            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className="input-group">
            <input type="email" placeholder="Email" {...register("email")} />

            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <input type="text" placeholder="Contact" {...register("phone")} />

            {errors.phone && <span>{errors.phone.message}</span>}
          </div>

          <button
            type="submit"
            disabled={addMutation.isPending || updateMutation.isPending}
          >
            {editingId !== null
              ? updateMutation.isPending
                ? "Updating..."
                : "Update User"
              : addMutation.isPending
                ? "Adding..."
                : "Add User"}
          </button>

          {editingId !== null && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>

                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>

                  <button
                    onClick={() => deleteMutation.mutate(user.id)}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CRUD;

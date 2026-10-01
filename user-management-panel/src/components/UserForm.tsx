import { useEffect } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { DefaultValues, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import type { UserFormData } from "../schemas/user.schema";
import { useUsersStore } from "../store/users-store";
import type { User } from "../types/user";

const DEFAULT_FORM_VALUES: DefaultValues<UserFormData> = {
  fullName: "",
  email: "",
  password: "",
  gender: undefined,
  skills: [],
  country: "",
  termsAccepted: false,
};

interface FormFieldProps {
  label: string;
  errorMessage?: string;
  children: ReactNode;
}

const FormField = ({ label, errorMessage, children }: FormFieldProps) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
    {errorMessage && (
      <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
    )}
  </div>
);

interface UserFormProps {
  onClose?: () => void;
}

const UserForm = ({ onClose }: UserFormProps) => {
  const editingUser = useUsersStore((state) => state.editingUser);
  const setEditingUser = useUsersStore((state) => state.setEditingUser);
  const addUser = useUsersStore((state) => state.addUser);
  const updateUser = useUsersStore((state) => state.updateUser);
  const users = useUsersStore((state) => state.users);
  const isEditing = editingUser !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(
      isEditing ? updateUserSchema : createUserSchema,
    ) as unknown as Resolver<UserFormData>,
    defaultValues: DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    if (editingUser) {
      reset({
        fullName: editingUser.fullName,
        email: editingUser.email,
        gender: editingUser.gender,
        skills: editingUser.skills || [],
        country: editingUser.country,
        termsAccepted: editingUser.termsAccepted,
      });
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [editingUser, reset]);

  const handleCancelEdit = () => {
    setEditingUser(null);
    reset(DEFAULT_FORM_VALUES);
    onClose?.();
  };

  const onSubmit = (formData: UserFormData) => {
    if (editingUser) {
      const updatedUser: User = {
        ...editingUser,
        fullName: formData.fullName,
        email: formData.email,
        gender: formData.gender,
        skills: formData.skills,
        country: formData.country,
        termsAccepted: formData.termsAccepted,
      };
      updateUser(updatedUser);
      message.success("User updated successfully");
      reset(DEFAULT_FORM_VALUES);
      setEditingUser(null);
      onClose?.();
    } else {
      const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), 0);
      const newUser: User = {
        id: maxId + 1,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        skills: formData.skills,
        country: formData.country,
        termsAccepted: formData.termsAccepted,
      };
      addUser(newUser);
      message.success("User created successfully");
      reset(DEFAULT_FORM_VALUES);
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">
        {isEditing ? "Edit User" : "Add User"}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField label="Full Name" errorMessage={errors.fullName?.message}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="John Doe"
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Email" errorMessage={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </FormField>

        {!isEditing && (
          <FormField label="Password" errorMessage={errors.password?.message}>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </FormField>
        )}

        <FormField label="Country" errorMessage={errors.country?.message}>
          <select
            {...register("country")}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Country</option>
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
        </FormField>
      </div>

      <FormField label="Gender" errorMessage={errors.gender?.message}>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("gender")} type="radio" value="Male" /> Male
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("gender")} type="radio" value="Female" /> Female
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("gender")} type="radio" value="Other" /> Other
          </label>
        </div>
      </FormField>

      <FormField label="Skills" errorMessage={errors.skills?.message}>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("skills")} type="checkbox" value="React" />{" "}
            React
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("skills")} type="checkbox" value="TypeScript" />{" "}
            TypeScript
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("skills")} type="checkbox" value="JavaScript" />{" "}
            JavaScript
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("skills")} type="checkbox" value="Node.js" />{" "}
            Node.js
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input {...register("skills")} type="checkbox" value="CSS" /> CSS
          </label>
        </div>
      </FormField>

      <div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input {...register("termsAccepted")} type="checkbox" />I accept Terms
          and Conditions
        </label>
        {errors.termsAccepted?.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.termsAccepted.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {isEditing ? "Update User" : "Add User"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;

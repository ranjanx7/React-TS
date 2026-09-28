import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import type { User } from "../types/user";

interface UserFormProps {
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}

function UserForm({ editingUser, setEditingUser }: UserFormProps) {
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // When editingUser changes, put its data into the form
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setAge(editingUser.age.toString());
    } else {
      setName("");
      setEmail("");
      setAge("");
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("Please fill all fields");
      return;
    }

    if (editingUser) {
      updateUser({
        id: editingUser.id,
        name,
        email,
        age: Number(age),
      });

      setEditingUser(null);
    } else {
      addUser({
        id: Date.now(),
        name,
        email,
        age: Number(age),
      });
    }

    setName("");
    setEmail("");
    setAge("");
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{editingUser ? "Update User" : "Add User"}</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button type="submit">{editingUser ? "Update User" : "Add User"}</button>

      {editingUser && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;

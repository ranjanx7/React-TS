import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import SearchUser from "./components/SearchUser";
import type { User } from "./types/user";
import "./App.css";

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <h1>User Management</h1>

      <UserForm editingUser={editingUser} setEditingUser={setEditingUser} />

      <SearchUser setSearch={setSearch} />

      <UserList search={search} setEditingUser={setEditingUser} />
    </div>
  );
}

export default App;

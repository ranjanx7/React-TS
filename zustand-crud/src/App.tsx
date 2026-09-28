import { useState } from "react";
import Nav from "./components/Nav";
import { UserForm } from "./components/UserForm";
import UserList from "./components/UserList";
import SearchUser from "./components/SearchUser";
import type { User } from "./types/user";

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");

  return (
    <div>
      <Nav />
      <div className="app">
        <UserForm editingUser={editingUser} setEditingUser={setEditingUser} />

        <SearchUser setSearch={setSearch} />

        <UserList search={search} setEditingUser={setEditingUser} />
      </div>
    </div>
  );
}

export default App;

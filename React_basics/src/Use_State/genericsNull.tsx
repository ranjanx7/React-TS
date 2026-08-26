import { useState } from "react";

type User = {
  name: string;
};

export function GenericsNull() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <button onClick={() => setUser({ name: "Ram" })}>Add User</button>

      <p>{user ? user.name : "No user"}</p>
    </div>
  );
}

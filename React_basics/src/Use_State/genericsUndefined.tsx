import { useState } from "react";

type User = {
  name: string;
};

export function GenericsUndefined() {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <div>
      <button onClick={() => setUser({ name: "Sita" })}>Add User</button>

      <p>{user ? user.name : "No user"}</p>
    </div>
  );
}

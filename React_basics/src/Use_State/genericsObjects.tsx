import { useState } from "react";

type User = {
  name: string;
  age: number;
};

export function GenericsObjects() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <button
        onClick={() =>
          setUser({
            name: "Ram",
            age: 20,
          })
        }
      >
        Create User
      </button>

      {user && (
        <p>
          {user.name} - {user.age}
        </p>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
}

export function MyComponentThree() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      const data: User[] = await response.json();

      setUsers(data);
    }

    getUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>
          {user.id} - {user.username}
        </p>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string };

export function Fetch() {
  const [state, setState] = useState<ApiState>({ status: "idle" });

  useEffect(() => {
    async function getUsers(): Promise<void> {
      setState({ status: "loading" });

      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
        );

        const data = response.data;

        setState({
          status: "success",
          data,
        });
      } catch (error) {
        setState({
          status: "error",
          error: "Something went wrong",
        });
      }
    }

    getUsers();
  }, []); // Run this effect when the component first loads.

  if (state.status === "idle") {
    return <p>Waiting...</p>;
  }

  if (state.status === "loading") {
    return <p>Loading...</p>;
  }

  if (state.status === "error") {
    return <p>{state.error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>

      {state.data.map((user) => (
        <p key={user.id}>
          {user.id}. {user.name}
        </p>
      ))}
    </div>
  );
}

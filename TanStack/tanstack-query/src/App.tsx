import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import "./App.css";

interface User {
  id: number;
  username: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users",
  );

  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay

  return response.data;
};

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    // refetchOnWindowFocus: false, // automatic refeching disabled
    // retry: 3, // retry failed request 3 times before giving up
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div>
      <h1>Users</h1>

      {data?.map((user) => (
        <p key={user.id}>
          {user.id} - {user.username}
        </p>
      ))}
    </div>
  );
}

export default App;

import { useUserStore } from "../store/userStore";
import type { User } from "../types/user";

interface UserListProps {
  search: string;
  setEditingUser: (user: User) => void;
}

function UserList({ search, setEditingUser }: UserListProps) {
  const users = useUserStore((state) => state.users);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="user-list">
      <h2>Users</h2>

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>

                <td>
                  <button onClick={() => setEditingUser(user)}>Edit</button>

                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;

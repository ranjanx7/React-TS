import { useUserStore } from "../store/userStore";
import type { User } from "../types/user";

import { message } from "antd";

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

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    deleteUser(id);
    message.success("User deleted successfully");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Age</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border-b">{user.name}</td>

                  <td className="px-4 py-3 border-b">{user.email}</td>

                  <td className="px-4 py-3 border-b">{user.age}</td>

                  <td className="px-4 py-3 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;

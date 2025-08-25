import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/all/users");
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 border-b border-gray-700">Name</th>
              <th className="px-6 py-3 border-b border-gray-700">Email</th>
              <th className="px-6 py-3 border-b border-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 border-b border-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    {user.role === 1 ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-600 text-white">
                        Admin
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-600 text-white">
                        User
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

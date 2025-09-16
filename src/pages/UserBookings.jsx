// src/pages/admin/AdminUsers.jsx
import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { adminApi } from "../api";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await adminApi.get("/users/getAll");
        setUsers(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading users...</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Users Management
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 uppercase">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, idx) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{user.username}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={`mailto:${user.email}`}
                    className="text-blue-500 hover:text-blue-700 transition"
                    title={`Send email to ${user.username}`}
                  >
                    <FaEnvelope size={18} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

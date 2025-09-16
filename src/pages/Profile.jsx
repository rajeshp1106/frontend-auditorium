import { useState } from "react";
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Student",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        My <span className="text-yellow-600">Profile</span>
      </h1>

      <div className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          <div className="h-24 w-24 rounded-full bg-yellow-100 flex items-center justify-center text-2xl font-bold text-yellow-600">
            {getInitials(user.name)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-slate-900">{user.name}</h2>
            <p className="text-gray-500 mt-1">{user.role}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
              />
            ) : (
              <p className="mt-2 text-gray-800">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2 text-gray-800">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                {user.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            {isEditing ? (
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
              >
                <option>Student</option>
                <option>Teacher</option>
                <option>Admin</option>
              </select>
            ) : (
              <p className="mt-2 text-gray-800">{user.role}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(user); // reset changes
                }}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-medium shadow hover:bg-yellow-600 transition"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-medium shadow hover:bg-yellow-600 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

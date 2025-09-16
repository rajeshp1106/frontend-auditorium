import React, { useState, useEffect } from "react";
import { adminApi } from "../api"; // your configured axios instance
import toast from "react-hot-toast";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch all bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await adminApi.get("/bookings/getAll");
        setBookings(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Update booking status
  const updateStatus = async (id, newStatus) => {
    try {
      await adminApi.put(`/status/${id}`, { bookingStatus: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      toast.success(`Booking ${newStatus.toLowerCase()} successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    return (
      b.user.username.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterStatus ? b.status === filterStatus : true)
    );
  });

  if (loading) return <div className="p-6 text-slate-700">Loading bookings...</div>;

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-semibold text-slate-900 mb-4">
        Admin <span className="text-yellow-600">Bookings</span>
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-yellow-50 text-yellow-700">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Auditorium</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} className="border-b border-gray-100 hover:bg-yellow-50 transition">
                <td className="px-4 py-3">{b.user.username}</td>
                <td className="px-4 py-3">{b.user.email}</td>
                <td className="px-4 py-3">{b.auditorium.name}</td>
                <td className="px-4 py-3">{new Date(b.startTime).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} →{" "}
                  {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      b.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : b.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : b.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) updateStatus(b.id, e.target.value);
                      e.target.value = "";
                    }}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full"
                  >
                    <option value="" disabled>
                      Actions
                    </option>
                    {b.status === "PENDING" && <option value="CANCELLED">Cancel</option>}
                    {b.status === "PENDING" && <option value="APPROVED">Approve</option>}
                    {b.status === "PENDING" && <option value="REJECTED">Reject</option>}
                    {b.status !== "PENDING" && <option value="DELETE">Delete</option>}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

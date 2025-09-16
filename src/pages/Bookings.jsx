import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaTrashAlt } from "react-icons/fa";
import { userApi } from "../api"; // <-- your configured axios instance
import toast from "react-hot-toast";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await userApi.get("/user/bookings/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API response:", data);

        setBookings(data);
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load bookings";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle cancel booking with confirmation
  const confirmCancel = async () => {
    if (!selectedBookingId) return;
    setIsSubmitting(true);

    try {
      await userApi.put(`/user/bookings/cancel/${selectedBookingId}`);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBookingId ? { ...b, status: "CANCELLED" } : b
        )
      );
      toast.success("Booking cancelled successfully");
      setShowConfirm(false);
      setSelectedBookingId(null);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to cancel booking";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-6 text-slate-700">Loading bookings...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-yellow-600 mb-6">Manage Bookings</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-yellow-50 text-yellow-700 uppercase text-sm">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">User</th>
              <th className="py-3 px-4 border-b">Auditorium</th>
              <th className="py-3 px-4 border-b">Purpose</th>
              <th className="py-3 px-4 border-b">Start</th>
              <th className="py-3 px-4 border-b">End</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr
                key={b.id}
                className="hover:bg-yellow-50 transition duration-200"
              >
                <td className="py-3 px-4 border-b">{idx + 1}</td>

                {/* User */}
                <td className="py-3 px-4 border-b">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                      <FaUser className="text-yellow-500" /> {b.user?.username}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <FaEnvelope /> {b.user?.email}
                    </span>
                  </div>
                </td>

                {/* Auditorium */}
                <td className="py-3 px-4 border-b">{b.auditorium?.name}</td>

                <td className="py-3 px-4 border-b">{b.purpose}</td>

                {/* Start & End */}
                <td className="py-3 px-4 border-b text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    {new Date(b.startTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </td>
                <td className="py-3 px-4 border-b text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    {new Date(b.endTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-4 border-b">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      b.status === "APPROVED"
                        ? "bg-green-500 text-white"
                        : b.status === "REJECTED"
                        ? "bg-red-500 text-white"
                        : b.status === "CANCELLED"
                        ? "bg-gray-400 text-white"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 border-b text-center">
                  {b.status === "PENDING" && (
                    <button
                      onClick={() => {
                        setSelectedBookingId(b.id);
                        setShowConfirm(true);
                      }}
                      className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow"
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {bookings.map((b, idx) => (
          <div
            key={b.id}
            className="bg-white rounded-xl shadow border border-gray-200 p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-slate-900">
                {idx + 1}. {b.auditorium?.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  b.status === "APPROVED"
                    ? "bg-green-500 text-white"
                    : b.status === "REJECTED"
                    ? "bg-red-500 text-white"
                    : b.status === "CANCELLED"
                    ? "bg-gray-400 text-white"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {b.status}
              </span>
            </div>
            <div className="text-sm text-slate-700 space-y-1">
              <p className="flex items-center gap-2">
                <FaUser className="text-yellow-500" /> {b.user?.username}
              </p>
              <p className="flex items-center gap-2 text-gray-500">
                <FaEnvelope /> {b.user?.email}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />{" "}
                {new Date(b.startTime).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                {" → "}
                {new Date(b.endTime).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <p>Purpose: {b.purpose}</p>
            </div>

            {/* Action */}
            {b.status === "PENDING" && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedBookingId(b.id);
                    setShowConfirm(true);
                  }}
                  className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow text-sm"
                >
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Are you sure you want to cancel this booking?
            </h3>
            <p className="text-slate-600 mt-2">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                disabled={isSubmitting}
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:bg-red-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cancelling..." : "Yes, cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

// src/pages/admin/AdminAuditorium.jsx
import { useState, useEffect } from "react";
import { adminApi } from "../api";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminAuditorium() {
  const [auditoriums, setAuditoriums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    hasProjector: false,
    hasSoundSystem: false,
    hasAirConditioning: false,
    hasStageLighting: false,
    hasWifi: false,
    hasWheelchairAccess: false,
    hasGreenRoom: false,
    hasParking: false,
    hasPodium: false,
    hasVideoRecording: false,
    active: true,
    imgUrl: "",
  });
  const [editId, setEditId] = useState(null);

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);


  

  useEffect(() => {
    fetchAuditoriums();
  }, []);

  const fetchAuditoriums = async () => {
    try {
      const { data } = await adminApi.get("/auditoriums/getAll");
      setAuditoriums(data);
    } catch (err) {
      toast.error("Failed to fetch auditoriums");
    } finally {
      setLoading(false);
    }
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await adminApi.put(`/auditorium/update/${editId}`, formData);
        toast.success("Auditorium updated successfully!");
      } else {
        await adminApi.post("/auditorium/add", formData);
        toast.success("Auditorium added successfully!");
      }
      setFormData({
        name: "",
        location: "",
        capacity: "",
        hasProjector: false,
        hasSoundSystem: false,
        hasAirConditioning: false,
        hasStageLighting: false,
        hasWifi: false,
        hasWheelchairAccess: false,
        hasGreenRoom: false,
        hasParking: false,
        hasPodium: false,
        hasVideoRecording: false,
        active: true,
        imgUrl: "",
      });
      setEditId(null);
      fetchAuditoriums();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (auditorium) => {
    setEditId(auditorium.id);
    setFormData({ ...auditorium });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/auditorium/delete/${id}`);
      toast.success("Auditorium deleted successfully!");
      fetchAuditoriums();
    } catch {
      toast.error("Failed to delete auditorium");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading auditoriums...</div>;

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await adminApi.delete(`/auditorium/delete/${deleteId}`);
      toast.success("Auditorium deleted successfully!");
      fetchAuditoriums();
      setShowDeleteConfirm(false);
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete auditorium");
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6">
        Auditorium <span className="text-slate-900">Management</span>
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-6 mb-10"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          {editId ? "Edit Auditorium" : "Add New Auditorium"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholder="Optional"
            />
          </div>
          {/* Active Toggle */}
          <div className="flex items-center mt-2 md:mt-0">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="text-gray-700 font-medium">
                {formData.active ? "Active" : "Inactive"}
              </span>
            </label>
          </div>
        </div>

        {/* Facilities */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {[
            { label: "Projector", name: "hasProjector" },
            { label: "Sound System", name: "hasSoundSystem" },
            { label: "Air Conditioning", name: "hasAirConditioning" },
            { label: "Stage Lighting", name: "hasStageLighting" },
            { label: "WiFi", name: "hasWifi" },
            { label: "Wheelchair Access", name: "hasWheelchairAccess" },
            { label: "Green Room", name: "hasGreenRoom" },
            { label: "Parking", name: "hasParking" },
            { label: "Podium", name: "hasPodium" },
            { label: "Video Recording", name: "hasVideoRecording" },
          ].map((facility) => (
            <label key={facility.name} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name={facility.name}
                checked={formData[facility.name]}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="text-gray-700">{facility.label}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-full shadow-md hover:from-yellow-500 hover:to-yellow-700 hover:scale-105 transition-all duration-300"
        >
          {editId ? "Update Auditorium" : "Add Auditorium"}
        </button>
      </form>

      {/* Auditorium Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {auditoriums.map((aud, idx) => (
              <tr key={aud.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{aud.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{aud.location}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{aud.capacity}</td>
                <td className="px-4 py-3 text-center text-sm">
                  <span className={`px-3 py-1 rounded-full text-white ${
                    aud.active ? "bg-yellow-500" : "bg-gray-400"
                  }`}>
                    {aud.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(aud)}
                    className="p-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 shadow-md transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(aud.id)}

                    className="p-2 rounded-lg text-white bg-red-500 hover:bg-red-600 shadow-md transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this auditorium?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

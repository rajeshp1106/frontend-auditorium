import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../api";
import {
  MagnifyingGlassIcon,
  WifiIcon,
  PresentationChartBarIcon,
  UsersIcon,
  BuildingOffice2Icon
} from "@heroicons/react/24/outline";

export default function UserDashboard() {
  const [auditoriums, setAuditoriums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchAuditoriums = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const { data } = await userApi.get("/user/auditoriums/getAll");
        setAuditoriums(data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch auditoriums"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAuditoriums();
  }, []);

  const filteredAuditoriums = auditoriums.filter(
    (aud) =>
      aud.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aud.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, <span className="text-yellow-500">{username}</span>
          </h1>
          <p className="mt-2 text-slate-500">
            Browse and book the perfect auditorium for your event.
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or location"
              className="w-full rounded-full border border-slate-200 bg-white px-12 py-3 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Auditorium Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuditoriums.length > 0 ? (
            filteredAuditoriums.map((aud) => (
              <AuditoriumCard key={aud.id} auditorium={aud} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-700">No Auditoriums Found</h3>
              <p className="text-slate-500 mt-1">Try a different search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



function AuditoriumCard({ auditorium }) {
  return (
    <Link
      to={`/dashboard/auditorium/${auditorium.id}`}
      className="group block bg-white rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* --- Conditional Image/Icon Section --- */}
      {auditorium.imgUrl ? (
        // If imgUrl exists, render the image
        <img
          src={auditorium.imgUrl}
          alt={auditorium.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        // If no imgUrl, render the fallback icon
        <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
          <BuildingOffice2Icon className="h-16 w-16 text-slate-400" />
        </div>
      )}

      {/* --- Content Section (No changes here) --- */}
      <div className="p-6">
        {/* Title and Location */}
        <div>
          <h3 className="text-xl font-semibold text-slate-900 group-hover:text-yellow-500 transition-colors">
            {auditorium.name}
          </h3>
          <p className="text-slate-500 mt-1 text-sm">{auditorium.location}</p>
        </div>

        {/* Details Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-slate-400" />
            <span>{auditorium.capacity}</span>
          </div>
          <div className="flex items-center gap-3">
            {auditorium.hasProjector && <PresentationChartBarIcon className="h-5 w-5 text-yellow-500" title="Projector" />}
            {auditorium.hasWifi && <WifiIcon className="h-5 w-5 text-yellow-500" title="WiFi" />}
          </div>
        </div>
      </div>
    </Link>
  );
}

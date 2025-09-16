import { useState, useEffect } from "react";
import {
  BuildingLibraryIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { adminApi } from "../api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await adminApi.get("/dashboard/stats");
        setStats(data);
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white min-h-screen px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-slate-900 mb-8">
        Admin <span className="text-yellow-600">Dashboard</span>
      </h1>

      {loading ? (
        <div className="text-center text-slate-500">Loading stats...</div>
      ) : stats ? (
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <BuildingLibraryIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Auditoriums</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalAuditoriums}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <CalendarDaysIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Bookings</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalBookings}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Active Auditoriums</p>
                <p className="text-2xl font-bold text-slate-900">{stats.activeAuditoriums}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Cog6ToothIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Pending Bookings</p>
                <p className="text-2xl font-bold text-slate-900">{stats.pendingBookings}</p>
              </div>
            </div>
          </div>

          {/* Management Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Auditoriums Management */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Auditoriums Overview
              </h2>
              <ul className="space-y-3">
                <li className="flex justify-between text-slate-700">
                  <span>Active Auditoriums</span>
                  <span className="font-medium">{stats.activeAuditoriums}</span>
                </li>
                <li className="flex justify-between text-slate-700">
                  <span>Inactive Auditoriums</span>
                  <span className="font-medium">{stats.inactiveAuditoriums}</span>
                </li>
                <li className="flex justify-between text-slate-700">
                  <span>Most Booked Auditorium</span>
                  <span className="font-medium">{stats.mostBookedAuditorium || "N/A"}</span>
                </li>
              </ul>
            </div>

            {/* Bookings Overview */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Bookings Overview
              </h2>
              <ul className="space-y-3">
                <li className="flex justify-between text-slate-700">
                  <span>Approved Bookings</span>
                  <span className="font-medium">{stats.approvedBookings}</span>
                </li>
                <li className="flex justify-between text-slate-700">
                  <span>Cancelled Bookings</span>
                  <span className="font-medium">{stats.cancelledBookings}</span>
                </li>
                <li className="flex justify-between text-slate-700">
                  <span>Pending Bookings</span>
                  <span className="font-medium">{stats.pendingBookings}</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-slate-500">No stats available</div>
      )}
    </div>
  );
}

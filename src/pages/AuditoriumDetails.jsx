import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { userApi } from "../api";
import toast from "react-hot-toast";
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AuditoriumDetails({ userId }) {
  const { id } = useParams();
  const [auditorium, setAuditorium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    const fetchAuditorium = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await userApi.get(`/user/auditorium/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuditorium(data);
      } catch (err) {
        setError("Failed to fetch auditorium details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuditorium();
  }, [id]);

  const handleStartChange = (date) => {
    setStartDate(date);
    if (date) {
      const newEnd = new Date(date.getTime() + 2 * 60 * 60 * 1000); // +2 hrs
      setEndDate(newEnd);
    } else {
      setEndDate(null);
    }
  };

  // Step 1: Validate and show confirmation popup
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !purpose) {
      toast.error("Please fill all the details!");
      return;
    }
    setShowConfirm(true);
  };

  // Step 2: Actually call the booking API only after user confirms
  const confirmBooking = async () => {
    setIsSubmitting(true);
    const bookingDTO = {
      auditoriumId: auditorium.id,
      start: startDate,
      end: endDate,
      purpose,
    };

    try {
      const token = localStorage.getItem("token");
      await userApi.post("/user/bookings/create", bookingDTO, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Booking confirmed for ${auditorium.name}!`);
      setShowConfirm(false);
      setShowModal(false);
      setStartDate(null);
      setEndDate(null);
      setPurpose("");
    } catch (error) {
      toast.error("Failed to create booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl font-semibold text-slate-700">Loading Details...</p>
      </div>
    );

  if (error || !auditorium)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl font-semibold text-red-600">
          {error || "Auditorium not found."}
        </p>
      </div>
    );

  const amenities = Object.entries(auditorium).filter(([key]) =>
    key.startsWith("has")
  );

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-700 transition mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5" /> Back to Auditoriums
        </Link>

        {/* --- Auditorium Details Card --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-slate-100 min-h-[320px] flex items-center justify-center">
              <img
                src={
                  auditorium.imgUrl ||
                  "https://via.placeholder.com/800x600?text=Auditorium"
                }
                alt={auditorium.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 md:p-12">
              <h1 className="text-4xl font-bold text-slate-900">{auditorium.name}</h1>
              <p className="mt-2 text-lg text-slate-500">{auditorium.location}</p>

              <p className="mt-6 text-base font-medium bg-yellow-100 text-yellow-800 inline-block px-4 py-2 rounded-lg">
                Capacity: {auditorium.capacity} people
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900">Amenities</h2>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {amenities.map(([key, value]) => {
                    const label = key
                      .substring(3)
                      .replace(/([A-Z])/g, " $1")
                      .trim();
                    return (
                      <li
                        key={key}
                        className="flex items-center text-slate-700 text-sm"
                      >
                        {value ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-slate-400 mr-2" />
                        )}
                        <span>{label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 flex flex-col md:flex-row items-center justify-between border-t border-slate-200">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-slate-900">Ready to book?</h3>
              <p className="text-slate-600 text-sm mt-1">
                Check availability and secure your date today.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition text-sm mt-4 md:mt-0"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* --- Booking Form Modal --- */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Book {auditorium.name}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Start Date & Time Picker */}
                <div>
                  <label className="block text-slate-700 mb-1">Start Date & Time</label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select start date & time"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>

                {/* End Date & Time (Read Only) */}
                <div>
                  <label className="block text-slate-700 mb-1">End Date & Time (+2 hrs)</label>
                  <input
                    type="text"
                    value={endDate ? endDate.toLocaleString() : ""}
                    readOnly
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-gray-100 text-slate-600"
                    placeholder="Auto 2 hrs after start"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-slate-700 mb-1">Purpose</label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Meeting, Workshop..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg text-slate-700 bg-slate-200 hover:bg-slate-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- Final Confirmation Popup --- */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                Confirm booking for {auditorium.name}?
              </h3>
              <p className="text-slate-600 mt-2">
                From <strong>{startDate?.toLocaleString()}</strong> to{" "}
                <strong>{endDate?.toLocaleString()}</strong>
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
                  onClick={confirmBooking}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition disabled:bg-yellow-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Yes, book now"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

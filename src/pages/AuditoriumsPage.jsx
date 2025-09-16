import { Link } from "react-router-dom";
import { auditoriums } from "../mockData";

export default function AuditoriumsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-slate-900 text-center">
          Explore Auditoriums
        </h1>
        <p className="text-slate-600 text-center mt-2 mb-10">
          Browse through our collection and find the perfect venue for your event.
        </p>

        {/* Grid of Auditoriums */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {auditoriums.map((auditorium) => (
            <div
              key={auditorium.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="bg-slate-100 h-48 flex items-center justify-center">
                <p className="text-slate-400">Image</p>
              </div>

              {/* Auditorium Info */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  {auditorium.name}
                </h2>
                <p className="text-slate-600 text-sm">{auditorium.location}</p>

                <p className="mt-3 text-sm font-medium bg-yellow-100 text-yellow-800 inline-block px-3 py-1 rounded-lg">
                  Capacity: {auditorium.capacity} people
                </p>

                <div className="mt-6 flex justify-between items-center">
                  <Link
                    to={`/auditoriums/${auditorium.id}`}
                    className="bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => alert(`Quick booking for ${auditorium.name}`)}
                    className="text-yellow-600 text-sm font-medium hover:underline"
                  >
                    Quick Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

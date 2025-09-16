import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden rounded-2xl border-4 border-amber-400 shadow-xl mx-4 md:mx-12 my-12">
        <div className="px-6 md:px-12 py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Effortless Auditorium Booking
            <br className="hidden md:block" />
            <span className="block mt-2 text-slate-700">for Any Event</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Plan and manage events seamlessly: check real-time availability,
            reserve auditoriums, and track bookings in one polished platform.
          </p>

          {/* --- Single CTA Button --- */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/login"
              className="bg-amber-400 text-slate-900 font-semibold px-10 py-3 rounded-xl shadow-md
                         hover:bg-amber-300 transition-transform transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
}

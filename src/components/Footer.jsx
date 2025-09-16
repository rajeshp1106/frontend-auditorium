import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6"; // for the mail icon

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* --- Brand --- */}
          <div>
            <Link to="/" className="text-3xl font-extrabold text-yellow-500">
              RP
            </Link>
            <p className="mt-2 text-slate-400 text-sm">
              Effortless Auditorium Booking for any Event.
            </p>
          </div>

          {/* --- Quick Links --- */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-yellow-500 transition">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Social --- */}
          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-6 text-2xl">
              <SocialIcon href="https://github.com/rajeshp1106" Icon={FaGithub} label="GitHub" />
              <SocialIcon href="mailto:rajesh1947anl@gmail.com" Icon={FaEnvelope} label="Email" />
              <SocialIcon href="https://instagram.com/rajeshp_11" Icon={FaInstagram} label="Instagram" />
              <SocialIcon href="https://www.linkedin.com/in/rajeshp1106" Icon={FaLinkedin} label="LinkedIn" />
            </div>
          </div>
        </div>

        {/* --- Bottom bar --- */}
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Auditorium Booking System. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

/* --- Reusable Social Icon --- */
function SocialIcon({ href, Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:text-yellow-500 transition-colors"
    >
      <Icon />
    </a>
  );
}

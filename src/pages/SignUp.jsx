import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Countdown state (120s = 2 mins)
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 1: Register User (send OTP)
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.post("/register", formData);
      toast.success(`OTP sent to ${formData.email}`);
      setShowOtp(true);
      setTimeLeft(120); // start countdown
    } catch (error) {
      toast.error(
        error.response?.data?.error || error.message || "SignUp failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await authApi.post("/verify-otp", {
        email: formData.email,
        otp,
      });

      toast.success(data.message || "Account verified successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.error || error.message || "OTP Verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  localStorage.setItem("username",formData.username);

  // Step 3: Resend OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const { data } = await authApi.post("/resend-otp", {
        email: formData.email,
      });
      toast.success(data.message || `OTP resent to ${formData.email}`);
      setTimeLeft(120); // restart countdown
    } catch (error) {
      toast.error(
        error.response?.data?.error || error.message || "Resend failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Join us to start booking auditoriums with ease.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          {/* Signup fields */}
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            disabled={showOtp}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 disabled:bg-slate-100"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={showOtp}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 disabled:bg-slate-100"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={showOtp}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 disabled:bg-slate-100"
          />

          {!showOtp && (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Sign Up"}
            </button>
          )}
        </form>

        {/* OTP Section */}
        {showOtp && (
          <div className="space-y-4">
            <p className="text-center text-slate-700 text-sm">
              Enter the OTP sent to{" "}
              <span className="font-medium">{formData.email}</span>
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 tracking-widest text-center"
            />

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify & Create Account"}
            </button>

            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-slate-600">
                {timeLeft > 0
                  ? `Resend available in ${formatTime(timeLeft)}`
                  : "You can resend OTP now"}
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={timeLeft > 0 || isLoading}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                  timeLeft > 0 || isLoading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                {isLoading ? "Sending OTP..." : "Resend OTP"}
              </button>
            </div>
          </div>
        )}

        <div className="text-sm text-center mt-4">
          <Link
            to="/login"
            className="font-medium text-yellow-600 hover:text-yellow-500"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

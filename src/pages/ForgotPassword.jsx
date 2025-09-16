import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { authApi } from "../api";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Send OTP again
  const handleResend = async () => {
    try {
      setLoading(true);
      await authApi.post("/forgot/password", { email });
      toast("OTP re-sent to your email", {
        icon: "✉️",
        style: { background: "#fff9e6", color: "#b58900" },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP", {
        style: { background: "#fff9e6", color: "#b58900" },
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Verify OTP
  const handleVerify = async () => {
    if (!otp)
      return toast("Enter OTP", { icon: "⚠️", style: { background: "#fff9e6", color: "#b58900" } });
    try {
      setLoading(true);
      await authApi.post("/verify/password-otp", { email, otp });
      setIsOtpVerified(true);
      toast.success("OTP verified. You can reset your password now.", {
        style: { background: "#fff9e6", color: "#b58900" },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP", {
        style: { background: "#fff9e6", color: "#b58900" },
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset Password
  const handleReset = async () => {
    if (!newPassword)
      return toast("Enter new password", { icon: "⚠️", style: { background: "#fff9e6", color: "#b58900" } });
    try {
      setLoading(true);
      await authApi.post("/reset/password", { email, newPassword });
      toast.success("Password reset successful! Redirecting...", {
        style: { background: "#fff9e6", color: "#b58900" },
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password", {
        style: { background: "#fff9e6", color: "#b58900" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-yellow-100">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Forgot Password</h1>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-200"
          />
        </div>

        {/* OTP */}
        <div>
          <label className="block text-gray-700 mb-1">OTP</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className="px-4 py-2 bg-yellow-200 text-gray-800 rounded-lg hover:bg-yellow-300 disabled:opacity-50"
            >
              Verify
            </button>
          </div>
          <button
            onClick={handleResend}
            disabled={loading}
            className="text-sm text-yellow-600 mt-1 hover:underline"
          >
            Resend OTP
          </button>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!isOtpVerified}
            placeholder="Enter new password"
            className={`w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 ${
              !isOtpVerified ? "bg-gray-50 cursor-not-allowed" : ""
            }`}
          />
        </div>

        <button
          onClick={handleReset}
          disabled={!isOtpVerified || loading}
          className="w-full py-2 bg-yellow-300 text-gray-800 font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api';
import toast from 'react-hot-toast';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await authApi.post('/login', formData);
      const { token, role, username } = data;

      if (!token) throw new Error("Invalid response from server");

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      toast.success('Logged in successfully');

      if (role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Forgot-Password flow: send OTP + carry email
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Enter your email first');
      return;
    }
    try {
      await authApi.post('/forgot/password', { email: formData.email });
      toast.success('OTP sent to your email');
      // 👉 carry email to forgot-password page
      navigate('/forgot-password', { state: { email: formData.email } });
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Column: Visual */}
      <div
        className="hidden md:block md:w-1/2 lg:w-2/3 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1740&q=80')" }}
      >
        <div className="w-full h-full bg-slate-900 bg-opacity-50"></div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-slate-500">Please enter your details to sign in.</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                name="email" type="email" placeholder="Email address"
                value={formData.email} onChange={handleChange} required
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                name="password" type="password" placeholder="Password"
                value={formData.password} onChange={handleChange} required
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-sm text-right">
              <button
                onClick={handleForgotPassword}
                className="font-medium text-yellow-600 hover:text-yellow-500"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-yellow-600 hover:text-yellow-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

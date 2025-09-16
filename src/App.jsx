// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AuditoriumDetails from './pages/AuditoriumDetails';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import UserBookings from './pages/UserBookings';
import AdminSettings from './pages/AdminAuditoriums';
import AuditoriumsPage from './pages/AuditoriumsPage';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AdminRoute from './routes/AdminRoute';
import AdminAuditorium from './pages/AdminAuditoriums';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: { background: '#facc15', color: '#000', fontWeight: 'bold' },
          success: { iconTheme: { primary: '#f59e0b', secondary: '#000' } },
          error: { iconTheme: { primary: '#b91c1c', secondary: '#fff' } }
        }}
      />

      <Routes>
        {/* Public pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auditoriums" element={<AuditoriumsPage />} />
          <Route path="/signup" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/footer" element={<Footer />} />
        </Route>

        {/* User dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard/auditorium/:id" element={
            <PrivateRoute>
              <AuditoriumDetails />
            </PrivateRoute>
          } />
          <Route path="/bookings" element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/bookings" element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <UserBookings />
            </AdminRoute>
          } />
          <Route path="/admin/auditoriums" element={
            <AdminRoute>
              <AdminAuditorium />
            </AdminRoute>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

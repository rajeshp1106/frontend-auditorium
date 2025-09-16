import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role === "ADMIN") return <Navigate to="/admin" />;
  } catch (e) {
    return <Navigate to="/login" />;
  }

  return children;
}

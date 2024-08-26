import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login.tsx";
import AdminDashboard from "./components/AdminDashboard.tsx";
import UserDashboard from "./components/UserDashboard.tsx";

/**
 * Private route for the admin to navigate to its dashboard
 * @param param0 the jsx element
 * @returns 
 */
function PrivateRouteAdmin({ children }: { children: JSX.Element }) {
  const adminId = localStorage.getItem("adminId");
  return adminId ? children : <Navigate to="/login" />;
}

/**
 * Private route for the user to navigate to its dashboard
 * @param param0 the jsx elemt
 * @returns 
 */
function PrivateRouteUser({ children }: { children: JSX.Element }) {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="bg-custom-dark min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRouteAdmin>
                <AdminDashboard />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRouteUser>
                <UserDashboard />
              </PrivateRouteUser>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

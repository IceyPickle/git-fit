/* src/App.jsx */

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Regimen from "./pages/Regimen";

import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="container">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/categories" element={<Categories />} />

            {/* Protected */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/regimen"
              element={
                <ProtectedRoute>
                  <Regimen />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

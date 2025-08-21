/* src/App.jsx */

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/jsx/Home";
import Login from "./pages/jsx/Login";
import Signup from "./pages/jsx/Signup";
import ForgotPassword from "./pages/jsx/ForgotPassword";
import Profile from "./pages/jsx/Profile";
import Categories from "./pages/jsx/Categories";
import Regimen from "./pages/jsx/Regimen";
import Category from "./pages/jsx/Category"

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
            <Route path="/categories/:slug" element={<Category />} />

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

// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Regimen from "./pages/Regimen";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/regimen" element={<Regimen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

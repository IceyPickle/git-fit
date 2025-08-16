// src/App.jsx
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Categories from "./pages/Categories"
import Regimen from "./pages/Regimen"

function App() {
  return (
    <div>
      {/* Simple Navbar */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/categories">Categories</Link> |{" "}
        <Link to="/regimen">Regimen</Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/regimen" element={<Regimen />} />
      </Routes>
    </div>
  )
}

export default App

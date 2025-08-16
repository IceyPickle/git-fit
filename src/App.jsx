// src/App.jsx
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Categories from "./pages/Categories"
import Regimen from "./pages/Regimen"

import "./App.css"

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/regimen" element={<Regimen />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

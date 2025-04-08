import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<div>App</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import { ProdcutProvider } from "./context/ProductContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ProdcutProvider>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<div>App</div>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/create-products" element={<CreateProduct />} />
          </Routes>
        </ProdcutProvider>
      </AuthProvider>
    </Router>
  );
}

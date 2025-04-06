import React from 'react';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<div>App</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

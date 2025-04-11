import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import CreateProduct from './pages/CreateProduct.jsx'
import EditProducts from './pages/EditProducts.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register'
import UpdateProfile from './pages/UpdateProfile.jsx'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/create-products" element={<CreateProduct />} />

            <Route path="/edit-products/:id" element={<EditProducts />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  )
}

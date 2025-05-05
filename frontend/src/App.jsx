import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Login from './pages/Login';
import UpdateUser from './components/UpdateUser';
import CreateProduct from './components/CreateProduct';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import CreateAdmin from './pages/CreateAdmin';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ProductProvider>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/update-user" element={<UpdateUser />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="/create-admin" element={<CreateAdmin />} />
            </Routes>
          </ProductProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

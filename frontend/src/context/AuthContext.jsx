import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.VITE_BACKEND_AUTH_URL
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleError = (error, fallbackMessage = 'Something went wrong') => {
    const message = error?.response?.data?.message || error.message || fallbackMessage
    toast.error(message)
  }

  const register = async (formData) => {
    try {
      await axios.post(`${AUTH_API}/register`, formData, { withCredentials: true })
      toast.success('User registered successfully')
      setIsLoggedIn(true)
    } catch (error) {
      handleError(error)
      setIsLoggedIn(false)
    }
  }

  const updateProfile = async (formData) => {
    try {
      await axios.put(`${AUTH_API}/update-user`, formData, { withCredentials: true })
      toast.success('Profile updated successfully')
      setIsLoggedIn(true)
    } catch (error) {
      handleError(error)
    }
  }

  const login = async (formData) => {
    try {
      await axios.post(`${AUTH_API}/login`, formData, { withCredentials: true })
      toast.success('Login successful')
      setIsLoggedIn(true)
    } catch (error) {
      handleError(error)
      setIsLoggedIn(false)
    }
  }

  const logout = async () => {
    try {
      await axios.get(`${AUTH_API}/logout`, { withCredentials: true })
      toast.success('Logged out')
      setIsLoggedIn(false)
      setUserData(null)
      navigate('/')
    } catch (error) {
      handleError(error)
    }
  }

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/user`, { withCredentials: true })
      setUserData(data)
    } catch (error) {
      handleError(error)
    }
  }

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, { withCredentials: true })
      setIsLoggedIn(data.authenticated)
      if (data.authenticated) {
        fetchUserData()
      }
    } catch {
      setIsLoggedIn(false) // No toast, quiet fail
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isLoggedIn,
        userData,
        updateProfile,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

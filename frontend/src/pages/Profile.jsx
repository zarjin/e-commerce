import React, { useContext } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import UserCreateProducts from '../pages/UserCreateProducts'

export default function Profile() {
  const { userData } = useContext(AuthContext)

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="text-2xl text-white animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transform hover:scale-105 transition-all duration-300">
          <div className="relative mb-6">
            <img
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-purple-400 shadow-lg"
              src={userData.profile}
              alt={userData.fullname + ' profile picture'}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20"></div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-wide">
            {userData.fullname}
          </h1>
          <p className="text-lg text-purple-600 mb-6 font-medium">{userData.email}</p>

          <Link to="/updateprofile">
            <button
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full
            hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-1
            transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
      <UserCreateProducts />
    </>
  )
}

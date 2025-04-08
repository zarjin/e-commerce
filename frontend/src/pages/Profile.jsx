import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

export default function Profile() {
  const { fetchUserData, userData } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <img
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          src={userData.profile}
          alt={userData.fullname + " profile picture"}
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          {userData.fullname}
        </h1>
        <p className="text-lg text-gray-500 mb-4">{userData.email}</p>
        <Link to="/updateprofile">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

import React from "react";

export default function Profile() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="max-w-md w-fullrounded-2xl shadow-xl p-8 space-y-8 transform hover:scale-[1.01] transition-transform duration-300 border border-green-200 bg-white rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-3">Profile</h1>
          <p className="text-green-600 text-lg">Welcome back, John Doe!</p>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-green-100 shadow-lg object-cover"
            />
            <button className="absolute bottom-2 right-2 bg-green-500 p-2.5 rounded-full text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-green-800 border-b border-green-100 pb-3">
            User Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors">
              <span className="text-green-600 font-medium min-w-[80px]">
                Name:
              </span>
              <span className="text-gray-700">John Doe</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors">
              <span className="text-green-600 font-medium min-w-[80px]">
                Email:
              </span>
              <span className="text-gray-700">john.doe@example.com</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors">
              <span className="text-green-600 font-medium min-w-[80px]">
                Phone:
              </span>
              <span className="text-gray-700">(123) 456-7890</span>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </main>
  );
}

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UpdateProfile = () => {
  const { UpdateProfile } = useContext(AuthContext);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("profile", profile);

    try {
      await UpdateProfile(formData);
      console.log("UpdateProfile successful!");

      setFullname("");
      setUsername("");
      setEmail("");

      setProfile(null);

      window.location.href = "/profile";
    } catch (error) {
      console.error("UpdateProfile error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-4xl font-extrabold text-white">Update Account</h2>
        <p className="mt-2 text-sm text-gray-100">
          Keep your profile fresh and fabulous 🌈
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-lg py-10 px-6 shadow-2xl rounded-2xl sm:px-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fullname
                </label>
                <input
                  id="fullname"
                  type="text"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="profile"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                id="profile"
                type="file"
                accept="image/*"
                onChange={(e) => setProfile(e.target.files[0])}
                className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              />
              {profile && (
                <p className="text-sm mt-1 text-gray-500">
                  Selected: <span className="font-medium">{profile.name}</span>
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                Update Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

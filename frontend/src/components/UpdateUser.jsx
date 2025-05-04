import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

export default function UpdateUser() {
  const { updateUser, deleteUser } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const fromData = new FormData();
  fromData.append('phone', phoneNumber);
  fromData.append('profilePicture', profilePicture);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(fromData);
      setPhoneNumber('');
      setProfilePicture(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      await logout();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center'>
        <img
          src='https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'
          alt='Profile'
          className='w-24 h-24 rounded-full shadow mb-4 object-cover border-4 border-blue-200'
        />
        <h1 className='text-3xl font-extrabold text-blue-700 mb-2'>Update Profile</h1>
        <p className='text-gray-500 mb-6 text-center'>
          Update your phone number or profile picture below.
        </p>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
          <label className='w-full'>
            <span className='block text-gray-700 mb-1 font-medium'>Phone Number</span>
            <input
              type='text'
              placeholder='Enter phone number'
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label className='w-full'>
            <span className='block text-gray-700 mb-1 font-medium'>Profile Picture</span>
            <input
              type='file'
              className='w-full p-2 border border-gray-300 rounded-lg bg-gray-50'
              accept='image/*'
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </label>
          <button
            type='submit'
            className='w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition'
          >
            Update User
          </button>
        </form>
        <button
          onClick={handleDelete}
          className='w-full py-2 mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition'
        >
          Delete User
        </button>
      </div>
    </div>
  );
}

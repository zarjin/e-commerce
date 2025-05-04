import React, { useContext } from 'react'
import { Link } from 'react-router'
import {
  ShoppingCart,
  CircleUserRound,
  ShoppingBag,
  ImageUpIcon,
} from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <header className='w-full h-20 flex items-center justify-between px-8 shadow-sm '>
      {/* Logo */}
      <Link
        to='/'
        className='text-dark-green text-3xl font-bold tracking-wider'
      >
        SHOP
      </Link>

      {/* Navigation Links */}
      <nav className='flex items-center space-x-8'>
        <Link to='/shop' className=' hover:text-dark-green transition-colors'>
          <ShoppingBag size={28} />
        </Link>

        {/* Authenticated User */}
        {isLoggedIn ? (
          <>
            <Link
              to='/cart'
              className='text-gray-700 hover:text-dark-green transition-colors'
            >
              <ShoppingCart size={28} />
            </Link>

            <Link
              to='/create-product'
              className='text-gray-700 hover:text-dark-green transition-colors'
            >
              <ImageUpIcon size={28} />
            </Link>

            <Link
              to='/profile'
              className='text-gray-700 hover:text-dark-green transition-colors'
            >
              <CircleUserRound size={28} />
            </Link>
          </>
        ) : (
          // Not Authenticated
          <div className='flex items-center space-x-4'>
            <Link to='/register'>
              <button className='bg-dark-green text-white px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors'>
                Register
              </button>
            </Link>
            <Link to='/login'>
              <button className='bg-dark-green text-white px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors'>
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

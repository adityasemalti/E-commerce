import React from 'react'
import logo from '../assets/logo.webp'
const Navbar = ({ setToken }) => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="Admin Logo"
          className="w-20  object-contain"
        />

        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Admin Panel
        </h1>

        {/* Logout Button */}
        <button
          onClick={() => setToken('')}
          className="px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar

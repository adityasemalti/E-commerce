import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const baseClasses =
    'block text-center py-3 rounded-full font-semibold transition-colors duration-200'

  return (
    <div className="w-48 h-[90vh] bg-white shadow-lg rounded-lg sticky top-5 my-5 border border-gray-300">
      <nav className="flex flex-col items-center justify-center h-full space-y-6 p-6">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white'
            } w-full`
          }
        >
          Add Items
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white'
            } w-full`
          }
        >
          List All Items
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white'
            } w-full`
          }
        >
          Orders
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar

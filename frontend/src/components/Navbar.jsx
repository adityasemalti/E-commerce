import React, { useContext, useState } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import logo from '../assets/logo.webp';

const Navbar = () => {
  const { getCartCount, setToken, token, setCartItems, navigate } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const logout = () => {
    if (token) {
      navigate('/login');
      localStorage.removeItem('token');
      setToken('');
      setCartItems({});
    } else {
      navigate('/');
    }
  };

  return (
    <div className='w-full h-20 flex items-center justify-between px-5 shadow-md bg-white relative'>
      {/* Logo & Menu Icon */}
      <div className='flex items-center justify-between w-full md:w-auto'>
        <img className='w-28 rounded-md' src={logo} alt="logo" />
        <button
          className='md:hidden text-2xl ml-auto'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className='hidden md:flex w-[60%] gap-10'>
        <div className='w-[80%] relative'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className='w-full h-10 border-black border-2 outline-none rounded-full px-5'
          />
          <div
            className='absolute top-3 right-5 cursor-pointer'
            onClick={handleSearch}
          >
            <FaSearch />
          </div>
        </div>

        <div className='flex gap-10 items-center'>
          <Link to='/about' className='font-semibold active:text-gray-600 active:scale-105 duration-200'>
            About
          </Link>

          <Link to='/cart' className='relative'>
            <div className='w-5 h-5 rounded-full text-white bg-black text-center text-sm flex items-center justify-center absolute left-5 bottom-4'>
              {getCartCount()}
            </div>
            <FaShoppingCart size={25} />
          </Link>

          <Link to='/login' className='active:scale-105 duration-150'>
            <CgProfile size={30} />
          </Link>

          <button onClick={logout} className='border px-2 py-1 bg-red-600 text-white rounded'>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-20 left-0 w-full bg-white z-10 flex flex-col gap-5 py-5 px-4 md:hidden shadow-md'>
          <div className='relative'>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className='w-full h-10 border-black border-2 outline-none rounded-full px-5'
            />
            <div className='absolute top-3 right-5 cursor-pointer' onClick={handleSearch}>
              <FaSearch />
            </div>
          </div>

          <Link to='/about' onClick={() => setMenuOpen(false)} className='font-semibold'>
            About
          </Link>

          <Link to='/cart' onClick={() => setMenuOpen(false)} className='relative'>
            <div className='w-5 h-5 rounded-full text-white bg-black text-center text-sm flex items-center justify-center absolute left-5 bottom-4'>
              {getCartCount()}
            </div>
            <FaShoppingCart size={25} />
          </Link>

          <Link to='/login' onClick={() => setMenuOpen(false)}>
            <CgProfile size={30} />
          </Link>

          <button onClick={() => { logout(); setMenuOpen(false); }} className='border px-2 py-1 bg-red-600 text-white rounded'>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

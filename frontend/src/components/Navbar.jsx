import React, { useContext, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { CgProfile, CgShutterstock } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import AppContext from '../Context/AppContext';
import logo  from '../assets/logo.webp'

const Navbar = () => {
  const { getCartCount,setToken,token,cartItems,setCartItems,navigate } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    // Navigate to a search results page with the search term as a query param
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const logout =()=>{
    if(token){
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    }
    else{
      navigate('/')
    }
  }

  return (
    <div className='w-full h-20 flex items-center justify-between px-5'>
      <div>
        <img
          className='w-28 rounded-md'
          src={logo}
          alt="logo"
        />
      </div>

      <div className='w-[60%] flex gap-10'>
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
          <Link
            to={'/about'}
            className='font-semibold active:text-gray-600 active:scale-105 duration-200 cursor-pointer'
          >
            About
          </Link>

          <Link to={'/cart'} className='relative'>
            <div className='w-5 h-5 rounded-full text-white bg-black text-center text-sm flex items-center justify-center absolute left-5 bottom-4'>
              {getCartCount()}
            </div>
            <FaShoppingCart size={25} />
          </Link>

          <Link
            to={'/login'}
            className=' active:scale-105 duration-150 cursor-pointer'
          >
            <CgProfile size={30} />
          </Link>

          <button onClick={logout} className='border px-2 py-1 bg-red-600 text-white rounded'>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

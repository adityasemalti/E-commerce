import React, { useContext, useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import axios from 'axios';
import { backendUrl } from '../App';
import AppContext from '../Context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [status, setStatus] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { token, setToken, navigate } = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }

    try {
      setLoading(true);
      const response = await axios.post(backendUrl + '/api/user/login', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setEmail('');
        setPassword('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !regEmail || !regPassword) {
      return toast.error('Please fill in all fields');
    }

    try {
      setLoading(true);
      const response = await axios.post(backendUrl + '/api/user/register', {
        name,
        email: regEmail,
        password: regPassword,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setName('');
        setRegEmail('');
        setRegPassword('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='h-[90%] w-[30%] shadow-lg shadow-black rounded-lg p-5'>
        {status === 'login' ? (
          <>
            <h1 className='text-center text-2xl font-bold mb-6'>Login</h1>
            <div className='flex flex-col'>
              <label className='font-semibold ml-5 text-lg mt-10 mb-3'>E-mail</label>
              <div className="relative w-[90%] ml-5 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pr-10 outline-none w-full border-2 border-black h-12 rounded-full px-4'
                />
                <MdEmail className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <label className='font-semibold ml-5 text-lg mb-3'>Password</label>
              <div className="relative w-[90%] ml-5 mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pr-10 outline-none w-full border-2 border-black h-12 rounded-full px-4'
                />
                <IoIosLock className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className='active:scale-95 duration-150 self-center mb-4 mt-8'
              >
                <span className='border-2 border-black px-6 py-2 rounded-3xl text-lg'>
                  {loading ? 'Logging in...' : 'Login'}
                </span>
              </button>

              <p className='text-center font-semibold mt-5'>Don't have an account?</p>
              <button onClick={() => setStatus('register')} className='mt-5 active:scale-95 duration-150 self-center'>
                <span className='border-2 border-black px-6 py-2 rounded-3xl text-lg'>Sign up</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className='text-center text-2xl font-bold mb-6'>Register</h1>
            <div className='flex flex-col'>
              <label className='font-semibold ml-5 text-lg mt-10 mb-3'>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='outline-none w-[90%] border-2 border-black h-12 rounded-full px-4 mb-4 ml-5'
              />

              <label className='font-semibold ml-5 text-lg mb-3'>E-mail</label>
              <div className="relative w-[90%] ml-5 mb-4">
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className='pr-10 outline-none w-full border-2 border-black h-12 rounded-full px-4'
                />
                <MdEmail className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <label className='font-semibold ml-5 text-lg mb-3'>Password</label>
              <div className="relative w-[90%] ml-5 mb-6">
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className='pr-10 outline-none w-full border-2 border-black h-12 rounded-full px-4'
                />
                <IoIosLock className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className='active:scale-95 duration-150 self-center mb-4 mt-5'
              >
                <span className='border-2 border-black px-6 py-2 rounded-3xl text-lg'>
                  {loading ? 'Registering...' : 'Register'}
                </span>
              </button>

              <p className='text-center font-semibold my-3'>Already have an account?</p>
              <button onClick={() => setStatus('login')} className='mt-2 active:scale-95 duration-150 self-center'>
                <span className='border-2 border-black px-6 py-2 rounded-3xl text-lg'>Login</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

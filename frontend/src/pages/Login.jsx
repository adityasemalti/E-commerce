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
    if (!email || !password) return toast.error('Please fill in all fields');

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
    if (!name || !regEmail || !regPassword) return toast.error('Please fill in all fields');

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
    if (token) navigate('/');
  }, [token]);

  return (
    <div className='min-h-screen w-full flex items-center justify-center px-4 bg-gray-100'>
      <div className='w-full max-w-md shadow-lg rounded-lg p-6 bg-white'>
        {status === 'login' ? (
          <>
            <h1 className='text-center text-2xl font-bold mb-6'>Login</h1>
            <form className='flex flex-col' onSubmit={handleLogin}>
              <label className='font-semibold text-lg mb-2'>E-mail</label>
              <div className="relative mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full pr-10 border-2 border-black h-12 rounded-full px-4 outline-none'
                />
                <MdEmail className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <label className='font-semibold text-lg mb-2'>Password</label>
              <div className="relative mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pr-10 border-2 border-black h-12 rounded-full px-4 outline-none'
                />
                <IoIosLock className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className='bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition'
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className='text-center font-semibold mt-6'>Don't have an account?</p>
            <button
              onClick={() => setStatus('register')}
              className='mt-3 border-2 border-black py-2 px-4 rounded-full font-semibold hover:bg-black hover:text-white transition self-center'
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            <h1 className='text-center text-2xl font-bold mb-6'>Register</h1>
            <form className='flex flex-col' onSubmit={handleRegister}>
              <label className='font-semibold text-lg mb-2'>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border-2 border-black h-12 rounded-full px-4 mb-4 outline-none'
              />

              <label className='font-semibold text-lg mb-2'>E-mail</label>
              <div className="relative mb-4">
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className='w-full pr-10 border-2 border-black h-12 rounded-full px-4 outline-none'
                />
                <MdEmail className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <label className='font-semibold text-lg mb-2'>Password</label>
              <div className="relative mb-6">
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className='w-full pr-10 border-2 border-black h-12 rounded-full px-4 outline-none'
                />
                <IoIosLock className="absolute top-3 right-4 text-gray-500 text-xl" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className='bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition'
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className='text-center font-semibold mt-6'>Already have an account?</p>
            <button
              onClick={() => setStatus('login')}
              className='mt-3 border-2 border-black py-2 px-4 rounded-full font-semibold hover:bg-black hover:text-white transition self-center'
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

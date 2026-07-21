

import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../main'; // adjust path if needed

import OIP from '../assets/OIP.jpeg'
import { FiLogOut, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast';
import { FiMenu } from 'react-icons/fi'
import { useState } from 'react';

export default function Navbar({ user, setUser }) {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        ServerUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      toast.success("Logout successful!");
      navigate('/login');

    } catch (error) {
      toast.error("Error during logout.");
      console.error("Error during logout:", error);
    }
  }; // ← THIS WAS MISSING

  return (
    <div className='sticky top-0 z-50 bg-white/80 shadow-md border-b border-orange-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between'>

        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-2.5'
        >
          <img
            src={OIP}
            alt="logo"
            className='w-auto h-9 object-contain'
          />

          <h1 className='text-xl font-bold text-gray-800 leading-none'>
            Shifra{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500'>
              AI
            </span>
          </h1>
        </div>

        <div>
          {user && (
            <div className='hidden md:flex items-center gap-4'>

              <button
                onClick={() => navigate('/builder')}
                className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium shadow-md hover:scale-[1.02] transition-all cursor-pointer'
              >
                Builder
              </button>

              <button
                onClick={() => navigate('/billing')}
                className='px-4 py-2 rounded-xl border border-orange-100 bg-white text-gray-700 text-sm font-medium shadow-md hover:border-purple-400 transition-all cursor-pointer'
              >
                Billing
              </button>

              <div className='flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-r-violet-700 shadow-sm'>

                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
                  <span className='text-white text-xs font-bold'>
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className='max-w-[140px] overflow-hidden'>
                  <p className='text-sm font-semibold text-gray-500 truncate'>
                    {user.name}
                  </p>

                  <p className='text-xs text-gray-400 truncate'>
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className='ml-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer'
                >
                  <FiLogOut className='text-lg' size={18} />
                </button>

              </div>
            </div>
          )}
          {
            user && (
              <button onClick={() => setMenuOpen(!menuOpen)} className='md:hidden text-gray-600
             hover:text-purple-500 transition-colors'>

                {menuOpen ? <FiX size={20} /> : <FiMenu />}

              </button>
            )
          }
        </div>

        {
          menuOpen && (
            <div className='md:hidden px-4 pb-4'>
              <div className='bg-white rounded-2xl border border-orange-100 shadow-lg p-4'>

                <div className='flex items-center gap-3 pb-4 border-b border-orange-100'>

                  <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-xs font-bold'>
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className='flex-1 overflow-hidden'>
                    <p className='text-sm font-semibold text-gray-500 truncate'>
                      {user.name}
                    </p>

                    <p className='text-xs text-gray-400 truncate'>
                      {user.email}
                    </p>
                  </div>
             </div>
             <div className='flex flex-col gap-3 mt-4'>
              <button onClick={() => {navigate('/builder');setMenuOpen(false)}} className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium shadow-md hover:scale-[1.02] transition-all cursor-pointer'>
                Builder
              </button>
              <button onClick={() =>{ navigate('/billing');setMenuOpen(false)} } className='px-4 py-2 rounded-xl border border-orange-100 bg-white text-gray-700 text-sm font-medium shadow-md hover:border-purple-400 transition-all cursor-pointer'>
                Billing
              </button>
             </div>
             <button onClick={()=>{setMenuOpen(false);handleLogout()}} className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
             bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm font-medium'>
                <FiLogOut size={18} />
                Logout
             </button>
              </div>
            </div>
          )

        }
      </div>
    </div>
  );
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { FaSun, FaMoon } from 'react-icons/fa';

function Sidebar() {
  
  const { toggleTheme, darkMode } = useAuth();
  
  return (
      <aside className='w-60 bg-gradient-to-br from-blue-200 to-blue-300 shadow h-screen p-4 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-900 dark:text-white border border-right-white'
      style={{position:'fixed',top:0, left:0}}>
         <button
      onClick={toggleTheme}
      className="text-2xl p-2 focus:outline-none transition-all duration-300"
    >
      {darkMode ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-800" />
      )}
    </button>
        <h2 className='text-xl font-bold mb-6' style={{marginLeft:'4rem',marginTop:'7rem'}}>پنل ادمین</h2>
        <nav className='flex flex-col gap-4 p-5'
        style={{alignItems:'center'}}>
          <NavLink to='/dashboard' className='hover:text-blue-500'>داشبورد</NavLink>
          <NavLink to='/products' className='hover:text-blue-500'>محصولات</NavLink>
          <NavLink to='/orders' className='hover:text-blue-500'>سفارشات</NavLink>
          <NavLink to='/users' className='hover:text-blue-500'>کاربران</NavLink>
          <NavLink to='/favorite' className='hover:text-blue-500'>علاقه مندیها</NavLink>
        </nav>
       
      </aside>
  )
}

export default Sidebar
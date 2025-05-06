import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Sidebar() {
  
  const { toggleTheme, darkMode } = useAuth();
  
  return (
      <aside className='w-60 bg-white shadow h-screen p-4 dark:bg-gray-900 dark:text-white border border-right-white'
      style={{position:'fixed',top:0, left:0}}>
        <h2 className='text-xl font-bold mb-6' style={{marginLeft:'4rem',marginTop:'7rem'}}>پنل ادمین</h2>
        <nav className='flex flex-col gap-4 p-5'
        style={{alignItems:'center'}}>
          <NavLink to='/dashboard' className='hover:text-blue-500'>داشبورد</NavLink>
          <NavLink to='/products' className='hover:text-blue-500'>محصولات</NavLink>
          <NavLink to='/orders' className='hover:text-blue-500'>سفارشات</NavLink>
          <NavLink to='/users' className='hover:text-blue-500'>کاربران</NavLink>
        </nav>
        <button onClick={toggleTheme} className='bg-gray-500 rounded dark:bg-white dark:text-gray-700'
        style={{marginLeft:'5rem', width:'3rem'}}>{darkMode ? "light" : "dark"}</button>
      </aside>
  )
}

export default Sidebar
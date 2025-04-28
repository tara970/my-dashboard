import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
      <aside className='w-64 bg-white shadow h-screen p-4'>
        <h2 className='text-xl font-bold mb-6'>پنل ادمین</h2>
        <nav className='flex flex-col gap-4'>
          <NavLink to='/dashboard' className='hover:text-blue-500'>داشبورد</NavLink>
          <NavLink to='/products' className='hover:text-blue-500'>محصولات</NavLink>
          <NavLink to='/orders' className='hover:text-blue-500'>سفارشات</NavLink>
          <NavLink to='/users' className='hover:text-blue-500'>کاربران</NavLink>
        </nav>
      </aside>
  )
}

export default Sidebar
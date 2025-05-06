import React from 'react'
import { useAuth } from '../context/authContext'

function Navbar() {
  
     const { logout } = useAuth();
  
  
    return (
    <header className='bg-withe shadow p-4 flex justify-between items-center dark:bg-gray-900 dark:border border-button-white'>
        <h1 className=' text-lg font-semibold dark:text-red-500'>
            خوش اومدی!
        </h1>
        <button onClick={logout}
        className='bg-red-500 text-white px-4 py-1 ronded hover:bg-red-800'>
            خروج
        </button>
    </header>
  )
}

export default Navbar
import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

function DashboardLayout({children}) {
  return (
    <div className='flex min-h-screen '>
        <Sidebar/>
        <div className='flex-1 ml-60 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen'>
            <Navbar/>
            <main className='p-4'>{children}</main>
        </div>
    </div>
  )
}

export default DashboardLayout
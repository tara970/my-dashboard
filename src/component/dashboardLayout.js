import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

function DashboardLayout({children}) {
  return (
    <div className='flex min-h-screen'>
        <Sidebar/>
        <div className='flex1-1 bg-gray-100'>
            <Navbar/>
            <main className='p-4'>{children}</main>
        </div>
    </div>
  )
}

export default DashboardLayout
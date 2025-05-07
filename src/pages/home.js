import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8 dark:bg-gradient-to-br from-gray-900 to-gray-800">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 dark:text-gray-300">
            به داشبورد ما خوش امدید🌟
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
           :برای ادامه یکس از مسیرهای زیر رو انتخاب کنید
        </p>
        <div>
            <Link to='/login' className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-md dark: hover:bg-blue-800 shadow-lg">ورود</Link>
            <Link to='/dashboard' className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-md dark: hover:bg-green-800 shadow-lg">داشبورد</Link>
        </div>
    </div>
  )
}

export default Home
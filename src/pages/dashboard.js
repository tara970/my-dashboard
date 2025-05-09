import React from 'react'
import DashboardLayout from '../component/dashboardLayout'
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function Dashboard() {
   
   const [products, setProducts] = useState([]);
   const [orders, setOrders] = useState([]);
   const [users, setUsers] = useState([]);
   const [favorites, setFavorites] = useState([]);
   const [dark, setDark] = useState(false);
 
   useEffect(() => {
     setProducts(JSON.parse(localStorage.getItem('products')) || []);
     setOrders(JSON.parse(localStorage.getItem('orders')) || []);
     setUsers(JSON.parse(localStorage.getItem('users')) || []);
     setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
   }, []);

   const pendingOrders = orders.filter(order => !order.delivered);
 
   const data = [
     {
       name: 'محصولات',
       تعداد: products.length,
     },
     {
       name: 'سفارشات',
       تعداد: pendingOrders.length,
     },
     {
       name: 'کاربران',
       تعداد: users.length,
     },
     {
       name: 'علافه مندیها',
       تعداد: favorites.length,
     }
   ];

   useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setDark(isDark);
    });
  
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  
    
    setDark(document.documentElement.classList.contains("dark"));
  
    return () => observer.disconnect();
  }, []);
  
 
   return (
     <DashboardLayout>
       <h2 className='size-xl text-gray-600 dark:text-red-500 mb-5 dark:bg-gray-900 p-4'>داشبورد</h2>
 
       <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px', padding: '7px' }} 
         className='dark:bg-gray-900 dark:text-white'
       >
         <div>تعداد محصولات: {products.length}</div>
         <div>تعداد سفارشات: {orders.length}</div>
         <div>تعداد کاربران: {users.length}</div>
         <div>تعداد علاقه مندیها: {favorites.length}</div>
       </div>
 
       <BarChart width={800} height={400} data={data} className='dark:bg-gray-900 p-3' style={{marginLeft:'6rem'}}>
         <CartesianGrid strokeDasharray="5 5"/>
         <XAxis dataKey="name"/>
         <YAxis />
         <Tooltip />
         <Legend />
         <Bar dataKey="تعداد" fill={dark ? 'red' : 'blue'} />
       </BarChart>
     </DashboardLayout>
  )
}

export default Dashboard
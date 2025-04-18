import React from 'react'
import DashboardLayout from '../component/dashboardLayout'
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function Dashboard() {
   
   const [products, setProducts] = useState([]);
   const [orders, setOrders] = useState([]);
   const [users, setUsers] = useState([]);
 
   useEffect(() => {
     setProducts(JSON.parse(localStorage.getItem('products')) || []);
     setOrders(JSON.parse(localStorage.getItem('orders')) || []);
     setUsers(JSON.parse(localStorage.getItem('users')) || []);
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
   ];
 
   return (
     <DashboardLayout>
       <h2>داشبورد</h2>
 
       <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
         <div>تعداد محصولات: {products.length}</div>
         <div>تعداد سفارشات: {orders.length}</div>
         <div>تعداد کاربران: {users.length}</div>
       </div>
 
       <BarChart width={500} height={300} data={data}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Legend />
         <Bar dataKey="تعداد" fill="#8884d8" />
       </BarChart>
     </DashboardLayout>
  )
}

export default Dashboard
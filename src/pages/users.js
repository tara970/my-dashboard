import React, { useEffect } from 'react'
import { useState } from 'react'
import DashboardLayout from '../component/dashboardLayout';

function Users() {
  
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');


  useEffect(()=>{
     const storedUsers = JSON.parse(localStorage.getItem("users"))||[];
     setUsers(storedUsers);
     
  },[]);

  const handleAddUsers = () =>{
      if(!email,!password){
        alert("لطفا ایمیل و پسورد خود را وارد کنین");
        return;
      }
      

      const newUser = {
        id:Date.now(),
        email:email,
        password:password,
        role:role
      };

       const updateUsers = [...users,newUser];
       setUsers(updateUsers);
       localStorage.setItem("users",JSON.stringify(updateUsers));

       setRole('user');
       setEmail('');
       setPassword('');
       
  }

  const handleDelete = (id) =>{
      const updatedUsers = users.filter((user)=> user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users",JSON.stringify(updatedUsers));
  }
  
    return (
        <DashboardLayout>
        <h2 className='text-2xl font-bold mb-6 dark:text-red-500'>مدیریت کاربران</h2>
  
        <div style={{ marginBottom: '20px' }} className='mb-8 p-2 dark:bg-gray-900 dark:text-white'>
          <h4 className='text-xl font-semibold mb-4'>افزودن کاربر جدید</h4>
          <div className='flex flex-wrap gap-4 items-center'>
          <input
          className='border rounded p-2 w-64 dark:bg-gray-800' 
            type="email" 
            placeholder="ایمیل" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input 
          className='border rounded p-2 w-64 dark:bg-gray-800'
            type="password" 
            placeholder="رمز عبور" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className='border bg-blue-200 rounded p-2 dark:bg-gray-800'>
            <option value="user">کاربر عادی</option>
            <option value="admin">مدیر</option>
          </select>
          <button onClick={handleAddUsers} style={{ marginLeft: '10px' }}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>افزودن</button>
        
            </div>
            </div>
  
        <div className='dark:bg-gray-900 dark:text-gray-300'>
          <h4 className='text-xl font-semibold mb-4dark:text-red-500 ml-4 p-2 mb-7'>لیست کاربران</h4>
          {users.length === 0 ? (
            <p className='text-gray-500'>کاربری وجود ندارد.</p>
          ) : (
            <div className='bg-blue-300 rounded-lg overflow-x-auto dark:rounded dark:bg-gray-900'>
              <table className='min-w-full border border-gray-300'>
              <thead className='bg-gray-100 dark:bg-gray-800'>
                <tr>
                  <th className='px-6 py-3 border-b'>ایمیل</th>
                  <th className='px-6 py-3 border-b'>نقش</th>
                  <th className='px-6 py-3 border-b'>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className='hover:bg-blue-400 dark:hover:bg-gray-600'>
                    <td className='px-6 py-4 border-b'>{user.email}</td>
                    <td className='px-6 py-4 border-b'>{user.role === 'admin' ? 'مدیر' : 'کاربر عادی'}</td>
                    <td className='px-6 py-4 border-b'>
                      <button onClick={() => handleDelete(user.id)}
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </DashboardLayout>
  )
}

export default Users
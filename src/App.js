import React from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Products from './pages/products'
import Orders from './pages/orders'
import Users from './pages/users'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path='/products' element={<ProtectedRoute><Products/></ProtectedRoute>}/>
        <Route path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path='/users' element={<ProtectedRoute><Users/></ProtectedRoute>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </Router>
  )
}

export default App
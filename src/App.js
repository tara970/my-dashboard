import React from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Products from './pages/products'
import Orders from './pages/orders'
import Users from './pages/users'
import Home from './pages/home'
import Favorite from './pages/favorite'
import ProductDetails from './pages/productDetails'
import Item from './pages/item'


function App() {
  return (
      <Router>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
        <Route  element={<ProtectedRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/product/:id/item' element={<Item/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        </Route>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </Router>
  )
}

export default App
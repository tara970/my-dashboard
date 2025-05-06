import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/authContext'


const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useAuth();
    
    
    if(loading){
        return <p>در حال بارگزاری...</p>
    }
      
    return isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
    
    
    }

export default ProtectedRoute
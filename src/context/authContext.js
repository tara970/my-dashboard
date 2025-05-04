import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
         const token = localStorage.getItem('token');
         setIsAuthenticated(!!token);
         setLoading(false);
    },[])

const login = (email, password) =>{
    const userStored = JSON.parse(localStorage.getItem('users')|| '[]');
    const user = userStored.find(u => u.email === email && u.password === password);
    if(user)
    {
      localStorage.setItem("token", "fake_token"); 
      localStorage.setItem("currentUser", JSON.stringify(user));
       setIsAuthenticated(true);
       return true;
    }
       
    return false;
};

const logout = () =>{
    localStorage.removeItem("token");
    setIsAuthenticated(false);
};

return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
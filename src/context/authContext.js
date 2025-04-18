import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"))


const login = (email, password) =>{
   if(email === "admin@shop.com" && password === "123456"){
      localStorage.setItem("token","fake_token");
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
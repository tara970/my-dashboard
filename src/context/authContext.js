import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(()=>{
       return localStorage.getItem("darkMode") === "true";
    });

    //useEffect(()=>{
         // const token = localStorage.getItem("token");
          //const saveTheme = localStorage.getItem("darkMode");
          //setIsAuthenticated(!!token);
         // setDarkMode(saveTheme === "true");
         // setLoading(false);
   // },[])


    useEffect(()=>{
      if(darkMode){
         document.documentElement.classList.add("dark")
      }else{
         document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("darkMode",darkMode);
      
    },[darkMode])

    const toggleTheme = () =>{
        setDarkMode(prev => !prev);
    }


    useEffect(()=>{
         const token = localStorage.getItem('token');
         setIsAuthenticated(!!token);
         setLoading(false);
    },[])

    const login = (email, password) => {
          if(email && password){
            localStorage.setItem("token","fake_token");
            localStorage.setItem("currentUser", JSON.stringify({email}));
            setIsAuthenticated(true);
            return true;
          }
          return false;
    };
  

const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
};

return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, toggleTheme, darkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(()=>{
       return localStorage.getItem("darkMode") === "true";
    });
    const [favorites, setFavorites] = useState([]); 
    
    useEffect(()=>{
       const storedFavorite = JSON.parse(localStorage.getItem('favorites')|| '[]');
       setFavorites(storedFavorite);
    },[])

    const toggleFavorite = (product) => {
         const exites = favorites.some(p => p.id === product.id);
         const update = exites ? favorites.filter(p => p.id !== product.id):
         [...favorites, product];

         setFavorites(update);
         localStorage.setItem("favorites", JSON.stringify(update));
    }


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

            const storedUser = JSON.parse(localStorage.getItem("users")||[]);
            const userExite = storedUser.some(u => u.email === email);
            if(!userExite){
               const newUser = {email, id: Date.now() };
               localStorage.setItem("users", JSON.stringify([...storedUser,newUser]));
            }

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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, toggleTheme, darkMode, toggleFavorite, favorites }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
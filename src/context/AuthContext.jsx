import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const login = () => {
    const token = "f2f23342z_x";
    localStorage.setItem("token", token);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

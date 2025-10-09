import React, { createContext, useState, useContext, useEffect } from 'react';

import userService from '../service/user';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await userService.getme();
      
      console.log("Auth check response:", res);
      if (res.success) {
        const data =res.data;
        setUser(data.data[0]);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // const login = async (userData) => {
  //   setLoading(true);
  //   try {
  //     const res = await userService.login(userData);

  //     const data =  res.data;
  //   console.log("login response", data);
    

  //     if (data.ok) {
  //       await checkAuth(); // Fetch user details after successful login
  //       return { success: true };
  //     } else {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //       return { success: false, message: data.message };
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     setUser(null);
  //     setIsAuthenticated(false);
  //     return { success: false, message: 'Login failed' };
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const login = async (userData) => { 
  setLoading(true);

  try {
    const res = await userService.login(userData);
    const data = res.data;

    console.log("Login response:", data);

    if (data.message === "Login successful")  {
      await checkAuth(); // maybe get /auth/me data
      return { success: true };
    } else {
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    setUser(null);
    setIsAuthenticated(false);
    return { success: false, message: "Login failed" };
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      isAuthenticated,
      checkAuth,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
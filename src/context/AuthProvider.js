
//This context provider holds state and functions related to authentication, such as login, logout, and fetching the current admin profile. 
import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest, getProfile, logout as clearSession } from "../services/authService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAdmin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAdmin(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await getProfile(token);
      setAdmin(res.data.admin);
    } catch (error) {
      localStorage.removeItem("token");
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAdmin();
  }, []);

  const login = async (credentials) => {
    const res = await loginRequest(credentials);

    if (!res.data?.token || !res.data?.admin) {
      throw new Error(res.data?.message || "Login failed");
    }

    localStorage.setItem("token", res.data.token);
    setAdmin(res.data.admin);

    return res.data.admin;
  };

  const logout = () => {
    clearSession();
    setAdmin(null);
  };

  const updateAdmin = (updatedData) => {
    setAdmin((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{ admin, isLoading, login, logout, refreshAdmin, updateAdmin, }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
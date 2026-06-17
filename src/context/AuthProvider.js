import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [admin, setAdmin] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //Check for token in localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoading(false)
            return
        }

        //Verify token and fetch user profile
        const verifyAdmin = async () => {
            try {
                const res = await axios.get("", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setAdmin(res.data.admin)
            } catch(err){
                localStorage.removeItem("token")
                setAdmin(null)
            } finally {
                setIsLoading(false)
            }
        };
        verifyAdmin()
    }, [])

    //Login Function
    const login = async (email, password) => {
        const res = await axios.post("", {email, password})
        if (!res.data?.token || !res.data?.admin) {
            throw new Error(res.data?.message || "Login failed")
        }
        localStorage.setItem("token", res.data.token)
        setAdmin(res.data.admin)  // normalize on login
        return res.data.admin
    }

    //Logout Function
    const logout = () => {
        localStorage.removeItem("token")
        setAdmin(null)
    }

    //Update Admin Function
    const updateAdmin = (updatedData) => {
        setAdmin(prev => ({ ...prev, ...updatedData }))  // normalize on update
    }
    return (
        <AuthContext.Provider value={{ admin, isLoading, login, logout, updateAdmin }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider

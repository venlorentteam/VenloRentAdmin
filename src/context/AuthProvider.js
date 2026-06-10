import React, { createContext, useContext, useState, useEffect } from 'react'
// Use the browser build so webpack does not try to bundle axios's Node adapter.
import axios from 'axios/dist/browser/axios.cjs'
//import defaultAvatar from "../assets/img/avatar.png"

// Avatar single helper — normalize once, use everywhere
// const normalizeUser = (admin) => ({
//   ...admin,
//   avatar: admin.avatar || defaultAvatar,
// })

// //Create Context Provider
const AuthContext = createContext()

// //Define Context Coomponent
const AuthProvider = ({children}) => {
//     const [admin, setAdmin] = useState(null)
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         //Check for token in localStorage
//         const token = localStorage.getItem("token");

//         if (!token) {
//             setIsLoading(false)
//             return
//         }
//         //Verify token and fetch user profile
//         const verifyAdmin = async () => {
//             try {
//                 const res = await axios.get("", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 })
//                 setAdmin(normalizeUser(res.data.admin))
//             } catch(err){
//                 localStorage.removeItem("token")
//                 setAdmin(null)
//             } finally {
//                 setIsLoading(false)
//             }
//         };
//         verifyAdmin()
//     }, [])

//     //Login Function
//     const login = async (email, password) => {
//         const res = await axios.post("", {email, password})
//         if (!res.data?.token || !res.data?.admin) {
//             throw new Error(res.data?.message || "Login failed")
//         }
//         localStorage.setItem("token", res.data.token)
//         const normalized = normalizeUser(res.data.admin)
//         setAdmin(normalized)  // normalize on login
//         return normalized
//     }

//     // Admin state updater func
//     const setAuthFromToken = (token, adminData) => {
//         localStorage.setItem("token", token)
//         setAdmin(normalizeUser(adminData))
//     }

//     //Logout Function
//     const logout = () => {
//         localStorage.removeItem("token")
//         setAdmin(null)
//     }

//     //Update Admin Function
//     const updateAdmin = (updatedData) => {
//         setAdmin(prev => normalizeUser({ ...prev, ...updatedData }))  // normalize on update
//     }
    //Return Context Provider with admin and auth functions
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider

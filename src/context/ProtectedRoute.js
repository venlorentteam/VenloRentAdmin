import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from "./AuthProvider";
import Loader from '../components/layout/Loader'

const ProtectedRoute = ({ children }) => {
      const { admin, isLoading } = useAuth();
      const location = useLocation()

        if (isLoading) return <Loader />;
        if (!admin) {
          return <Navigate to="/" replace state={{ from: location }} />;
        }
        return children;
}
export default ProtectedRoute

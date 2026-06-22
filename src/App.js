import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import Requests from "./pages/Requests";
import Orders from "./pages/Orders";
import KYCVerification from "./pages/KYCVerification";
import Moderations from "./pages/Moderations";
import Payments from "./pages/Payments";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/listings" element={<ProtectedRoute><Listings /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        <Route path="/moderation" element={<ProtectedRoute><Moderations /></ProtectedRoute>} />
        <Route path="/kyc" element={<KYCVerification />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
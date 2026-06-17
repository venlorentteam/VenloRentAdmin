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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/moderation" element={<Moderations />} />
        <Route path="/kyc" element={<KYCVerification />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
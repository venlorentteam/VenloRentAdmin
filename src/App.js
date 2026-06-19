import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import Orders from "./pages/Orders";
import KYCVerification from "./pages/KYCVerification";
import Moderations from "./pages/Moderations";
import Requests from "./pages/Requests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/moderation" element={<Moderations />} />
      <Route path="/kyc" element={<KYCVerification />} />
       <Route path="/requests" element={<Requests />} />
    </Routes>
  );
}

export default App;
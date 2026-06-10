import { Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import * as Pages from './exports'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Pages.Login />} />
        <Route path="/dashboard" element={<Pages.Dashboard />} />
        <Route path="/moderations" element={<Pages.Moderations />} />
        <Route path="/listings" element={<Pages.Listings />} />
        <Route path="/requests" element={<Pages.Requests />} />
        <Route path="/kyc" element={<Pages.KycStatus />} />
        <Route path="/orders" element={<Pages.Orders />} />
        <Route path="/reports" element={<Pages.Reports />} />
        <Route path="/subscriptions" element={<Pages.Subscriptions />} />
        <Route path="/tickets" element={<Pages.Tickets />} />
        <Route path="/users" element={<Pages.Users />} />
        {/* To include more routes */}
      </Routes>
    </AuthProvider>
  )
}

export default App;

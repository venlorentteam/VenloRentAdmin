import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
// Alternatively use the generate-index module

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* To include more routes */}
    </Routes>
  );
}

export default App;

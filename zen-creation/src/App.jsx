// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import NextSignup from "./pages/auth/NextSignup";
import Dashboard from "./pages/Dashboard";
import Investment from "./pages/Investment";
import Sales from "./pages/sales/Sales";
import Stocks from "./pages/stocks/Stocks";
import SecuritySettings from "./pages/Settings/SecuritySettings";
import ProfileSetting from "./pages/Settings/ProfileSetting";
import SettingsPage from "./pages/Settings/SettingsPage";
import TeamPage from "./pages/dashboard/TeamPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/NextSignup" element={<NextSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/SecuritySettings" element={<SecuritySettings />} />
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
        <Route path="/SettingsPage" element={<SettingsPage />} />
        <Route path="/TeamPage" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;

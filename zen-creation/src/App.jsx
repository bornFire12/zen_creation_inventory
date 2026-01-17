// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import NextSignup from "./pages/auth/NextSignup";
import Dashboard from "./pages/dashboard/Dashboard";
import Investment from "./pages/investment/Investment";
import Sales from "./pages/sales/Sales";
import Stocks from "./pages/stocks/Stocks";
import SecuritySettings from "./pages/Settings/SecuritySettings";
import ProfileSetting from "./pages/Settings/ProfileSetting";
import SettingsPage from "./pages/Settings/SettingsPage";
import TeamPage from "./pages/dashboard/TeamPage";
import StockPreview from "./pages/stocks/StockPreview";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTeam from "./pages/Dashboard/AddTeam";
import Help from "./pages/help/help";

import NotificationSetting from "./pages/Settings/NotificationSetting";

// Wrapper component to use useAuth hook
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route path="/NextSignup" element={<NextSignup />} />

      {/* Protected Routes */}
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/profile" element={<ProfileSetting />} />
      <Route path="/settings/security" element={<SecuritySettings />} />
      <Route path="/settings/notification" element={<NotificationSetting />} />
      <Route path="/AddTeam" element={<AddTeam />} />
      <Route path="/help" element={<Help />} />
      <Route
        element={
          <ProtectedRoute>
            <TeamPage />
          </ProtectedRoute>
        }
        path="/team"
      />
      <Route
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        path="/dashboard"
      />
      <Route
        element={
          <ProtectedRoute>
            <Stocks />
          </ProtectedRoute>
        }
        path="/stocks"
      />
      <Route
        path="/stocks/preview/:id"
        element={
          <ProtectedRoute>
            <StockPreview />
          </ProtectedRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <Investment />
          </ProtectedRoute>
        }
        path="/investment"
      />
      <Route
        element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        }
        path="/sales"
      />

      {/* Catch all other routes */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

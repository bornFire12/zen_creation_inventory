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
import SecuritySettings from "./pages/Settings/SecuritySettings";
import ProfileSetting from "./pages/Settings/ProfileSetting";
import SettingsPage from "./pages/Settings/SettingsPage";
import TeamPage from "./pages/dashboard/TeamPage";
import Dashboard from "./pages/dashboard/dashboard";
import Stocks from "./pages/stocks/Stocks";
import StockPreview from "./pages/stocks/StockPreview";
import Investment from "./pages/investment/Investment";
import Sales from "./pages/sales/Sales";
import ProtectedRoute from "./components/ProtectedRoute";
import SalesPage from "./pages/stocks/SalesPage";

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
      <Route
        element={
          <ProtectedRoute>
            <SecuritySettings />
          </ProtectedRoute>
        }
        path="/SecuritySettings"
      />
      <Route
        element={
          <ProtectedRoute>
            <ProfileSetting />
          </ProtectedRoute>
        }
        path="/ProfileSetting"
      />
      <Route
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
        path="/settings"
      />
      <Route
        path="/SettingsPage"
        element={<Navigate to="/settings" replace />}
      />
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
        element={
          <ProtectedRoute>
            <StockPreview />
          </ProtectedRoute>
        }
        path="/stocks/preview/:id"
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
      <Route
        element={
          <ProtectedRoute>
            <SalesPage />
          </ProtectedRoute>
        }
        path="/sales-page"
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

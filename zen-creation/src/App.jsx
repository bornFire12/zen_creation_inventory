import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import AddTeam from "./pages/dashboard/AddTeam";
import Help from "./pages/help/help";
import RouteTracker from "./context/RouteTracker";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotificationSetting from "./pages/Settings/NotificationSetting";

const AppRoutes = () => {
  const { user, lastVisitedPath, isInitialized } = useAuth();
  const location = useLocation();

  // Show loading state while auth is initializing
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  // If user is not logged in and not on an auth page, redirect to login
  if (
    !user &&
    !["/login", "/signup", "/forgot-password", "/"].includes(location.pathname)
  ) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in and on the root path, redirect to last visited path or dashboard
  if (user && location.pathname === "/") {
    return <Navigate to={lastVisitedPath || "/dashboard"} replace />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={user ? lastVisitedPath || "/dashboard" : "/login"}
            replace
          />
        }
      />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route path="/NextSignup" element={<NextSignup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/help" element={<Help />} />

      {/* Protected Routes */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/profile"
        element={
          <ProtectedRoute>
            <ProfileSetting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/security"
        element={
          <ProtectedRoute>
            <SecuritySettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/notification"
        element={
          <ProtectedRoute>
            <NotificationSetting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team"
        element={
          <ProtectedRoute>
            <TeamPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stocks"
        element={
          <ProtectedRoute>
            <Stocks />
          </ProtectedRoute>
        }
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
        path="/investment"
        element={
          <ProtectedRoute>
            <Investment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-team"
        element={
          <ProtectedRoute>
            <AddTeam />
          </ProtectedRoute>
        }
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
          <RouteTracker>
            <AppRoutes />
          </RouteTracker>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

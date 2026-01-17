// src/context/RouteTracker.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RouteTracker = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateLastVisitedPath, lastVisitedPath } = useAuth();

  useEffect(() => {
    // Don't update for auth routes
    if (!["/login", "/signup", "/"].includes(location.pathname)) {
      updateLastVisitedPath(location.pathname);
    }
  }, [location, updateLastVisitedPath]);

  // Handle initial navigation
  useEffect(() => {
    if (
      location.pathname === "/dashboard" &&
      lastVisitedPath &&
      lastVisitedPath !== "/dashboard"
    ) {
      navigate(lastVisitedPath, { replace: true });
    }
  }, [location.pathname, lastVisitedPath, navigate]);

  return children;
};

export default RouteTracker;

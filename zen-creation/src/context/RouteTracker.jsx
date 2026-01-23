// src/context/RouteTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RouteTracker = ({ children }) => {
  const location = useLocation();
  const { updateLastVisitedPath } = useAuth();

  useEffect(() => {
    // Only track non-auth routes
    if (
      !["/login", "/signup", "/forgot-password", "/"].includes(
        location.pathname,
      )
    ) {
      updateLastVisitedPath(location.pathname);
    }
  }, [location, updateLastVisitedPath]);

  return children;
};

export default RouteTracker;

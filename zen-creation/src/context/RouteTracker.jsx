// src/context/RouteTracker.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RouteTracker = ({ children }) => {
  const location = useLocation();
  const { user, updateLastVisitedPath } = useAuth();
  const initialLoad = useRef(true);

  useEffect(() => {
    // Skip the first render and don't track if user is not logged in
    if (initialLoad.current || !user) {
      initialLoad.current = false;
      return;
    }

    // Don't track auth routes or the root path
    if (
      !["/login", "/signup", "/forgot-password", "/"].includes(
        location.pathname,
      )
    ) {
      console.log("Updating last visited path to:", location.pathname);
      updateLastVisitedPath(location.pathname);
    }
  }, [location, updateLastVisitedPath, user]);

  return children;
};

export default RouteTracker;

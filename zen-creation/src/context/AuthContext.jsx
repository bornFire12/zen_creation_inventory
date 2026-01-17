import { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastVisitedPath, setLastVisitedPath] = useState("/dashboard"); // Default to dashboard

  useEffect(() => {
    // Load user and last visited path from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    const storedPath = localStorage.getItem("lastVisitedPath");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedPath) {
      setLastVisitedPath(storedPath);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    // After login, redirect to the last visited path or dashboard
    return lastVisitedPath || "/dashboard";
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateLastVisitedPath = (path) => {
    if (path !== "/login" && path !== "/signup") {
      setLastVisitedPath(path);
      localStorage.setItem("lastVisitedPath", path);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        lastVisitedPath,
        updateLastVisitedPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

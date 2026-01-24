import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastVisitedPath, setLastVisitedPath] = useState("/dashboard");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load user and last visited path from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPath = localStorage.getItem("lastVisitedPath");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
        localStorage.removeItem("user");
      }
    }

    if (storedPath) {
      setLastVisitedPath(storedPath);
    }

    // Mark initialization as complete
    setIsInitialized(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateLastVisitedPath = (path) => {
    setLastVisitedPath(path);
    localStorage.setItem("lastVisitedPath", path);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        lastVisitedPath,
        isInitialized,
        login,
        logout,
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

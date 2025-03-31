import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found:", token);
    setIsAuthenticated(!!token);
  }, []);


  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

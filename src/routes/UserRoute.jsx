import {jwtDecode} from "jwt-decode"; 
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const [loading,setLoading]=useState(true);
  const [role, setRole] = useState(null); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role); 
        setLoading(false);
      } catch (error) {
        console.error("Error decoding token:", error);
        setRole(null); 
      }
    } else {
      setRole(null); 
    }
  }, [token]);

 
  if (!token) {
    return <Navigate to="/login" />;
  }

 
  if (role === null || loading) {
    return <div>Loading...</div>;
  }

  if (role === "user") {
    return children;
  }
  if (role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  


  return <Navigate to="/unauthorized" />;
};

export default UserRoute;

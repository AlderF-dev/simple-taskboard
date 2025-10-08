import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RedirectRoot = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RedirectRoot;

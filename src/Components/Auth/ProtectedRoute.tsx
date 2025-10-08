import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Loader } from "rsuite";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Wait for the auth check before deciding
  if (loading) {
    return (
      <Loader
        size="lg"
        style={{
          margin: "auto",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ); // or your own spinner component
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to nested routes
  return <Outlet />;
};

export default ProtectedRoute;

import { useAuth } from "../../contexts/AuthContext";
import { Button } from "rsuite";

const LogoutButton = ({ ...rest }) => {
  const { isAuthenticated, logout, loading } = useAuth();

  if (!isAuthenticated) return;

  return (
    <Button onClick={logout} loading={loading}>
      Logout
    </Button>
  );
};

export default LogoutButton;

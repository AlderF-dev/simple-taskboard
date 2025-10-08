import { useAuth } from "../../contexts/AuthContext";
import { Button } from "rsuite";

const LogoutButton = ({ ...rest }) => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return;

  return <Button onClick={logout}>Logout</Button>;
};

export default LogoutButton;

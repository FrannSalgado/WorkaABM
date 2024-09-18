import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

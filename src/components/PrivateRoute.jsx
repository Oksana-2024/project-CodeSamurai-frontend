import { Navigate } from "react-router-dom";
import { useAuth } from "../redux/auth/slice";


 const PrivateRoute = ({component: Component, redirectTo = '/'}) => {
  const { isLoggedIn, token } = useAuth();
  const isAuthenticated  = !isLoggedIn && !token;

  return isAuthenticated  ? <Navigate to={redirectTo} /> : Component;
}
export default PrivateRoute


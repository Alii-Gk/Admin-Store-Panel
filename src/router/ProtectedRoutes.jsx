import { getCookie } from "utils/cookie";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const token = getCookie("token");

  return !token ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;

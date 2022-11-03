import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export interface ProtectedRouteProps {}

function ProtectedRoute({}: ProtectedRouteProps) {
  const { access } = useSelector((state) => state.auth);

  if (!access) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

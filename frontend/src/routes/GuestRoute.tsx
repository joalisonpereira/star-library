import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export interface GuestRouteProps {}

function GuestRoute({}: GuestRouteProps) {
  const { access } = useSelector((state) => state.auth);

  if (access) {
    return <Navigate to="/users" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;

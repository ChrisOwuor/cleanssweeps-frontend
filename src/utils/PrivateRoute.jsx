import { useAuth } from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return !loading && user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;

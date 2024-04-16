import { Navigate, Outlet } from "react-router-dom";
import { Nav } from "../../components/Nav";
import { useAuth } from "../../auth/AuthProvider";

export const Main = () => {
  const { access_token } = useAuth();

  if (!access_token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

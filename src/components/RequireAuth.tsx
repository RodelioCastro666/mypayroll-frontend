import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../auth";
import { useAuth } from "../auth/Auth";

export const RequireAuth = () => {
    const { token } = useAuth();
    // const location = useLocation();
    // const token = localStorage.getItem('token');

    // console.log(token)

    return (token ?
        <Outlet /> :
        <Navigate to="/login" replace />);
}




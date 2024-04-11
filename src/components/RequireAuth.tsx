import { useLocation, Navigate,Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";

export  const RequireAuth = () =>{
    const { auth }  = useAuth();
    const location = useLocation();

    return (auth?.user ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace /> );
}



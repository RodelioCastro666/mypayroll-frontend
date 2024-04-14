import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Nav } from "../components/Nav";

export const AuthenticatedRoutes = () =>{
    
    const { token } = useAuth();

    if(!token){

        return<Navigate to="/login" />
    }
    return  (
        <div>
            <Nav />
            <Outlet />
        </div>
    ) 
}
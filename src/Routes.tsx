import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { AuthenticatedRoutes } from "./auth/AuthenticatedRoutes";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";


//This functional component acts as the entry point for 
//configuring the application routes.
export const Routes = () => {

    //The useAuth hook is called to retrieve the token value from 
    //the authentication context. It allows us to access the 
    //authentication token within the Routes component.
    const { token } = useAuth();
    

    const routesForPublic = [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
    ];

    const routesForNotAuthenticated =[
        {
            path: "/",
            element: <div>JUST PAGE</div>,
        },
        {
            path: "/login",
            element : <Login />
        }
    ];


    const routesForAuthenticated =[
        {
            path: "/",
            element : <AuthenticatedRoutes />,
            children : [

                {
                    path: "dashboard",
                    element: <Dashboard />,
                },
                {
                    path : "employees",
                    element: <Employees />
                },
            ]
        }
    ];

    
    const router = createBrowserRouter([
        ...routesForPublic, 
        ...(!token ? routesForNotAuthenticated: []),
        ...routesForAuthenticated,

    ])

    return <RouterProvider router={router} />;
};
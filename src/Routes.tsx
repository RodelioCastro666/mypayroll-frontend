import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { AuthenticatedRoutes } from "./auth/AuthenticatedRoutes";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Employees } from "./pages/Employees/Employees";
import { OrganizationsLayout } from "./pages/Organizations/All_Organizations/OrganizationsLayout";
import { Departments } from "./pages/Organizations/Organization(sub)/BMP/Departments";
import { ErrorPage } from "./ErroPage";

import { Organizations } from "./pages/Organizations/_Organizations/Organizations";

import { BMP } from "./pages/Organizations/Organization(sub)/BMP/BMP";
import { DMP } from "./pages/Organizations/_Organization(branch)/_Organization/DMP";

//This functional component acts as the entry point for
//configuring the application routes.
export const Routes = () => {
  //The useAuth hook is called to retrieve the token value from
  //the authentication context. It allows us to access the
  //authentication token within the Routes component.
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },

    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  const routesForNotAuthenticated = [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const routesForAuthenticated = [
    {
      path: "/",
      element: <AuthenticatedRoutes />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "employees",
          element: <Employees />,
        },

        {
          path: "organizations/*",
          element: <OrganizationsLayout />,
          children: [
            {
              path: "*",
              element: <Organizations />,
            },

            {
              path: ":orgAlias",
              element: <BMP />,
            },
            {
              path: ":orgAlias/branches/:branchAlias/departments/",
              element: <DMP />,
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticated : []),
    ...routesForAuthenticated,
  ]);

  return <RouterProvider router={router} />;
};

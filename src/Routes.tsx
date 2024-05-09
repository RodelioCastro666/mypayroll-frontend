import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { AuthenticatedRoutes } from "./auth/AuthenticatedRoutes";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Employees } from "./pages/Employees/Employees";
import { OrganizationsLayout } from "./pages/Organizations/All_Organizations/OrganizationsLayout";
import { ManageMemberLayout } from "./pages/Organizations/ManageMember/ManageMemberLayout";
import { ErrorPage } from "./ErroPage";
import { SpecificDeparmtent } from "./pages/Organizations/Organization(sub)/SpecificDepartment";
import { Organizations } from "./pages/Organizations/_Organizations/Organizations";
import { ManageMember } from "./pages/Organizations/ManageMember/ManageMember";
import { BMP } from "./pages/Organizations/Organization(sub)/BMP/BMP";

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
              path: ":orgAlias/members/*",
              element: <ManageMemberLayout />,
              children: [
                {
                  path: "*",
                  element: <ManageMember />,
                },
              ],
            },
            {
              path: ":orgAlias/branches/:branchAlias/departments/",
              element: <SpecificDeparmtent />,
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

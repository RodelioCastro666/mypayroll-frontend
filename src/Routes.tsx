import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { AuthenticatedRoutes } from "./auth/AuthenticatedRoutes";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Employees } from "./pages/Employees/Employees";
import { Organizations } from "./pages/Organizations/All_Organizations/Organizations";
import { Organization } from "./pages/Organizations/Organization(Specific)/Organization";
import { ErrorPage } from "./ErroPage";
import { AllORg } from "./pages/Organizations/All_Organizations/AllOrg";
import { SpecificORg } from "./pages/Organizations/All_Organizations/SpecificORg";
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
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  const routesForNotAuthenticated = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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
          path: "/employees",
          element: <Employees />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "organizations/*",
          element: <Organizations />,
          children: [
            {
              path: "*",
              element: <AllORg />,
            },
            {
              path: ":id",
              element: <SpecificORg />,
            },
            {
              path: "branch",
              element: <div>BRANCHES</div>,
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

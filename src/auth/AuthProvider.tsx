import axios from "../api/axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

//createContext() creates an empty context object that will be used to
//share the authentication state and functions between components.
const AuthContext = createContext();

// const ACTIONS = {
//   setToken: "setToken",
//   clearToken: "clearToken",
// };

// This component serves as the provider for the authentication context.
//It receives children as a prop, which represents
//the child components that will have access to the
//authentication context.
export const AuthProvider = ({ children }) => {
  //token represents the authentication token.
  const [access_token, setAccessToken_] = useState();
  const [refresh_token, setRefreshToken_] = useState();

  // This function is used to set the new token value.
  // It updates the token state using setToken_() and stores the
  // token value in the local storage using localStorage.setItem().
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setAccessToken = (newToken) => {
    setAccessToken_(newToken);
  };
  const setRefreshToken = (newToken) => {
    setRefreshToken_(newToken);
  };

  //This effect runs whenever the token value changes.
  //If the token exists, it sets the
  //authorization header in axios.
  //If the token is null or undefined, it removes
  //the authorization header from axios.
  useEffect(() => {
    if (access_token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;

      // console.log("Bearer " + token);
      // localStorage.setItem("token", access_token);
    } else {
      // delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [refresh_token, access_token]);

  // The context value includes the token and setToken function.
  // The token value is used as a dependency for memoization.
  const contextValue = useMemo(
    () => ({
      refresh_token,
      access_token,
      setAccessToken,
      setRefreshToken,
    }),
    [refresh_token, access_token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//useAuth is a custom hook that can be used in
//components to access the authentication context.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

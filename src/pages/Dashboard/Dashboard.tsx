import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import axios from "../../api/axios";
import { useRefreshRequest } from "../../auth/useRefreshRequest";

export const Dashboard = () => {
  const { setAccessToken } = useAuth();

  const { access_token } = useAuth();

  console.log(access_token);

  console.log(access_token);
  return (
    <div className="w-full h-full ">
      {/* Dashboard Screenddd
      <button onClick={() => setAccessToken()}>RESET</button>
      <button onClick={() => refresh()}>Refresh</button>
      ddd
      <button
        onClick={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setAccessToken();
        }}
      >
        LOGOUT
      </button> */}
    </div>
  );
};

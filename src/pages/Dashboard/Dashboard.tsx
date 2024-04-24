import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import axios from "../../api/axios";
import { useRefreshRequest } from "../../auth/useRefreshRequest";

export const Dashboard = () => {
  const { setAccessToken } = useAuth();

  const { access_token } = useAuth();

  // const customFetch = axios.create({
  //   baseURL: "http://10.10.10.98:3000/api",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   withCredentials: true,
  // });

  // customFetch.interceptors.request.use(
  //   async (config) => {

  //     if (token) {
  //       config.headers["Authorization"] = ` bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // const refreshToken = async () => {
  //   try {
  //     const resp = await customFetch.post("auth/refresh");
  //     console.log("refresh token", resp.data);
  //     return resp.data;
  //   } catch (e) {
  //     console.log("Error", e);
  //   }
  // };

  console.log(access_token);
  const refresh = useRefreshRequest();
  console.log(access_token);
  return (
    <div className="w-full h-full bg-red-100">
      Dashboard Screenddd
      <button onClick={() => setAccessToken()}>RESET</button>
      <button onClick={() => refresh()}>Refresh</button>
      ddd
      <button onClick={() => localStorage.removeItem("token")}>LOGOUT</button>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider"
import axios from "../../api/axios";
import { useRefreshRequest } from "../../auth/useRefreshRequest";




export const Dashboard = () => {

  const { setToken } = useAuth();

  const { token } = useAuth();


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

  const refresh = useRefreshRequest();

  return (
    <div className="h-screen flex justify-center items-center">Dashboard Screen
      <button onClick={() => setToken()} >RESET</button>

      <button onClick={() => refresh()} >Refresh</button>

    </div>

  )



}




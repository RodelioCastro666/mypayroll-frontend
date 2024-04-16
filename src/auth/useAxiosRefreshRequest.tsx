import { axiosRefreshRequest } from "../api/axios";
import { useRefreshRequest } from "./UseRefreshRequest";
import { useAuth } from "./AuthProvider";
import { axiosRefreshRequest } from "../api/axios";
import { useEffect } from "react";

const useAxiosRefreshRequest = () => {
  const refresh = useRefreshRequest();
  const { access_token, refresh_token } = useAuth;

  //   useEffect(() => {
  //     const interceptor = axiosRefreshRequest.interceptors.response.use(
  //       (response) => response,
  //       async (error) => {
  //         const prevRequest = error?.config;
  //         if (error?.response?.status === 403 && !prevRequest?.sent) {
  //           prevRequest.sent = true;
  //           const newAccessToken = await refresh();
  //           prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
  //           return axiosRefreshRequest(prevRequest);
  //         }

  //         return Promise.reject(error);
  //       }
  //     );

  //     return () => axiosRefreshRequest.interceptors.response.eject(interceptor);
  //   }, [access_token, refresh_token, refresh]);

  return axiosRefreshRequest;
};

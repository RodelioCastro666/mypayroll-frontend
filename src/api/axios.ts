import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const BASE_URL = "https://aug-nathan-remedy-application.trycloudflare.com/api";

// const { refresh_token } = useAuth();
// const { access_token } = useAuth();

// const headers_AccessToken  = { Authorization: `Bearer ${}` };
// const headers_RefreshToken  = { Authorization: `Bearer ${}` };

// for common request (GET,POST,PATCH)

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// for refresh token(ACCESS/REFRESH) request
// further working
export const axiosRefreshRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

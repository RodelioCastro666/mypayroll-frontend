
import axios from "axios";


const BASE_URL = "http://10.10.10.98:3000/api";



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

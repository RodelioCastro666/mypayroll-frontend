import axios, { axiosRefreshRequest } from "../api/axios";
import { useAuth } from "./AuthProvider";

export const useRefreshRequest = () => {
  const { setAccessToken } = useAuth();
  const { refresh_token } = useAuth();
  const { setRefreshToken } = useAuth();
  const { access_token } = useAuth();

  console.log("userREFRESH", refresh_token);

  const refresh = async () => {
    try {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + refresh_token;

      axios.defaults.withCredentials = true;
      const response = await axios.post("/auth/refresh");

      setRefreshToken(response.headers["refresh-token"]);
      setAccessToken(response.headers["access-token"]);

      return response.headers["access-token"];
      console.log(response.headers["access-token"]);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return refresh;
};

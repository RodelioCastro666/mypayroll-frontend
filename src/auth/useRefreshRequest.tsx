import axios from "../api/axios";
import { useAuth } from "./AuthProvider";

export const useRefreshRequest = () => {
  const { setAccessToken } = useAuth();
  const { refresh_token } = useAuth();
  const { setRefreshToken } = useAuth();
  const { access_token } = useAuth();

  const refresh = async () => {
    try {
      console.log("old-REFRESH :", refresh_token);
      console.log("old-ACCESS :", access_token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + refresh_token;

      axios.defaults.withCredentials = true;
      const response = await axios.post("/auth/refresh");
      console.log(response);
      setRefreshToken(response.headers["refresh-token"]);

      setAccessToken(response.headers["access-token"]);
      console.log("new-REFRESH :", refresh_token);
      console.log("new-ACCESS :", access_token);
      console.log("response-header:", response.headers["access-token"]);
      return response.headers["access-token"];
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return refresh;
};

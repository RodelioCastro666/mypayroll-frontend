import axios from "../api/axios";
import { useAuth } from "./AuthProvider";



export const useRefreshRequest = () => {

    const { setAccessToken } = useAuth();
    const { setRefreshToken } = useAuth();

    const refresh = async () => {
        try {
            axios.defaults.withCredentials = true
            const response = await axios.post("/auth/refresh", {


            }

            );


            setRefreshToken(response.headers['refresh-token']);
            setAccessToken(response.headers['access-token']);

        } catch (error) {




            console.log('====================================');
            console.log(error);
            console.log('====================================');

        }

    }

    return refresh;
}; 
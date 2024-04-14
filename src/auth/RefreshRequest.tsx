import axios from "../api/axios";
import { useAuth } from "./AuthProvider";


export const RefreshRequest = () =>{

    const { setToken } = useAuth();
    const { token } = useAuth();

    console.log(token);

    const refresh = async () =>{
        const response = await axios.post("/auth/refresh",
             
        );

        console.log(response);

    }

    return refresh;
}  
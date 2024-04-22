import axios from "../api/axios";
import { useAxiosRefreshRequest } from "../auth/useAxiosRefreshRequest";





export const registerUser = async (newUser) => {

    return await axios.post("/auth/signup",newUser);
}

export const loginUser = async (logUser) =>{
    
    return  await axios.post("/auth/signin", logUser);

}


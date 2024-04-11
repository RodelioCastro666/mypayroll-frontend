import  { useContext } from "react"
import AuthContext from "./Auth"


const useAuth = () =>{
    return useContext(AuthContext);
}

export default useAuth;
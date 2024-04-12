// import { useContext } from "react"
// import AuthContext from "./Auth"


// const useAuth = () => {
//     return useContext(AuthContext);
// }

// export default useAuth;

import { AuthProvider } from "./Auth";

const AppProvider = ({ children }) => {

    return <><AuthProvider >{children}</AuthProvider></>

}

export default AppProvider;
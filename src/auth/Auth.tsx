import { createContext, useMemo, useState } from 'react';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";

const AuthContext = createContext({});
const LOGIN_URL = '/auth/signin';

interface login {
    email: string,
    password: string
}

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    //added recent
    //const [cookies, setCookies, removeCookie] = useCookies();
    const [token, setToken] = useState();

    const login = async ({ email, password }: login) => {
        const res = await axios.post(LOGIN_URL,
            JSON.stringify({
                email: email,
                password: password
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );


        localStorage.setItem('token', res.data.access_token);
        setToken(res.data.access_token);

        navigate('/dashboard');


    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const value = useMemo(
        () => ({
            token,
            login,
            logout
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );


    return (
        //change from <AuthContext.Provider value={{ auth, setAuth }}
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
}

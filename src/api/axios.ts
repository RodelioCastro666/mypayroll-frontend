import axios from "axios";
import { useEffect } from "react";


axios.defaults.withCredentials = true
export default axios.create({

    baseURL: "http://10.10.10.98:3000/api",
});

// const customFetch = axios.create({
//     baseURL: "http://localhost:3000/api/",
//     headers: {
//         "Content-type": "application/json",
//     },
//     withCredentials: true,
// });


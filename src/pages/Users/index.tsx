// import { useEffect, useState } from "react"
// import axios from "../../api/axios"


// export const Users = () => {


//     const [users, setUsers] = useState();

//     useEffect(() => {
//         let isMounted = true;
//         const controller = new AbortController();

//         const getUsers = async () => {

//             try {
//                 const response = await axios.get("/users", {
//                     signa: controller.signal
//                 },)

//                 console.log(response);
//                 isMounted && setUsers(response.data);

//             } catch (error) {
//                 console.log(error);

//             }


//         }
//         getUsers();

//         return () => {
//             isMounted = false;
//             controller.abort();
//         }

//     }, [])

//     return (
//         <div className="h-screen flex justify-center items-center">
//             {users ? console.log(users) : console.log("NOT")}
//             Users Screen
//         </div>
//     )
// }

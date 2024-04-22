// import axios from "../../../api/axios";
import { useAuth } from "../../../auth/AuthProvider";



import { Outlet, } from "react-router-dom";


export const OrganizationsLayout = () => {
  const { access_token } = useAuth();

  // const navigate = useNavigate();

  // const getOrg = async () => {
  //   const response = await axios.get("/organizations/");

  //   console.log(access_token);
  //   console.log(response);
  // };

  console.log("Organizations");

  return (
    <div className="grid grid-rows-[50px_1fr] ">

      <Outlet />

    </div>
  );
};
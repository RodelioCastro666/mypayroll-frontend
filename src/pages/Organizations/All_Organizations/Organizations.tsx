import axios from "../../../api/axios";
import { useAuth } from "../../../auth/AuthProvider";
import { Nav } from "../../../components/Nav";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Department } from "../../../components/Department";
import { Branch } from "../../../components/Branch";
import { Invitation } from "../../Invitation/Invitation";
import { AllORg } from "./AllOrg";
import { SpecificORg } from "./SpecificORg";

export const Organizations = () => {
  const { access_token } = useAuth();

  const navigate = useNavigate();

  const getOrg = async () => {
    const response = await axios.get("/organizations/");

    console.log(access_token);
    console.log(response);
  };

  console.log("Organizations");

  return (
    <div className="grid grid-rows-[50px_1fr] ">
      <div className=" px-4 py-1 border-b-[1px] flex justify-end gap-3">
        <button className=" border-[1px] rounded px-10 py-1 hover:shadow-md">
          Create
        </button>
        <button className=" border-[1px] rounded px-10  hover:shadow-md">
          Join
        </button>
      </div>

      <section className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10">
        {/* <Routes>
              <Route index element={<AllORg />} />

              <Route path=":userId" element={<SpecificORg />} />
            </Routes> */}
        {/* <Link to="/organizations/9">CLICK</Link> */}
        <Outlet />
        <button
          onClick={() => {
            navigate("8", { replace: true });
          }}
        >
          OCLICKKS
        </button>
      </section>
    </div>
  );
};

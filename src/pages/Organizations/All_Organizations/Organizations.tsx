import axios from "../../../api/axios";
import { useAuth } from "../../../auth/AuthProvider";
import { Nav } from "../../../components/Nav";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Link } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Department } from "../../../components/Department";
import { Branch } from "../../../components/Branch";
import { Invitation } from "../../Invitation/Invitation";

export const Organizations = () => {
  const { access_token } = useAuth();

  const getOrg = async () => {
    const response = await axios.get("/organizations/");

    console.log(access_token);
    console.log(response);
  };

  console.log("Organizations");

  return (
    <div className="h-screen  flex flex-col">
      <Header />
      <main className="flex flex-row h-full">
        <aside className="flex flex-col w-[300px]   border-r-[1px]  ">
          <Nav />
        </aside>
        <main className="w-full flex flex-col">
          <div className=" px-4 py-2 border-b-[1px] flex justify-end gap-3">
            <button className=" border-[1px] rounded px-10 py-2 hover:shadow-md">
              Create
            </button>
            <button className=" border-[1px] rounded px-10 py-2 hover:shadow-md">
              Join
            </button>
          </div>
          <Invitation />
          <section className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10">
            <div className="bg-red-100">
              <Link></Link>
            </div>
            <Department />
            <Branch />
          </section>
        </main>
      </main>
    </div>
  );
};

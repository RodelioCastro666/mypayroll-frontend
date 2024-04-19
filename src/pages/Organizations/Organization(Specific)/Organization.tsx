import axios from "../../../api/axios";
import { useAuth } from "../../../auth/AuthProvider";
import { Nav } from "../../../components/Nav";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Invitation } from "../../Invitation/Invitation";
import { CreateOrganization } from "../../../modals/CreateOrganization";
import { createPortal } from "react-dom";

export const Organization = () => {
  const { access_token } = useAuth();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getOrg = async () => {
    const response = await axios.get("/organizations/");

    console.log(access_token);
    console.log(response);
  };

  console.log("Organization");

  return (
    <div className="h-screen  flex flex-col ">
      <nav className="px-4 py-4 flex flex-row gap-4 justify-between border-b-[1px]">
        <div className="flex flex-row">
          <RxHamburgerMenu className="h-6 w-6" />
          <p>Organization</p>
        </div>
        <div className="flex flex-row gap-3">
          <p>JOEY DELEON</p>
          <HiUserCircle className="h-6 w-6" />
        </div>
      </nav>
      <main className="flex flex-row h-full">
        <aside className="flex flex-col  border-r-[1px] px-2 py-4">
          <Nav />
        </aside>
        <main className="w-full flex flex-col ">
          <div className=" px-4 py-2 border-b-[1px] flex justify-between gap-3 ">
            <div className="flex gap-2">
              <button className="  rounded px-6 py-2  border-b-4 border-white  hover:border-blue-500 ">
                Branch
              </button>
              <button className="   rounded px-6 py-2  border-b-4 border-white  hover:border-blue-500">
                Members
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal((prev) => !prev)}
                className=" border-[1px] rounded px-10 py-2 hover:shadow-md hover:bg-green-100"
              >
                Create
              </button>
              <button
                onClick={() => setShowJoinModal((prev) => !prev)}
                className=" border-[1px] rounded px-10 py-2 hover:shadow-md hover:bg-green-100"
              >
                Join
              </button>
            </div>
          </div>
          <section className=" h-full  grid grid-cols-5 grid-rows-3 p-10 gap-10 relative ">
            {/* <div className="bg-red-100"></div>
            <div className="bg-red-100"></div>
            <div className="bg-red-100"></div>
            <div className="bg-red-100"></div>
            <div className="bg-red-100"></div>
            <div className="bg-red-100"></div>
            <div className="bg-red-100"></div>
            <div className="bg-red-100"></div>
            <div className="bg-red-100"></div> */}
            {showJoinModal && createPortal(<Invitation />, document.body)}
            {showCreateModal &&
              createPortal(<CreateOrganization />, document.body)}
          </section>
        </main>
      </main>
    </div>
  );
};

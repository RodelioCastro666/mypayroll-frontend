import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";

export const AllORg = () => {

  const [organization, setOrganization] = useState("");
  const axiosRequest = useAxiosRefreshRequest();

  useEffect(() =>{
    let isMounted = true;
    const controller = new AbortController();

    const getOrganization = async () =>{
      try {
        const response = axiosRequest.get("/organizations",{
          signal: controller.signal
        });
        console.log(response);
        //isMounted && setOrganization(response);
      } catch (error) {
        console.log(error);
      }
    } 

    getOrganization();

    return () => {
      isMounted = false;
      controller.abort();
    }
  },[] )

  return (

    <>
    <nav>
      <div className=" px-4 py-1 border-b-[1px] flex justify-end gap-3">
        <button className=" border-[1px] rounded px-10 py-1 hover:shadow-md">
          Create
        </button>
        <button className=" border-[1px] rounded px-10  hover:shadow-md">
          Join
        </button>
      </div>
    </nav>

    <section className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 ">
      <div className="bg-red-100" > <Link to="2">ORG 1</Link> </div>
      <div>ORG 2</div>
      <div>ORG 3</div>
      <div>ORG 4</div>
      <div>ORG 5</div>
    </section>


    
    </>
  );
};

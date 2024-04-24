import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useState } from "react";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import kebab from "../../../../Assets/icons8-menu-vertical-64.png";

export const Members = ({ id }) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMembers = async () => {
      try {
        const response = await axiosRequest.get(
          `/organizations/${id}/members/`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setMembers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMembers();
    console.log(members);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosRequest, id]);

  return (
    <>
      {/* {members ? (
        members.map((member) => (
          <div className="bg-red-100 flex flex-col items-center">

            <div className="p-2">{member.name}</div>
            <div>{member.name}</div>
            <div>{member.name}</div>
            <div>{member.name}</div>
            <div>{member.name}</div>
            <div>{member.name}</div>
          </div>
        ))
      ) : (
        <></>
      )} */}

      <div className=" flex flex-col   items-center p-10 gap-5 ">
        <div className="w-[50%] flex flex-col justify-start gap-2 p-2">
          <h1 className="p-2 text-2xl font-semibold ">CREATOR</h1>
          <div className="border-y-[1px] border-blue-400 "></div>

          <div className=" p-2  flex items-center gap-5 ">
            <CgProfile className="w-[30px] h-[30px]" />
            <p>BASTA AKo</p>
          </div>
        </div>

        <div className="w-[50%] flex flex-col  items-start border-b">
          <h1 className="p-2 text-lg">MEMBERS:</h1>
          <div className="border-y-[1px] border-blue-400 w-full"></div>
          {members &&
            members.map((member) => (
              <div
                key={member.id}
                className="w-full p-5 border-b flex  justify-between  gap-5 "
              >
                <div className="flex items-center gap-3">
                  <CgProfile className="w-[30px] h-[30px]" />
                  <span>{member.name}</span>
                </div>
                <div className="flex justify-center items-center">
                  <img className="w-[20px] h-[20px]" src={kebab} alt="" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

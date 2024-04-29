import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useState } from "react";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";

import { MemberKebab } from "./MemberKebab";

interface IMemberProps {
  userEmail: string;
  orgAlias: string;
}

export const Members = (props: IMemberProps) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMembers = async () => {
      try {
        const response = await axiosRequest.get(
          `/organizations/${props.orgAlias}/members/`,
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
  }, []);

  return (
    <>
      <div className=" flex flex-col   items-center p-10 gap-5 ">
        <div className="w-[50%] flex flex-col justify-start gap-2 p-2">
          <h1 className="p-2 text-2xl font-semibold ">CREATOR</h1>
          <div className="border-y-[1px] border-blue-400 "></div>
          {members &&
            members.map((member) =>
              member.role === "owner" ? (
                <div key={member.id} className=" p-2  flex items-center gap-5 ">
                  <CgProfile className="w-[30px] h-[30px]" />
                  <p>{member.name}</p>
                </div>
              ) : null
            )}
        </div>
        <div className="w-[50%] flex flex-col  items-start border-b">
          <h1 className="p-2 text-lg">MEMBERS:</h1>
          <div className="border-y-[1px] border-blue-400 w-full"></div>
          {members &&
            members.map((member) =>
              member.role === "member" ? (
                <div
                  key={member.id}
                  className="w-full p-5 border-b flex  justify-between  gap-5 relative"
                >
                  <div className="flex items-center gap-3">
                    <CgProfile className="w-[30px] h-[30px]" />
                    <span>{member.name}</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <MemberKebab
                      userEmail={member.email}
                      orgAlias={props.orgAlias}
                    />
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

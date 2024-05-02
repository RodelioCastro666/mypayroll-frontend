import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useState } from "react";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import "../../../../index.css";
import { MemberKebab } from "./MemberKebab";
import kebab from "../../../../Assets/icons8-menu-vertical-64.png";
import { FaRegUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

interface IMemberProps {
  userEmail: string;
  orgAlias: string;
}

export const Members = (props: IMemberProps) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [members, setMembers] = useState([]);

  const { data } = useQuery({
    queryKey: ["Members"],
    queryFn: async () => {
      return await axiosRequest.get(
        `/organizations/${props.orgAlias}/members/`
      );
    },
  });

  console.log(data?.data);
  useEffect(() => {
    setMembers(data?.data);
  }, []);

  return (
    <section className=" p-4">
      <table className=" w-full text-start">
        <thead>
          <tr>
            <th>Member</th>
            <th>Membership</th>
            <th>Status</th>
            <th>Role</th>
            <th>join Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {members &&
            members.map((member) =>
              member.role === "owner" ? (
                <tr key={member.id} className="font-bold text-red-500 ">
                  <td className="">
                    <CgProfile className="w-[25px] h-[25px] inline-block mr-2" />
                    {member.user.firstName} {member.user.lastName}
                  </td>
                  <td>{member.membership}</td>
                  <td>1961</td>
                  <td className="font-bold">{member.role}</td>
                  <td>{member.updatedAt}</td>
                  <td>
                    <img className="w-[20px]" src={kebab} alt="" />
                  </td>
                </tr>
              ) : null
            )} */}
          {members &&
            members.map((member) =>
              member.role === "member" ? (
                <tr key={member.id}>
                  <td className="">
                    <CgProfile className="w-[25px] h-[25px] inline-block mr-2" />
                    {member.user.firstName} {member.user.lastName}
                  </td>
                  <td>{member.membership}</td>
                  <td>ACTIVE</td>
                  <td>{member.role}</td>
                  <td>{member.updatedAt}</td>
                  <td>
                    <img className="w-[20px]" src={kebab} alt="" />
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
    </section>
  );
};

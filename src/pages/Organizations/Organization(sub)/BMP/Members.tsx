import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";

import { CgProfile } from "react-icons/cg";
import "../../../../index.css";

import kebab from "../../../../Assets/icons8-menu-vertical-64.png";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface IMemberProps {
  userEmail: string;
  orgAlias: string;
}

export const Members = (props: IMemberProps) => {
  const axiosRequest = useAxiosRefreshRequest();

  const [memberSearch, setMemberSearch] = useState("");

  const { data: members } = useQuery({
    queryKey: ["Members"],
    queryFn: async () => {
      return await axiosRequest.get(
        `/organizations/${props.orgAlias}/members/`
      );
    },
  });

  const membersList = members?.data;

  console.log(members?.data);

  return (
    <section className=" p-4">
      <div className="flex items-center  justify-center px-4 py-1">
        <input
          className="w-[300px] border rounded px-4 py-1"
          type="search"
          placeholder="Input Name to search"
          onChange={(e) => setMemberSearch(e.target.value)}
        />
      </div>
      <table className=" w-full text-start">
        <thead>
          <tr>
            <th>Member</th>
            <th>Membership</th>
            <th>Status</th>
            <th>Role</th>
            <th>Branch</th>
            <th>Department</th>
            <th>join Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {membersList &&
            membersList
              ?.filter((member) => {
                if (memberSearch === "") {
                  return member;
                } else if (
                  member.user.firstName
                    .toLowerCase()
                    .includes(memberSearch.toLowerCase())
                ) {
                  return member;
                }
              })
              .map((member) =>
                member.role === "member" ? (
                  <tr key={member.id}>
                    <td className="">
                      <CgProfile className="w-[25px] h-[25px] inline-block mr-2" />
                      {member.user.firstName} {member.user.lastName}
                    </td>
                    <td>{member.membership}</td>
                    <td>ACTIVE</td>
                    <td>{member.role}</td>
                    <td>
                      {member.branch ? member.branch : "Not yet Assigned"}
                    </td>
                    <td>
                      {member.department
                        ? member.department
                        : "Not yet Assigned"}
                    </td>
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

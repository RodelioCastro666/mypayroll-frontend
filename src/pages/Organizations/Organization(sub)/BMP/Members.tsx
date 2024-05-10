import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";

import { CgProfile } from "react-icons/cg";
import "../../../../index.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import { MemberKebab } from "./MemberKebab";

import { CiMenuKebab } from "react-icons/ci";
interface IMemberProps {
  userEmail: string;
  orgAlias: string;
}

export const Members = (props: IMemberProps) => {
  const axiosRequest = useAxiosRefreshRequest();

  const [memberSearch, setMemberSearch] = useState("");

  const { data: members, error } = useQuery({
    queryKey: ["Members"],
    queryFn: async () => {
      return await axiosRequest.get(
        `/organizations/${props.orgAlias}/members/`
      );
    },
    retry: false,
  });
  console.log(error);

  const membersList = members?.data;

  console.log(membersList);

  return (
    <section className=" p-4">
      <div className="flex items-center  justify-start  py-1">
        <input
          className="w-[300px] border rounded px-4 py-1"
          type="search"
          placeholder="Input Name to search"
          onChange={(e) => setMemberSearch(e.target.value)}
        />
      </div>
      <table className=" w-full text-start relative">
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
                console.log(member.user);
              })
              .map((member) =>
                member.role?.name !== "owner" ? (
                  <tr key={member.id}>
                    <td className="">
                      <CgProfile className="w-[25px] h-[25px] inline-block mr-2" />
                      {member.user.firstName} {member.user.lastName}
                    </td>
                    <td>{member.membership}</td>
                    <td>ACTIVE</td>
                    <td>{member.role ? member.role.name : "not assigned"}</td>
                    <td>
                      {member.branch
                        ? member.branch.branch_alias
                        : "not assigned"}
                    </td>
                    <td>
                      {member.department
                        ? member.department.alias
                        : "not assigned"}
                    </td>
                    <td>{member.updatedAt}</td>
                    <td className="relative ">
                      {/* <MemberKebab
                        orgAlias={props.orgAlias}
                        userEmail={member.user.email}
                      /> */}
                      <Link to={`members/${member.id}`}>
                        <CiMenuKebab className="text-black  " />
                      </Link>
                    </td>
                  </tr>
                ) : null
              )}
        </tbody>
      </table>
    </section>
  );
};

import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";

import { CgProfile } from "react-icons/cg";
import "../../../../index.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { CiMenuKebab } from "react-icons/ci";
// interface IMemberProps {
//   // userEmail: string;
//   orgAlias: string;
// }

export const Members = () => {
  const axiosRequest = useAxiosRefreshRequest();

  const [memberSearch, setMemberSearch] = useState("");

  const [members, setMembers] = useState([]);

  const { orgAlias } = useParams();

  const { data, error } = useQuery({
    queryKey: ["Members"],
    queryFn: async () => {
      const response = await axiosRequest.get(
        `/organizations/${orgAlias}/members/`
      );
      setMembers(response.data);
      return response;
    },
  });

  // useEffect(() => {
  //   const getMember = async () => {
  //     const response = await axiosRequest.get(
  //       `/organizations/${orgAlias}/members/`
  //     );

  //     setMembers(response.data);
  //   };

  //   getMember();
  // }, []);

  console.log(members);

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
          {members &&
            members
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
                member.role === null ? (
                  <tr key={member.id}>
                    <td className="">
                      <CgProfile className="w-[25px] h-[25px] inline-block mr-2" />
                      {member.user.firstName && member.user.firstName}
                      {member.user.lastName && member.user.lastName}
                    </td>
                    <td>{member.membership}</td>
                    <td>ACTIVE</td>
                    <td>{member.role ? member.role.name : "not assigned"}</td>
                    <td>
                      {member.branch ? member.branch.name : "not assigned"}
                    </td>
                    <td>
                      {member.department
                        ? member.department.name
                        : "not assigned"}
                    </td>
                    <td>{member.updatedAt}</td>
                    <td className="relative ">
                      <Link to={`${member.id}`}>
                        <CiMenuKebab className="text-black  " />
                      </Link>
                    </td>
                  </tr>
                ) : (
                  member.role.name !== "owner" && (
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
                        <Link to={`${member.id}`}>
                          <CiMenuKebab className="text-black  " />
                        </Link>
                      </td>
                    </tr>
                  )
                )
              )}
        </tbody>
      </table>
    </section>
  );
};

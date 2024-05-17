import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useQuery } from "@tanstack/react-query";
export const ManageMemberLayout = () => {
  const axiosRequest = useAxiosRefreshRequest();
  const { orgAlias, memberId } = useParams();

  const { data: member } = useQuery({
    queryKey: ["Member"],
    queryFn: async () => {
      return await axiosRequest.get(
        `/organizations/${orgAlias}/members/${memberId}/credential`
      );
    },
  });

  const members = member?.data;
  const user = member?.data.user;
  const branch = member?.data.branch;
  const department = member?.data.department;

  return (
    <div className="p-2 w-full h-full">
      <Outlet
        context={[orgAlias, members, memberId, user, branch, department]}
      />
    </div>
  );
};

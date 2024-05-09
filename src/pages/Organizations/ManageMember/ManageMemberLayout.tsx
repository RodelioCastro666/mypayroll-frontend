import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useQuery } from "@tanstack/react-query";
export const ManageMemberLayout = () => {
  const axiosRequest = useAxiosRefreshRequest();
  const { orgAlias } = useParams();

  const { data: member } = useQuery({
    queryKey: ["Members"],
    queryFn: async () => {
      return await axiosRequest.get(`/organizations/${orgAlias}/members/`);
    },
  });

  const members = member?.data;

  return (
    <div className="p-2 w-full h-full">
      {/* <aside></aside>
      <nav></nav> */}

      <Outlet context={[orgAlias, members]} />
    </div>
  );
};

import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../auth/AuthProvider";
import { Kebab } from "./BranchKebab";
import { useQuery } from "@tanstack/react-query";
interface Branches {
  orgAlias: string;
}

export const Branches = (props: Branches) => {
  const axiosRequest = useAxiosRefreshRequest();

  const { branches, setBranch } = useAuth();

  const { data } = useQuery({
    queryKey: ["branches"],
    queryFn: async () =>
      await axiosRequest.get(`/organizations/${props.orgAlias}/branches`),
  });

  setBranch(data?.data);
  console.log(data?.data);

  return (
    <>
      <div className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 relative">
        {branches
          ? branches.map((branch) => (
              <div key={branch.alias} className="border rounded-md p-4 ">
                <div className="flex flex-col gap-10 px-4 py-4  text-wrap relative">
                  <div className="flex justify-between items-center h-[70px]  ">
                    <h1 className="text-xl font-medium hover:underline">
                      {branch.name}
                    </h1>
                    <Kebab />
                  </div>

                  <div className="flex justify-end items-center border-t  p-2">
                    <button className="hover:underline">
                      <Link to={`branches/${branch.alias}/departments/`}>
                        View
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

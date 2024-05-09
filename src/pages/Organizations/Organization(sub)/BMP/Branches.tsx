import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../auth/AuthProvider";
import { BranchKebab } from "./BranchKebab";
import { useQuery } from "@tanstack/react-query";
interface Branches {
  orgAlias: string;
}

export const Branches = (props: Branches) => {
  const axiosRequest = useAxiosRefreshRequest();

  const { branches, setBranch } = useAuth();

  const [branchSearch, setBranchSearch] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["Branches"],
    queryFn: async () =>
      await axiosRequest.get(`/organizations/${props.orgAlias}/branches`),
  });

  setBranch(data?.data);
  console.log(data?.data);

  return (
    <>
      <div className="px-10  py-1 flex items-center ">
        <input
          className="w-[300px] border rounded px-4 py-1 "
          type="search"
          placeholder="Input Branch to search"
          onChange={(e) => setBranchSearch(e.target.value)}
        />
      </div>
      <div className=" h-full grid grid-cols-5 grid-rows-3 py-5 px-10 gap-10 relative">
        {branches &&
          branches
            ?.filter((branch) => {
              if (branchSearch === "") {
                return branch;
              } else if (
                branch.name.toLowerCase().includes(branchSearch.toLowerCase())
              ) {
                return branch;
              }
            })

            .map((branch) => (
              <div key={branch.id} className="border rounded-md p-4 ">
                <div className="flex flex-col gap-10 px-4 py-4  text-wrap relative">
                  <div className="flex justify-between items-center h-[70px]  ">
                    <h1 className="text-xl font-medium hover:underline">
                      {branch.name}
                    </h1>
                    <BranchKebab
                      orgAlias={props.orgAlias}
                      branchAlias={branch.branch_alias}
                    />
                  </div>

                  <div className="flex justify-end items-center border-t  p-2">
                    <button className="hover:underline">
                      <Link to={`branches/${branch.branch_alias}/departments/`}>
                        View
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

import { useQuery } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useParams } from "react-router-dom";
import { useState } from "react";
export const SpecificDeparmtent = () => {
  const { orgAlias } = useParams();
  const { branchAlias } = useParams();
  const axiosRequest = useAxiosRefreshRequest();

  const [deparmtentSearch, setDeparmentSearch] = useState<string>("");

  const { data: departments } = useQuery({
    queryKey: ["Department"],
    queryFn: async () =>
      await axiosRequest.get(
        `/organizations/${orgAlias}/branches/${branchAlias}/departments`
      ),
  });

  console.log(departments?.data);
  return (
    <>
      <div className="px-10  py-1 flex items-center ">
        <input
          className="w-[300px] border rounded px-4 py-1 "
          type="search"
          placeholder="Input Branch to search"
          onChange={(e) => setDeparmentSearch(e.target.value)}
        />
      </div>
      <div className=" h-full grid grid-cols-5 grid-rows-3 py-5 px-10 gap-10 relative">
        {departments?.data &&
          departments?.data
            ?.filter((department) => {
              if (deparmtentSearch === "") {
                return department;
              } else if (
                department.name
                  .toLowerCase()
                  .includes(deparmtentSearch.toLowerCase())
              ) {
                return department;
              }
            })

            .map((department) => (
              <div key={department.alias} className="border rounded-md p-4 ">
                <div className="flex flex-col gap-10 px-4 py-4  text-wrap relative">
                  <div className="flex justify-between items-center h-[70px]  ">
                    <h1 className="text-xl font-medium hover:underline">
                      {department.name}
                    </h1>
                  </div>

                  <div className="flex justify-end items-center border-t  p-2">
                    <button className="hover:underline"></button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

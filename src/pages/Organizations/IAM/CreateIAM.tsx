import { useQuery } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useState } from "react";

import { CheckBoxes } from "./CheckBoxes";

interface CreateIAMprops {
  orgAlias: string;
}

export const CreateIAM = (props: CreateIAMprops) => {
  const axiosRequest = useAxiosRefreshRequest();

  const [departments, setDepartments] = useState("");

  console.log(props.orgAlias);
  const { data: branch } = useQuery({
    queryKey: ["Branch"],
    queryFn: async () => {
      return await axiosRequest.get(
        `/organizations/${props.orgAlias}/branches`
      );
    },
  });

  const branches = branch?.data;

  let isMounted = true;
  const controller = new AbortController();

  const getDepartments = async (bAlias) => {
    try {
      const response = await axiosRequest.get(
        `/organizations/${props.orgAlias}/branches/${bAlias}/departments`,
        {
          signal: controller.signal,
        }
      );
      console.log(response.data);

      isMounted && setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const onHandleBranchChange = (e) => {
    getDepartments(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col justify-center  items-start">
        <div className="bg-red-100 flex flex-col">
          <input type="text" />
          <select onChange={onHandleBranchChange} name="" id="">
            <option value="">Select a Branch</option>
            {branches &&
              branches.map((branch) => (
                <option key={branch.id} value={branch.branch_alias}>
                  {branch.name}
                </option>
              ))}
          </select>
          <select name="" id="">
            <option value="">Select a Department</option>
            {departments
              ? departments.map((departments) => (
                  <option
                    className=" w-full"
                    value={departments.alias}
                    key={departments.id}
                  >
                    {departments.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        <h1>PERMISSIONS</h1>

        <div>
          <CheckBoxes title="Branch" />
        </div>

        <div>
          <CheckBoxes title="Deparment" />
        </div>
      </div>
    </>
  );
};

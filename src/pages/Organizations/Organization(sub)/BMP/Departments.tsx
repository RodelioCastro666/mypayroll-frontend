import { useState } from "react";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useQuery } from "@tanstack/react-query";
import { EditDepartment } from "../../OrganizationModal/EditDepartment";
interface IDeparment {
  orgAlias: string;
  branchAlias: string;
}

export const Departments = (props: IDeparment) => {
  const axiosRequest = useAxiosRefreshRequest();

  const [departmentSearch, setDepartmentSearch] = useState("");

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [branchAlias, setBranchAlias] = useState("");
  const [deptAlias, setDepartmentAlias] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const { data: deparments } = useQuery({
    queryKey: ["Departments"],
    queryFn: async () =>
      await axiosRequest.get(`organizations/${props.orgAlias}/departments`),
  });

  const openEditModal = (branchAlias) => {
    setIsOpenEditModal(true);
    setBranchAlias(branchAlias);
  };

  console.log(deparments?.data);

  return (
    <div className="">
      <div className="px-10  py-1 flex items-center ">
        <input
          className="w-[300px] border rounded px-4 py-1 "
          type="search"
          placeholder="Input Department to search"
          onChange={(e) => setDepartmentSearch(e.target.value)}
        />
      </div>
      <div className=" h-full grid grid-cols-5 grid-rows-3 py-5 px-10 gap-10 relative">
        {deparments?.data &&
          deparments.data
            ?.filter((deparment) => {
              if (departmentSearch === "") {
                return deparment;
              } else if (
                deparment.name
                  .toLowerCase()
                  .includes(departmentSearch.toLowerCase())
              ) {
                return deparment;
              }
            })

            .map((department) => (
              <div key={department.id} className="border rounded-md p-4 ">
                <div className="flex flex-col gap-10 px-4 py-4  text-wrap relative">
                  <div className="flex flex-col justify-between items-center h-[70px]  ">
                    <h1 className="text-xl font-medium hover:underline">
                      {department.name}
                    </h1>
                    <p className="text-xs">
                      Created Date: {department.updatedAt} <span></span>
                    </p>
                  </div>

                  <div className="flex justify-end items-center border-t  p-2">
                    <button
                      onClick={() => {
                        openEditModal(department.branch.branch_alias);
                        setDepartmentAlias(department.alias);
                        setDepartmentName(department.name);
                      }}
                      className="hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
        <EditDepartment
          isOpen={isOpenEditModal}
          closeModal={() => setIsOpenEditModal(false)}
          orgAlias={props.orgAlias}
          branchAlias={branchAlias}
          deptAlias={deptAlias}
          deptName={departmentName}
        />
      </div>
    </div>
  );
};

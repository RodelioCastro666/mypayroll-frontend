import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useOutletContext } from "react-router-dom";

export const ManageMember = () => {
  const axiosRequest = useAxiosRefreshRequest();

  // state that will hold the value of branch alias that will be used for request get department

  const [assignedBranch, setIsAssignbranch] = useState<string>("");
  const [count, setCount] = useState(0);
  const [assignedDepartment, setIsAssignDepartment] = useState<string>("");

  const [departments, setDepartments] = useState();

  const [isOpenDepartmentOption, setIsOpenDepartmentOption] =
    useState<boolean>(false);

  //crederntials for setting role

  const [roleId, setroleId] = useState<string>("");

  const [orgAlias, members, memberId, user, branch, deparment] =
    useOutletContext();

  const { data: branches } = useQuery({
    queryKey: ["Branches"],
    queryFn: async () => {
      return await axiosRequest.get(`/organizations/${orgAlias}/branches`);
    },
  });

  const getDepartment = async (assignBranch) => {
    try {
      const res = await axiosRequest.get(
        `/organizations/${orgAlias}/branches/${assignBranch}/departments`
      );

      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: roles } = useQuery({
    queryKey: ["Roles"],
    queryFn: async () => {
      return await axiosRequest.get(
        `/organizations/${orgAlias}/iam/roles?branch=${
          members.branch ? members.branch.branch_alias : ""
        }&department=${members.department ? members.department.alias : ""}`
      );
    },
  });

  const mutation = useMutation({
    mutationFn: async (credential) => {
      return await axiosRequest.post(
        `/organizations/${orgAlias}/iam/role`,
        credential
      );
    },
    onSuccess: () => {
      console.log("SUCCESSS");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const mutationSetBranch = useMutation({
    mutationFn: async (credential): Promise<IBranch> => {
      const response = await axiosRequest.post(
        `/organizations/${orgAlias}/members/branch`,
        credential
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Members"],
      });
      // toast.success("Successfully set");
    },
    // onError: () => {
    //   toast.error("Failed to set");
    // },
  });
  const mutationSetDepartment = useMutation({
    mutationFn: async (credential) => {
      const response = await axiosRequest.post(
        `/organizations/${orgAlias}/members/department`,
        credential
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Members"],
      });
      toast.success("Successfully set");
    },
    onError: () => {
      toast.error("Failed to set");
    },
  });

  const handleSelectedBranch = (e) => {
    setIsAssignbranch(e.target.value);
    getDepartment(e.target.value);
    setCount((prev) => prev + 1);
    setIsOpenDepartmentOption(true);
    console.log("LLLL");
  };

  const handleSelectedDepartment = (e) => {
    setIsAssignDepartment(e.target.value);
  };

  const onSetSubmit = () => {
    Promise.all([
      mutationSetBranch.mutate({
        id: user.id,
        branch: assignedBranch,
      }),
      mutationSetDepartment.mutate({
        id: user.id,
        branch: assignedBranch,
        department: assignedDepartment,
      }),
    ])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSetSubmitRole = () => {
    console.log("ROLE SUBMIT");
    console.log(memberId);
    console.log(roleId);

    mutation.mutate({
      memberId: memberId,
      roleId: roleId,
    });
  };

  const onhandleSelectedRole = (
    e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    setroleId(
      e.target.options[e.target.selectedIndex].getAttribute("data-key")
    );
  };

  return (
    <div className=" w-full h-full flex flex-col items-center gap-10 rounded-md p-2">
      {/* EMPLOYEE INFO */}
      <div className="border px-10 py-5 w-[80%] shadow-md flex flex-col gap-2 rounded">
        <h1 className="text-3xl border-b p-2">Employee Information</h1>
        {/* <div className="flex flex-col gap-4">
          <CgProfile className="w-[100px] h-[100px]" />
          <p>Employee Id : 090909</p>
          <span>status</span>
        </div> */}
        <div className=" grid grid-cols-3 grid-rows-5 gap-2">
          <div className="flex flex-col text-xs">
            <label htmlFor="">FirstName</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">MiddleName</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">LastName</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">BirthDate</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <p>Sex</p>
            <div className="flex justify-start items-center  gap-2">
              <label htmlFor="">Male</label>
              <input name="sex" className="" type="radio" />
              <label htmlFor="">Female</label>
              <input name="sex" className="" type="radio" />
            </div>
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Contact No.</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Email Address</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">House/Building No. and Street Name</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Barangay/Subdivision</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">City/Municipality</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Province</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Postal Code</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Commencement Date</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Department</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Position</label>
            <input className="" type="text" />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Basic Salary(Monthly)</label>
            <input className="" type="text" />
          </div>
        </div>
        <div className="mt-4  flex justify-end gap-4">
          <button
            type="button"
            className="inline-flex  rounded-md border   px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            // onClick={props.closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex  rounded-md border   px-4 py-2 text-sm font-medium text-blue-900"
            // onClick={seTMembersBranch}
          >
            Save
          </button>
        </div>
      </div>
      {/* SET EMPLOYEE BRANCH AND DEPARTMENT */}
      <div className="border px-10 py-5 w-[80%] rounded">
        <p className="text-3xl">Set Branch and Department</p>
        <div className="mt-2  grid grid-cols-3 gap-2">
          <select
            name="branches"
            id=""
            className="text-xs"
            onChange={handleSelectedBranch}
          >
            <option value="">Select a branch</option>

            {branches &&
              branches.data.map((branch) => (
                <option
                  className=" w-full"
                  value={branch.branch_alias}
                  key={branch.id}
                >
                  {branch.name}
                </option>
              ))}
          </select>

          {isOpenDepartmentOption ? (
            <select
              name="branches"
              id=""
              className="text-xs"
              onChange={handleSelectedDepartment}
            >
              <option value="df">Select a department</option>
              {departments &&
                departments.map((department) => (
                  <option
                    className=" w-full"
                    value={department.alias}
                    key={department.id}
                  >
                    {department.name}
                  </option>
                ))}
            </select>
          ) : (
            <p className="text-center">Select a Branch First</p>
          )}
        </div>
        <div className="mt-4  flex justify-end gap-4">
          <button
            type="button"
            className="inline-flex  rounded-md border   px-4 py-2 text-sm font-medium text-blue-900"
            onClick={onSetSubmit}
          >
            Save
          </button>
        </div>
      </div>

      <div className="border px-10 py-5 w-[80%] rounded">
        <p>Set Role</p>
        <div className="mt-2  grid grid-cols-3 gap-2">
          <select onChange={onhandleSelectedRole} name="" id="">
            <option value="">Select Role</option>
            {roles &&
              roles.data.map((role) => (
                <option data-key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>
        <div className=" flex justify-end">
          <button
            onClick={onSetSubmitRole}
            className="inline-flex  rounded-md border   px-4 py-2 text-sm font-medium text-blue-900"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

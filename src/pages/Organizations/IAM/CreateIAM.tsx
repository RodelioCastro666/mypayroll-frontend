import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useState } from "react";
import { CheckBox } from "./CheckBox";
import { toast } from "sonner";

interface CreateIAMprops {
  orgAlias: string;
}

export const CreateIAM = (props: CreateIAMprops) => {
  const listOptions = ["Create", "Read", "Update", "Delete"];

  const [owner, setOwner] = useState("");
  const [branchId, setBranchId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [selectedBranch, setSelectedBranch] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);

  const [selectedParamBranch, setselectedParamBranch] = useState([]);
  const [selectedParamDeparment, setselectedParamDepartment] = useState([]);

  const [totalCheckParam, setTotalCheckParam] = useState([]);

  const handleSelectBranch = (value, name) => {
    if (value) {
      setSelectedBranch([...selectedBranch, name]);
      setselectedParamBranch([
        ...selectedParamBranch,
        { action: name.toLowerCase(), subject: "branch" },
      ]);
    } else {
      setSelectedBranch(selectedBranch.filter((item) => item !== name));
      setselectedParamBranch(
        selectedParamBranch.filter((item) => item.action !== name.toLowerCase())
      );
    }
  };

  const handleSelectDepartment = (value, name) => {
    if (value) {
      setSelectedDepartment([...selectedDepartment, name]);
      setselectedParamDepartment([
        ...selectedParamDeparment,
        { action: name.toLowerCase(), subject: "department" },
      ]);
    } else {
      setSelectedDepartment(selectedDepartment.filter((item) => item !== name));
      setselectedParamDepartment(
        selectedParamDeparment.filter(
          (item) => item.action !== name.toLowerCase()
        )
      );
    }
  };

  function selectAllbranch(value) {
    if (value) {
      // if true
      setselectedParamBranch([]);
      setSelectedBranch(listOptions); // select all
      listOptions.map((list) => {
        setselectedParamBranch((prev) => [
          ...prev,
          { action: list.toLowerCase(), subject: "branch" },
        ]);
        console.log(list);
      });

      console.log(selectedParamBranch);
    } else {
      // if false
      setSelectedBranch([]); // unselect all
      setselectedParamBranch([]);
    }
  }
  function selectAllDepartment(value) {
    if (value) {
      // if true
      setselectedParamDepartment([]);
      setSelectedDepartment(listOptions); // select all
      listOptions.map((list) => {
        setselectedParamDepartment((prev) => [
          ...prev,
          { action: list.toLowerCase(), subject: "department" },
        ]);
        console.log(list);
      });

      console.log(selectedParamDeparment);
    } else {
      // if false
      setSelectedDepartment([]); // unselect all
      setselectedParamDepartment([]);
    }
  }

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
  console.log(branches);
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

  const onHandleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBranchId(
      e.target.options[e.target.selectedIndex].getAttribute("data-key")
    );

    getDepartments(e.target.value);
  };

  const onHandleDeaprtmentChange = (
    e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    setDepartmentId(
      e.target.options[e.target.selectedIndex].getAttribute("data-key")
    );
  };

  const mutation = useMutation({
    mutationFn: async (credential) => {
      return await axiosRequest.post(
        `/organizations/${props.orgAlias}/iam`,
        credential
      );
    },
    onSuccess: () => {
      console.log("SUCCESS");
      toast.success("Successfully created");
    },
  });

  const onHandleSubmit = () => {
    // console.log(selectedParamBranch);
    // console.log(selectedParamDeparment);

    // console.log(
    //   owner,
    //   branchId,
    //   departmentId,
    //   selectedParamBranch,
    //   selectedParamDeparment
    // );

    setTotalCheckParam([...selectedParamBranch, ...selectedParamDeparment]);
    // console.log(totalCheckParam);

    mutation.mutate({
      name: owner,
      branchId: branchId,
      departmentId: departmentId,
      permissions: totalCheckParam,
    });
  };

  return (
    <div className=" ">
      <div className="flex flex-col justify-center">
        <div className=" flex flex-col items-center gap-5">
          <div className="p-5">
            <input
              className="px-5 py-1 border rounded"
              onChange={(e) => setOwner(e.target.value)}
              type="text"
              placeholder="input role...."
            />
          </div>

          <div className=" p-5 flex gap-10">
            <select
              className="px-10 py-2 border rounded"
              onChange={onHandleBranchChange}
            >
              <option value="" key="">
                Select a Branch
              </option>
              {branches &&
                branches.map((branch) => (
                  <option
                    data-key={branch.id}
                    key={branch.id}
                    value={branch.branch_alias}
                  >
                    {branch.name}
                  </option>
                ))}
            </select>
            <select
              className="px-10 py-2 border rounded"
              onChange={onHandleDeaprtmentChange}
              name=""
              id=""
            >
              <option value="">Select a Department</option>
              {departments
                ? departments.map((departments) => (
                    <option
                      data-key={departments.id}
                      className=" w-full"
                      value={departments.id}
                      key={departments.id}
                    >
                      {departments.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <h1 className="text-xl">PERMISSIONS</h1>
          <div className="flex justify-around  w-[50%]">
            <span className="text-lg">Branch</span>{" "}
            <span className="text-lg">Department</span>
          </div>
          <div className="flex justify-around  w-[50%]">
            <div>
              <CheckBox
                name="all"
                value={selectedBranch.length === listOptions.length}
                updateValue={selectAllbranch}
              >
                Manage
              </CheckBox>
              {listOptions.map((list) => {
                return (
                  <CheckBox
                    value={selectedBranch.map((sel) => sel).includes(list)}
                    name={list}
                    updateValue={handleSelectBranch}
                  >
                    {list}
                  </CheckBox>
                );
              })}
            </div>
            <div>
              <CheckBox
                name="all"
                value={selectedDepartment.length === listOptions.length}
                updateValue={selectAllDepartment}
              >
                Manage
              </CheckBox>
              {listOptions.map((list) => {
                return (
                  <CheckBox
                    value={selectedDepartment.map((sel) => sel).includes(list)}
                    name={list}
                    updateValue={handleSelectDepartment}
                  >
                    {list}
                  </CheckBox>
                );
              })}
            </div>
          </div>

          <button onClick={onHandleSubmit} className="border px-5 py-2 rounded">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

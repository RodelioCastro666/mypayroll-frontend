import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useId, useState } from "react";
import { CheckBoxes } from "./CheckBoxes";
import { toast } from "sonner";
import { Action, Subject, actions, subjects } from ".";

interface CreateIAMprops {
  orgAlias: string;
  onClose: void;
}
interface IPermission {
  subject: string;
  action: string;
}

export const CreateIAM = (props: CreateIAMprops) => {
  const [owner, setOwner] = useState("");
  const [branchId, setBranchId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const id = useId();

  const [permissions, setPermissions] = useState<IPermission[]>([]);

  const [disabled, setDisabled] = useState([]);

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      queryClient.invalidateQueries({ queryKey: ["Members"] });
    },
  });

  const handleCheckBox = (e) => {
    const { name, value, checked } = e.target;
    console.log(name + "-" + value);

    if (value === "manage" && name === "branch") {
      console.log("JJJJJJJ");
      setPermissions([]);
      setPermissions([{ action: "manage", subject: name }]);
      setDisabled([...disabled, name]);
      setDisableBranchCheck(true);
    } else if (value === "manage" && name === "department") {
      console.log("JJJJJJJ");
      setPermissions([]);
      setPermissions([{ action: "manage", subject: name }]);
      setDisabled([...disabled, name]);
      setDisableDepartmentCheck(true);
    }

    if (checked) {
      setPermissions([...permissions, { action: value, subject: name }]);
    } else {
      setPermissions(
        permissions.filter(
          (permission) =>
            permission.action !== value || permission.subject !== name
        )
      );
      if (value === "manage" && name === "branch") {
        setDisabled([]);
      } else if (value === "manage" && name === "department") {
        setDisabled([]);
      }

      permissions.forEach((permission) => {
        console.log(permission.action === value);
      });
    }
    console.log(permissions);
  };

  const onHandleSubmit = () => {
    console.log("owner", owner);
    console.log("branchId", branchId);
    console.log("departmentId", departmentId);

    mutation.mutate({
      name: owner,
      branchId: branchId ? branchId : null,
      departmentId: departmentId ? departmentId : null,
      permissions: permissions,
    });
  };

  return (
    <div className=" ">
      {/* <button className="my-custom-style" onClick={props.onClose}>
        back
      </button> */}
      <button
        onClick={props.onClose}
        type="button"
        class="text-black   focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2   ml-5"
      >
        <svg
          class="w-5 h-5 rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span class="sr-only">Icon description</span>
      </button>
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
              className="px-10 py-2 border rounded "
              onChange={onHandleBranchChange}
            >
              <option value={null} key="">
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
              className="px-8 py-2 border rounded "
              onChange={onHandleDeaprtmentChange}
              name=""
              id=""
            >
              <option value={null}>Select a Department</option>
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
          <h1 className="text-xl">PERMISSION</h1>

          <div className="flex justify-around bg-red-200  w-[50%]"></div>

          <div className="flex w-[50%] justify-around ">
            {subjects.map((subject, index) => (
              <div className="mb-5" key={`${id}_${index}`}>
                <h1 className="mb-5 text-lg">{subject.toLocaleUpperCase()}</h1>
                {actions.map((action, index) => (
                  <div key={`${id}_${index}`}>
                    <input
                      id={id}
                      disabled={
                        disabled.includes(subject) && action !== "manage"
                      }
                      type="checkbox"
                      name={subject}
                      value={action}
                      onChange={handleCheckBox}
                      checked={permissions.some(
                        (permission) =>
                          permission.action === action &&
                          permission.subject == subject
                      )}
                    />
                    <label htmlFor={id}>{action}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* <div>
            {permissions.map((permission, index) => (
              <div key={index}>
                {permission.subject} - {permission.action}
              </div>
            ))}
          </div> */}

          <button onClick={onHandleSubmit} class="my-custom-style">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

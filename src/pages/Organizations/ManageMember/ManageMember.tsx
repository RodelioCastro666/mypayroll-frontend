import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const ManageMember = () => {
  const axiosRequest = useAxiosRefreshRequest();

  // state that will hold the value of branch alias that will be used for request get department

  const [assignedBranch, setIsAssignbranch] = useState<string>("");
  const [count, setCount] = useState(0);
  const [assignedDepartment, setIsAssignDepartment] = useState<string>("");

  const [departments, setDepartments] = useState();

  const [isOpenDepartmentOption, setIsOpenDepartmentOption] =
    useState<boolean>(false);

  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [sex, setSex] = useState("");
  const [nationality, setNationality] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");

  const [credentials, setCredentials] = useState([]);

  //crederntials for setting role

  const [roleId, setroleId] = useState<string>("");

  const [orgAlias, members, memberId, user, branch, deparment] =
    useOutletContext();

  const [roles, setRoles] = useState();

  const { data: branches } = useQuery({
    queryKey: ["Branches"],
    queryFn: async () => {
      return await axiosRequest.get(`/organizations/${orgAlias}/branches`);
    },
  });

  console.log("USER", members);

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

  useEffect(() => {
    const getRoles = async () => {
      const response = await axiosRequest.get(
        `/organizations/${orgAlias}/iam/roles?branch=${
          members.branch ? members.branch.branch_alias : ""
        }&department=${members.department ? members.department.alias : ""}`
      );

      setRoles(response.data);
    };

    getRoles();
  }, [members]);

  console.log("====================================");
  console.log(roles);
  console.log("====================================");

  // const { data: roles, isSuccess } = useQuery({
  //   queryKey: ["Roles"],
  //   queryFn: async () => {
  //     return await axiosRequest.get(
  //       `/organizations/${orgAlias}/iam/roles?branch=${
  //         members.branch ? members.branch.branch_alias : ""
  //       }&department=${members.department ? members.department.alias : ""}`
  //     );
  //   },
  //   refetchOnWindowFocus: false,
  // });

  // if (isSuccess) {
  //   console.log("Fetch ROLEs");
  //   window.location.reload(false);
  // }

  const mutation = useMutation({
    mutationFn: async (credential) => {
      return await axiosRequest.post(
        `/organizations/${orgAlias}/iam/role`,
        credential
      );
    },
    onSuccess: () => {
      console.log("SUCCESSS");
      toast.success("Success");
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
      queryClient.invalidateQueries({
        queryKey: ["Roles"],
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
        queryKey: ["Roles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["Members"],
      });
      toast.success("Successfully set");
    },
  });

  const handleSelectedBranch = (e) => {
    setIsAssignbranch(e.target.value);
    getDepartment(e.target.value);
    setCount((prev) => prev + 1);

    console.log("LLLL");
  };

  const handleSelectedDepartment = (e) => {
    setIsAssignDepartment(e.target.value);
  };

  const onSetSubmit = () => {
    Promise.all([
      mutationSetDepartment.mutate({
        id: user.id,
        branch: assignedBranch,
        department: assignedDepartment,
      }),
      mutationSetBranch.mutate({
        id: user.id,
        branch: assignedBranch,
      }),
    ]).then((response) => {
      console.log(response);
      toast.success("Successfully Set");
    });
  };

  const onSetSubmitRole = () => {
    console.log("ROLE SUBMIT");
    // console.log(user.id);
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

  const handleSaveUserInfo = () => {
    console.log(firstName);
    console.log(lasttName);
    console.log(middleName);
    console.log(suffix);
    console.log(sex);
    console.log(address);
    console.log(nationality);
    console.log(civilStatus);

    console.log(credentials);
  };

  return (
    <div className=" w-full h-full flex flex-col items-center gap-5 rounded-md p-2">
      {/* EMPLOYEE INFO */}
      <div className="flex  w-full">
        <Link to={`/organizations/${orgAlias}/members`}>
          <button
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
          </button>
        </Link>
      </div>

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
            <input
              defaultValue={members && members.firstName}
              onChange={(e) => {
                set([...credentials, e.target.value]);
                setFirstName(e.target.value);
              }}
              className=""
              type="text"
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">MiddleName</label>
            <input
              defaultValue={members && members.middleName}
              onChange={(e) => {
                set([...credentials, e.target.value]);
                setMiddleName(e.target.value);
              }}
              className=""
              type="text"
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="">LastName</label>
            <input
              defaultValue={members && members.lastName}
              onChange={(e) => {
                set([...credentials, e.target.value]);
                setLastName(e.target.value);
              }}
              className=""
              type="text"
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="">Suffix</label>
            <input
              defaultValue={members && members.suffix}
              onChange={(e) => {
                set([...credentials, e.target.value]);
                setSuffix(e.target.value);
              }}
              className=""
              type="text"
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">BirthDate</label>
            <input
              defaultValue={members && members.birthDate}
              onChange={(e) => {
                set([...credentials, e.target.value]);
                setBirthDay(e.target.value);
              }}
              type="date"
              className=""
            />
          </div>
          <div className="flex flex-col text-xs">
            <p>Sex</p>
            <div className="flex justify-start items-center  gap-2">
              <label htmlFor="">Male</label>
              <input
                onChange={() => {
                  set([...credentials, e.target.value]);
                  setSex("male");
                }}
                checked={sex === "male"}
                name="sex"
                className=""
                type="radio"
              />
              <label htmlFor="">Female</label>
              <input
                onChange={() => {
                  set([...credentials, e.target.value]);
                  setSex("female");
                }}
                checked={sex === "female"}
                name="sex"
                className=""
                type="radio"
              />
            </div>
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Nationality</label>
            <input
              defaultValue={members && members.natinality}
              onChange={(e) => {
                set([...credentials, e.target.value]);
                setNationality(e.target.value);
              }}
              className=""
              type="text"
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="">Civil Status</label>
            <input
              defaultValue={members && members.civilStatus}
              onChange={(e) => {
                setCivilStatus(e.target.value);
                set([...credentials, e.target.value]);
              }}
              className=""
              type="text"
            />
          </div>

          {/* <div className="flex flex-col text-xs">
            <label htmlFor="">Email Address</label>
            <input className="" type="text" />
          </div> */}
          <div className="flex flex-col text-xs">
            <label htmlFor="">House/Building No. and Street Name</label>
            <input
              defaultValue={members && members.address}
              onChange={(e) => {
                setAddress(e.target.value);
                set([...credentials, e.target.value]);
              }}
              className=""
              type="text"
            />
          </div>
          {/* <div className="flex flex-col text-xs">
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
          </div> */}
          <div className="flex flex-col text-xs">
            <label htmlFor="">Basic Salary(Monthly)</label>
            <input
              defaultValue={members && members.salary}
              className=""
              type="text"
            />
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
            onClick={handleSaveUserInfo}
          >
            Save
          </button>
        </div>
      </div>
      {/* SET EMPLOYEE BRANCH AND DEPARTMENT */}
      <div className="border px-10 py-5 w-[80%] rounded">
        <p className="text-3xl">Set Branch and Department</p>
        <div className="mt-2  flex gap-5">
          <div className="flex flex-col gap-2 ">
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
            <div>
              <input
                onClick={() => setIsOpenDepartmentOption((prev) => !prev)}
                className="inline-block mr-2"
                type="checkbox"
              />
              <label htmlFor="">Select a Department</label>
            </div>
          </div>

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
          ) : null}
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
            <option id="1" value="">
              Select Role
            </option>
            {roles &&
              roles.map((role) => (
                <option id={role.id} data-key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>

        <button onClick={() => console.log(roleId)}>KKK</button>
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

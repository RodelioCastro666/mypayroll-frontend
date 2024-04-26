import { useEffect } from "react";

import { useAuth } from "../../../../auth/AuthProvider";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";

interface IDeparment {
  orgAlias: string;
  branchAlias: string;
}

export const Departments = (props: IDeparment) => {
  const axiosRequest = useAxiosRefreshRequest();

  const { setDepartment, departments } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getDepartments = async () => {
      try {
        const response = await axiosRequest.get(
          `organizations/${props.orgAlias}/branches/${props.branchAlias}/departments`,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);

        isMounted && setDepartment(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 relative">
      {departments
        ? departments.map((department) => (
            <div key={department.id} className="border rounded-md p-4 ">
              <div className="flex flex-col gap-10 px-4 py-4  text-wrap relative">
                <div className="flex justify-between items-center h-[70px]  ">
                  <h1 className="text-xl font-medium hover:underline">
                    {department.name}
                  </h1>
                </div>

                <div className="flex justify-end items-center border-t  p-2">
                  <button className="hover:underline">
                    {/* <Link to={`branches/${branch.alias}/departments/`}>
                      View
                    </Link> */}
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

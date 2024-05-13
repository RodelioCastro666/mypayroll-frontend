import { useState } from "react";
import { CreateIAM } from "./CreateIAM";
import { useQuery } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
interface IAMprops {
  orgAlias: string;
}

export const IAM = (props: IAMprops) => {
  // const axiosRequest = useAxiosRefreshRequest();

  // //change the Ui from dipslaying IAM to creating IAM
  const [isOpenRoleLayout, setIsOpenRoleLayout] = useState(true);
  const [isOpenCreateLayout, setIsOpenCreateLayout] = useState(false);

  const axiosRequest = useAxiosRefreshRequest();
  const [roleSearch, setRoleSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["IAM"],
    queryFn: async () => {
      return await axiosRequest.get(`/organizations/${props.orgAlias}/iam`);
    },
  });

  const openCreateLayout = () => {
    setIsOpenRoleLayout(false);
  };
  const openCloseLayout = () => {
    setIsOpenRoleLayout(true);
  };

  const IAM = data?.data;
  return (
    <>
      {isOpenRoleLayout ? (
        <section className="p-4">
          <div className="flex items-center justify-between  py-1 ">
            <input
              className="w-[300px] border rounded px-4 py-1"
              type="search"
              placeholder="Input Role to search"
              onChange={(e) => setRoleSearch(e.target.value)}
            />

            <button
              onClick={() => openCreateLayout()}
              className="my-custom-style"
            >
              + ROLE
            </button>
          </div>
          <table className="table-auto w-full text-start">
            <thead>
              <tr>
                <th>Role</th>
                <th>Organization</th>
                <th>Branch</th>
                <th>Department</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {IAM &&
                IAM.filter((role) => {
                  if (roleSearch === "") {
                    return role;
                  } else if (
                    role.name.toLowerCase().includes(roleSearch.toLowerCase())
                  ) {
                    return role;
                  }
                }).map((role) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>{role.organization.name}</td>
                    <td>{role.branch ? role.branch.name : "-----"}</td>
                    <td>{role.deparment ? role.department.name : "-----"}</td>
                    <td>Modify</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ) : (
        <CreateIAM orgAlias={props.orgAlias} onClose={openCloseLayout} />
      )}
    </>

    // <CreateIAM orgAlias={props.orgAlias} />
  );
};

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
  // const [isOpenCreateLayout, setIsOpenCreateLayout] = useState("");

  console.log(props.orgAlias);
  return (
    // <section className="p-4">
    //   <div className="flex items-center justify-between  py-1 ">
    //     <input
    //       className="w-[300px] border rounded px-4 py-1"
    //       type="search"
    //       placeholder="Input Name to search"
    //       onChange={(e) => setMemberSearch(e.target.value)}
    //     />

    //     <button className="border rounded px-5 py-1 hover:shadow-md ">
    //       ADD IAM
    //     </button>
    //   </div>
    //   <table className="table-auto w-full text-start">
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Organization</th>
    //         <th>Branch</th>
    //         <th>Department</th>
    //         <th>Date Created</th>
    //         <th>Permissions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </section>
    <CreateIAM orgAlias={props.orgAlias} />
  );
};

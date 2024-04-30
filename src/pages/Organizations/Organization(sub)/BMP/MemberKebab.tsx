import { useState } from "react";
import kebab from "../../../../Assets/icons8-menu-vertical-64.png";
import { useAuth } from "../../../../auth/AuthProvider";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useEffect } from "react";

import { SetBranch } from "../../OrganizationModal/SetBranch";
interface MemberKebabProps {
  userEmail: string;
  orgAlias: string;
}
export const MemberKebab = (props: MemberKebabProps) => {
  const [kebabIsOpen, setKebabIsopen] = useState(false);
  //

  const [isOpenSetBranchModal, setIsOpenBranchModal] = useState(false);

  const closeModalSetBranch = () => {
    setIsOpenBranchModal(false);
  };

  return (
    <>
      <img
        onClick={() => {
          setKebabIsopen((prev) => !prev);
        }}
        className="w-[20px] cursor-pointer absolute top-[10] right-1"
        src={kebab}
        alt=""
      />

      {kebabIsOpen && (
        <div className="absolute flex flex-col gap-3 rounded bg-white  px-4 py-4  top-14 right-2 border  h-auto  ">
          <button
            onClick={() => setIsOpenBranchModal(true)}
            className="px-2 border py-2  text-xs rounded"
          >
            Manage Member
          </button>
        </div>
      )}

      {/* // <form className="absolute top-12 right-3" action="">
        //   <select
        //     className=" px-4 py-2 "
        //     value={assignBranch}
        //     onChange={handleChangeBranch}
        //     name="branches"
        //     id=""
        //   >
        //     <option value="select">Select a Branch</option>
        //     {branches &&
        //       branches.map((branch) => (
        //         <option value={branch.alias} key={branch.id}>
        //           {branch.name}
        //         </option>
        //       ))}
        //   </select>
        // </form> */}

      <SetBranch
        isOpen={isOpenSetBranchModal}
        closeModal={closeModalSetBranch}
        orgAlias={props.orgAlias}
        userEmail={props.userEmail}
      />
    </>
  );
};

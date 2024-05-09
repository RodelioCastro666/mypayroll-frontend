import { useState } from "react";
import kebab from "../../../../Assets/icons8-menu-vertical-64.png";

import { SetBranchDept } from "../../OrganizationModal/SetBranch&Dept";
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
    <div>
      <img
        onClick={() => {
          setKebabIsopen((prev) => !prev);
        }}
        className="w-[20px] cursor-pointer absolute top-[10] right-14"
        src={kebab}
        alt=""
      />

      {kebabIsOpen && (
        <div className=" flex justify-center absolute gap-5 rounded bg-white  px-10 py-2   top-2 right-20 border  h-auto  ">
          <button
            onClick={() => setIsOpenBranchModal(true)}
            className="px-10 border py-1   rounded"
          >
            Manage
          </button>
          <button
            onClick={() => setIsOpenBranchModal(true)}
            className="px-10 border py-1   rounded"
          >
            Dummy
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

      <SetBranchDept
        isOpen={isOpenSetBranchModal}
        closeModal={closeModalSetBranch}
        orgAlias={props.orgAlias}
        userEmail={props.userEmail}
      />
    </div>
  );
};

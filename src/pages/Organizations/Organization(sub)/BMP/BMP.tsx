import { useState } from "react";
import { useParams } from "react-router-dom";

import { Branches } from "./Branches";
import { Members } from "./Members";
import { Pending } from "./Pending";

import { CreateMember } from "../../OrganizationModal/CreateMember";
import CreateBranch from "../../OrganizationModal/CreateBranch";

export const BMP = () => {
  const { orgAlias } = useParams();

  const [branchHighLight, setBranchHighLight] = useState(true);
  const [memberHighLight, setMembertHighLight] = useState(false);
  const [pendingHighLight, setPendingHighLight] = useState(false);

  const [createMemberModal, setCreateMemberModal] = useState(false);
  const [isOpenCreateBranchModal, setIsOpenCreateMOdal] = useState(false);

  const creaBranchModalClose = () => {
    setIsOpenCreateMOdal(false);
  };

  const branchFlip = () => {
    if (branchHighLight) {
      null;
    } else {
      setBranchHighLight((prev) => !prev);
      setMembertHighLight(false);
      setPendingHighLight(false);
    }
  };
  const memberFlip = () => {
    if (memberHighLight) {
      null;
    } else {
      setMembertHighLight((prev) => !prev);
      setBranchHighLight(false);
      setPendingHighLight(false);
    }
  };
  const pendingFlip = () => {
    if (pendingHighLight) {
      null;
    } else {
      setPendingHighLight((prev) => !prev);
      setBranchHighLight(false);
      setMembertHighLight(false);
    }
  };
  return (
    <div className="grid grid-rows-[50px_1fr]">
      <nav>
        <div className=" px-4  border-b-[1px] flex justify-between gap-3">
          <div className="flex  gap-5 relative">
            {branchHighLight ? (
              <button
                onClick={branchFlip}
                className=" px-8 border-b-4 border-blue-600 rounded-b"
              >
                Branch
              </button>
            ) : (
              <button onClick={branchFlip} className=" px-8 rounded-b">
                Branch
              </button>
            )}

            {memberHighLight ? (
              <button
                onClick={memberFlip}
                className=" px-8 border-b-4 border-blue-600 rounded-b"
              >
                Members
              </button>
            ) : (
              <button onClick={memberFlip} className=" px-8  rounded-b">
                Members
              </button>
            )}
            {pendingHighLight ? (
              <button
                onClick={pendingFlip}
                className=" px-8 border-b-4 border-blue-600 rounded-b"
              >
                Pending
              </button>
            ) : (
              <button onClick={pendingFlip} className=" px-8  rounded-b">
                Pending
              </button>
            )}
          </div>
          <div className="flex  px-2 py-1 gap-5">
            {memberHighLight && (
              <button
                onClick={() => setCreateMemberModal((prev) => !prev)}
                className=" border rounded px-10 py-1 hover:shadow-md "
              >
                Create
              </button>
            )}

            {branchHighLight && (
              <button
                onClick={() => setIsOpenCreateMOdal(true)}
                className=" border rounded px-10 py-1 hover:shadow-md "
              >
                Create
              </button>
            )}

            <button className="  rounded px-10 py-1  hover:shadow-md text-white">
              Join
            </button>
          </div>
        </div>
      </nav>
      <section>
        {
          <CreateBranch
            isOpen={isOpenCreateBranchModal}
            closeModal={creaBranchModalClose}
            orgAlias={orgAlias}
          />
        }
        {branchHighLight && <Branches orgAlias={orgAlias} />}
        {memberHighLight && <Members orgAlias={orgAlias} />}
        {pendingHighLight && <Pending orgAlias={orgAlias} />}
      </section>
      {createMemberModal && <CreateMember orgAlias={orgAlias} />}
    </div>
  );
};

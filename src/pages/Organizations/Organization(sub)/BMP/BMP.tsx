import { useState } from "react";
import { useParams } from "react-router-dom";

import { Branches } from "./Branches";
import { Members } from "./Members";
import { Pending } from "./Pending";
import { Departments } from "./Departments";
import { CreateMember } from "../../OrganizationModal/CreateMember";
import CreateBranch from "../../OrganizationModal/CreateBranch";
import CreateDepartment from "../../OrganizationModal/CreateDepartment";
import { IAM } from "../../IAM/IAM";

export const BMP = () => {
  const { orgAlias } = useParams();

  const [branchHighLight, setBranchHighLight] = useState(true);
  const [memberHighLight, setMembertHighLight] = useState(false);
  const [pendingHighLight, setPendingHighLight] = useState(false);
  const [departmentHighLight, setDepartmentHighLight] = useState(false);
  const [iAmHighLight, setIAMHighLight] = useState(false);

  const [createMemberModal, setCreateMemberModal] = useState(false);
  const [isOpenCreateBranchModal, setIsOpenCreateMOdal] = useState(false);
  const [isOpenCreateDepartmentModal, setIsOpenCreateDeparmtentModal] =
    useState(false);

  const creaBranchModalClose = () => {
    setIsOpenCreateMOdal(false);
  };
  const creaDepartmentModalClose = () => {
    setIsOpenCreateDeparmtentModal(false);
  };

  const branchFlip = () => {
    if (branchHighLight) {
      null;
    } else {
      setBranchHighLight((prev) => !prev);
      setMembertHighLight(false);
      setPendingHighLight(false);
      setDepartmentHighLight(false);
      setIAMHighLight(false);
    }
  };
  const memberFlip = () => {
    if (memberHighLight) {
      null;
    } else {
      setMembertHighLight((prev) => !prev);
      setBranchHighLight(false);
      setPendingHighLight(false);
      setDepartmentHighLight(false);
      setIAMHighLight(false);
    }
  };
  const pendingFlip = () => {
    if (pendingHighLight) {
      null;
    } else {
      setPendingHighLight((prev) => !prev);
      setBranchHighLight(false);
      setMembertHighLight(false);
      setDepartmentHighLight(false);
      setIAMHighLight(false);
    }
  };
  const departmentFlip = () => {
    if (departmentHighLight) {
      null;
    } else {
      setDepartmentHighLight((prev) => !prev);
      setPendingHighLight(false);
      setBranchHighLight(false);
      setMembertHighLight(false);
      setIAMHighLight(false);
    }
  };
  const iAMflip = () => {
    if (iAmHighLight) {
      null;
    } else {
      setIAMHighLight((prev) => !prev);
      setDepartmentHighLight(false);
      setPendingHighLight(false);
      setBranchHighLight(false);
      setMembertHighLight(false);
    }
  };
  return (
    <div className="grid grid-rows-[50px_1fr] ">
      <nav className="">
        <div className=" px-4   border-b-[1px] flex justify-between gap-3">
          <div className="flex  gap-5 relative">
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
            {departmentHighLight ? (
              <button
                onClick={departmentFlip}
                className=" px-8 border-b-4 border-blue-600 rounded-b"
              >
                Department
              </button>
            ) : (
              <button onClick={departmentFlip} className=" px-8  rounded-b">
                Department
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
            {iAmHighLight ? (
              <button
                onClick={iAMflip}
                className=" px-8 border-b-4 border-blue-600 rounded-b"
              >
                IAM
              </button>
            ) : (
              <button onClick={iAMflip} className=" px-8  rounded-b">
                IAM
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
            {departmentHighLight && (
              <button
                onClick={() => setIsOpenCreateDeparmtentModal(true)}
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
      <section className="">
        {
          <CreateBranch
            isOpen={isOpenCreateBranchModal}
            closeModal={creaBranchModalClose}
            orgAlias={orgAlias}
          />
        }
        {
          <CreateDepartment
            isOpen={isOpenCreateDepartmentModal}
            closeModal={creaDepartmentModalClose}
            orgAlias={orgAlias}
          />
        }
        {departmentHighLight && <Departments orgAlias={orgAlias} />}
        {branchHighLight && <Branches orgAlias={orgAlias} />}
        {memberHighLight && <Members orgAlias={orgAlias} />}
        {pendingHighLight && <Pending orgAlias={orgAlias} />}
        {iAmHighLight && <IAM orgAlias={orgAlias} />}
      </section>
      {createMemberModal && <CreateMember orgAlias={orgAlias} />}
    </div>
  );
};

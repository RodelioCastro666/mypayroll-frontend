import { useState } from "react";
import { Departments } from "./Departments";
import { useParams } from "react-router-dom";
import CreateDepartment from "../../OrganizationModal/CreateDepartment";
export const DMP = () => {
  const [departmentHighLight, setDepartmentHighLight] = useState(true);
  const [memberHighLight, setMembertHighLight] = useState(false);
  const [pendingHighLight, setPendingHighLight] = useState(false);

  const { orgAlias } = useParams();
  const { branchAlias } = useParams();

  //   const [createMemberModal, setCreateMemberModal] = useState(false);
  const [isOpenCreateDeparmentModal, setIsOpenCreateDepartmentMOdal] =
    useState(false);

  const creaDepartmentModalClose = () => {
    setIsOpenCreateDepartmentMOdal(false);
  };

  const branchFlip = () => {
    if (departmentHighLight) {
      null;
    } else {
      setDepartmentHighLight((prev) => !prev);
      setMembertHighLight(false);
      setPendingHighLight(false);
    }
  };
  const memberFlip = () => {
    if (memberHighLight) {
      null;
    } else {
      setMembertHighLight((prev) => !prev);
      setDepartmentHighLight(false);
      setPendingHighLight(false);
    }
  };
  const pendingFlip = () => {
    if (pendingHighLight) {
      null;
    } else {
      setPendingHighLight((prev) => !prev);
      setDepartmentHighLight(false);
      setMembertHighLight(false);
    }
  };
  return (
    <div className="grid grid-rows-[50px_1fr]">
      <nav>
        <div className=" px-4  border-b-[1px] flex justify-between gap-3">
          <div className="flex  gap-5 relative">
            {departmentHighLight ? (
              <button
                onClick={branchFlip}
                className=" px-8 border-b-4 border-blue-600 rounded-b"
              >
                Deparment
              </button>
            ) : (
              <button onClick={branchFlip} className=" px-8 rounded-b">
                Deparment
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
                Positions
              </button>
            ) : (
              <button onClick={pendingFlip} className=" px-8  rounded-b">
                Positions
              </button>
            )}
          </div>
          <div className="flex  px-2 py-1 gap-5">
            {/* {memberHighLight && (
              <button
                onClick={() => setCreateMemberModal((prev) => !prev)}
                className=" border rounded px-10 py-1 hover:shadow-md "
              >
                Create
              </button>
            )} */}

            {departmentHighLight && (
              <button
                onClick={() => setIsOpenCreateDepartmentMOdal(true)}
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
          <CreateDepartment
            isOpen={isOpenCreateDeparmentModal}
            closeModal={creaDepartmentModalClose}
            orgAlias={orgAlias}
            branchAlias={branchAlias}
          />
        }
        {departmentHighLight && (
          <Departments orgAlias={orgAlias} branchAlias={branchAlias} />
        )}
        {/* {memberHighLight && <Members uniqueName={uniqueName} />}
        {pendingHighLight && <Pending uniqueName={uniqueName} />} */}
      </section>
      {/* {createMemberModal && <CreateMember uniqueName={uniqueName} />} */}
    </div>
  );
};

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const SpecificORg = () => {
  const { id } = useParams();

  const [branchHighLight, setBranchHighLight] = useState(true);
  const [memberHighLight, setMembertHighLight] = useState(false);

  const branchFlip = () => {
    if (branchHighLight) {
      null;
    } else {
      setBranchHighLight((prev) => !prev);
      setMembertHighLight(false);
    }
  };
  const memberFlip = () => {
    if (memberHighLight) {
      null;
    } else {
      setMembertHighLight((prev) => !prev);
      setBranchHighLight(false);
    }
  };

  console.log(id);
  return (
    <>
      {branchHighLight ? (
        <div>
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
              </div>
              <div className="flex  px-2 py-1 gap-5">
                <button className=" border-[1px] rounded px-10 py-1 hover:shadow-md">
                  Create
                </button>
                <button className=" border-[1px] rounded px-10 py-1  hover:shadow-md">
                  Join
                </button>
              </div>
            </div>
          </nav>

          <section className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 ">
            
            <div><Link to={`branch`}>Branch 1111</Link> </div>
            <div>BRANCH 2</div>
            <div>BRANCH 4</div>
            <div>BRANCH 5</div>
          </section>
        </div>
      ) : (
        <div>
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
              </div>
              <div className="flex  px-2 py-1 gap-5">
                <button className=" border-[1px] rounded px-10 py-1 hover:shadow-md">
                  Create
                </button>
                <button className=" border-[1px] rounded px-10 py-1  hover:shadow-md">
                  Join
                </button>
              </div>
            </div>
          </nav>

          <section className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 ">
            
            <div>Member 1 </div>
            <div>Member 2</div>
            <div>Member 4</div>
            <div>Member 5</div>
          </section>
        </div>
      )}
    </>
  );
};
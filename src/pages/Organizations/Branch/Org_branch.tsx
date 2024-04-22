import { useState } from "react";



export const Org_Branch = () => {

  // set which category to display  BRANCH or MEMBER when higlighted
  const [departmentHighLight, setDepartmentHighLight] = useState(true);
  const [positionHighLight, setPositiontHighLight] = useState(false);

  // flip the value of department category
  const deparmtentFlip = () => {
    //if already true , stay true
    if (departmentHighLight) {
      null;
    } else {
      //if false , then set to true, other category will set to be false
      setDepartmentHighLight((prev) => !prev);
      setPositiontHighLight(false);
    }
  };

  // flip the value of member category
  const positionFlip = () => {
    //if already true , stay true
    if (positionHighLight) {
      null;
    } else {
       //if false , then set to true, other category will set to be false
      setPositiontHighLight((prev) => !prev);
      setDepartmentHighLight(false);
    }
  };

  return (
    <>
      {/* if department is true/highlighted then display departments else displ ay members */}
      {departmentHighLight ? (
        <div>
          <nav>
            <div className=" px-4  border-b-[1px] flex justify-between gap-3">
              <div className="flex  gap-5 relative">
                {departmentHighLight ? (
                  <button
                    onClick={deparmtentFlip}
                    className=" px-8 border-b-4 border-blue-600 rounded-b"
                  >
                    Departments
                  </button>
                ) : (
                  <button onClick={deparmtentFlip} className=" px-8 rounded-b">
                    Departments
                  </button>
                )}

                {positionHighLight ? (
                  <button
                    onClick={positionFlip}
                    className=" px-8 border-b-4 border-blue-600 rounded-b"
                  >
                    Positions
                  </button>
                ) : (
                  <button onClick={positionFlip} className=" px-8  rounded-b">
                    Positions
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
            
            <div>Department 1 </div>
            <div>Department 2</div>
            <div>Department 4</div>
            <div>Department 5</div>
          </section>
        </div>
      ) : (
        <div>
          <nav>
            <div className=" px-4  border-b-[1px] flex justify-between gap-3">
              <div className="flex  gap-5 relative">
                {departmentHighLight ? (
                  <button
                    onClick={deparmtentFlip}
                    className=" px-8 border-b-4 border-blue-600 rounded-b"
                  >
                    Department
                  </button>
                ) : (
                  <button onClick={deparmtentFlip} className=" px-8 rounded-b">
                    Department
                  </button>
                )}

                {positionHighLight ? (
                  <button
                    onClick={positionFlip}
                    className=" px-8 border-b-4 border-blue-600 rounded-b"
                  >
                    Positions
                  </button>
                ) : (
                  <button onClick={positionFlip} className=" px-8  rounded-b">
                    Positions
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
            
            <div>Position 1 </div>
            <div>Position 2</div>
            <div>Position 4</div>
            <div>Position 5</div>
          </section>
        </div>
      )}
    </>
  );
};

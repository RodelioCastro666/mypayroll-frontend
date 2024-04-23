import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useEffect, useState } from "react";

export const Branches = ({ id }) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [branches, setBranches] = useState([]);

  console.log(id);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBranches = async () => {
      try {
        const response = await axiosRequest.get(
          `/organizations/${id}/branches`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setBranches(response);
      } catch (error) {
        console.log(error);
      }
    };
    getBranches();
    console.log(branches);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 ">
      {/* {branches
        ? branches.map((branch) => {
            <div >
              <Link to={`branch`}>Branch 1111</Link>
            </div>;
          })
        : null} */}
    </div>
  );
};

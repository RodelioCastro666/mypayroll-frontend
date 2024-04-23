import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useState } from "react";
import { useEffect } from "react";
export const Members = ({ id }) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMembers = async () => {
      try {
        const response = await axiosRequest.get(
          `/organizations/${id}/members`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setMembers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMembers();
    console.log(members);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  console.log(members);

  return (
    <div className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 ">
      {members ? members.map((member) => <li>{member.name}</li>) : <></>}
    </div>
  );
};

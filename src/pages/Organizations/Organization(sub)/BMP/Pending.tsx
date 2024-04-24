import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import kebab from "../../../../Assets/icons8-menu-vertical-64.png";
export const Pending = ({ id }) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [pending, setPending] = useState([]);
  const [kebabIsOpen, setKebabIsopen] = useState(false);

  console.log(id);

  const getPending = async () => {
    try {
      const response = await axiosRequest.get(
        `/organizations/${id}/members/pending`
        //   {
        //     signal: controller.signal,
        //   }
      );

      //isMounted &&
      setPending(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // let isMounted = true;
    // const controller = new AbortController();

    getPending();

    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, []);

  const approve = (userEmail) => {
    mutation.mutate({
      email: userEmail,
    });

    setPending();
  };
  const decline = (userEmail) => {
    declinemutation.mutate({
      email: userEmail,
    });

    setPending();
  };
  const declinemutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post(
        `/organizations/${id}/members/decline`,
        credential
      ),
    onSuccess: (data) => {
      getPending();
    },
  });

  const mutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post(
        `/organizations/${id}/members/approval`,
        credential
      ),
    onSuccess: (data) => {
      getPending();
    },
  });

  console.log(pending);

  return (
    <div className="p-4 flex justify-center">
      {pending &&
        pending.map((item) => (
          <div className="w-[50%] flex p-5 justify-between border shadow-md">
            <div>
              <p>{item.name}</p>
            </div>

            <div className="flex  gap-4 ">
              <button
                className="border p-2 px-2 rounded shadow-md"
                onClick={() => approve(item.email)}
              >
                {/* <FaCheck /> */}
                ACCEPT
              </button>
              <button
                className="border p-2 px-2 rounded shadow-md"
                onClick={() => decline(item.email)}
              >
                {/* <ImCross /> */}
                DECLINE
              </button>
            </div>
          </div>
        ))}
      {/* {pending && pending.map((pen) => {
            <li></li>
        } )} */}
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

import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
export const Pending = ({ orgAlias }) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [pending, setPending] = useState([]);
  const [kebabIsOpen, setKebabIsopen] = useState(false);

  const [isOpenAction, setIsOpenAction] = useState(false);

  const getPending = async () => {
    try {
      const response = await axiosRequest.get(
        `/organizations/${orgAlias}/members/pending`
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
        `/organizations/${orgAlias}/members/decline`,
        credential
      ),
    onSuccess: (data) => {
      getPending();
    },
  });

  const mutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post(
        `/organizations/${orgAlias}/members/approval`,
        credential
      ),
    onSuccess: () => {
      getPending();
    },
  });

  console.log(pending);

  return (
    <div className=" p-4 flex flex-col justify-center">
      <table className="table-auto ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="relative">
          {pending &&
            pending.map((pendingUser) => (
              <tr>
                <td>{pendingUser.name}</td>

                <td>
                  <button
                    onClick={() => {
                      approve(pendingUser.email);
                      toast.success("User successfully Accepted");
                    }}
                    className="border p-2 px-2 rounded shadow-md"
                  >
                    ACCEPT
                  </button>
                  <button
                    className="border p-2 px-2 rounded shadow-md"
                    onClick={() => {
                      decline(pendingUser.email);
                      toast.success("User successfully declined");
                    }}
                  >
                    DECLINE
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    // <div>
    //   {pending &&
    //     pending.map((pendingUser) => (
    //       <div className="w-full flex p-5 justify-around items-center  ">
    //         <div>
    //           <p>{pendingUser.name}</p>
    //         </div>

    //         <div className="flex  gap-4 ">
    //           <button
    //             className="border p-2 px-2 rounded shadow-md"
    //             onClick={() => approve(pendingUser.email)}
    //           >
    //             ACCEPT
    //           </button>
    //           <button
    //             className="border p-2 px-2 rounded shadow-md"
    //             onClick={() => decline(pendingUser.email)}
    //           >
    //             DECLINE
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    // </div>
  );
};

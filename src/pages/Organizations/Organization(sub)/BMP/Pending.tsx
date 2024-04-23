import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
export const Pending = ({ id }) => {
  const axiosRequest = useAxiosRefreshRequest();
  const [pending, setPending] = useState([]);

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

  //for approving pending user

  console.log(pending);

  return (
    <div className=" h-full grid grid-cols-5 grid-rows-3 p-10 gap-10 ">
      <h1>Pending</h1>

      {pending &&
        pending.map((item) => (
          <div>
            <li>{item.name}</li>
            {/* {console.log("USER EMAIL", item.email)} */}
            <button onClick={() => approve(item.email)}>Accept</button>
            <button onClick={() => decline(item.email)}>Decline</button>
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

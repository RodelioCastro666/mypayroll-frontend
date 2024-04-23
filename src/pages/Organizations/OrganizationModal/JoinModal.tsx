import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";

export const JoinModal = () => {
  const [join, setJoin] = useState("");
  const axiosRequest = useAxiosRefreshRequest();

  const mutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post("/organizations/join", credential),
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      invitationCode: join,
    });
  };

  return (
    <>
      <form
        onSubmit={onHandleSubmit}
        className=" border-2 shadow-lg  absolute rounded right-[35%] top-[40%]"
      >
        <div className=" text-center p-10">
          <input
            type="text"
            className="border px-6 py-2 rounded"
            onChange={(e) => setJoin(e.target.value)}
            required
          />
          <h1 className="text-3xl p-5">Join</h1>
          <button>Join</button>
        </div>
      </form>
    </>
  );
};

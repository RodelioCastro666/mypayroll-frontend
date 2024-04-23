import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";

export const CreateMember = ({ id }) => {
  const [newMember, setNewMember] = useState();
  const axiosRequest = useAxiosRefreshRequest();

  const mutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post(`/organizations/${id}/members`, credential),
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: newMember,
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
            type="email"
            className="border px-6 py-2 rounded"
            onChange={(e) => setNewMember(e.target.value)}
            required
          />
          <h1 className="text-3xl p-5">Enter Member</h1>
          <button>Confirm</button>
        </div>
      </form>
    </>
  );
};

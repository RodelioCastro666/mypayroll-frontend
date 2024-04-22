import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";

export const CreateOrganization = () => {
  const [newOrg, setNewORg] = useState("");
  const axiosRequest = useAxiosRefreshRequest();

  const mutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post("/organizations", credential),
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      organization: newOrg,
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
            onChange={(e) => setNewORg(e.target.value)}
            required
          />
          <h1 className="text-3xl p-5">Enter Organization Name</h1>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

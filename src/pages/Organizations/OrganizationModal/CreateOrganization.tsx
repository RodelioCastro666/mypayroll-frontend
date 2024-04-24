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
    console.log("Clicked");

    mutation.mutate({
      name: newOrg,
    });
  };

  return (
    <form
      className=" border-2 shadow-lg bg-white p-6  absolute rounded top-[37%] right-[35%] "
      onSubmit={onHandleSubmit}
    >
      <div className=" text-center ">
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
  );
};

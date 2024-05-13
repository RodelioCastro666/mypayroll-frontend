import { useQueryClient } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";

import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import { useState } from "react";
export const Pending = ({ orgAlias }) => {
  const axiosRequest = useAxiosRefreshRequest();

  const [pendingSearch, setPendingSearch] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["Pending"],
    queryFn: async () =>
      await axiosRequest.get(`/organizations/${orgAlias}/members/pending`),
  });

  const pending = data?.data;
  console.log(pending);

  const approve = (userEmail) => {
    mutation.mutate({
      email: userEmail,
    });
  };
  const decline = (userEmail) => {
    declinemutation.mutate({
      email: userEmail,
    });
  };
  const declinemutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post(
        `/organizations/${orgAlias}/members/decline`,
        credential
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Pending"] });
    },
  });

  const mutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post(
        `/organizations/${orgAlias}/members/approval`,
        credential
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Pending"] });
    },
  });

  console.log(pending);

  return (
    <div className="w-full h-full p-2">
      <div className="flex items-center  justify-start  py-1">
        <input
          className="w-[300px] border rounded px-4 py-1"
          type="search"
          placeholder="Input Name to search"
          onChange={(e) => setPendingSearch(e.target.value)}
        />
      </div>
      <table className=" w-full h-full  px-2 text-start">
        <tr className="flex justify-around">
          <th className="">Name</th>
          <th>Actions</th>
        </tr>

        {pending &&
          pending
            .filter((pendingUser) => {
              if (pendingSearch === "") {
                return pendingUser;
              } else if (
                pendingUser.name
                  .toLowerCase()
                  .includes(pendingSearch.toLowerCase())
              ) {
                return pendingUser;
              }
            })
            .map((pendingUser) => (
              <tr className="flex justify-around ">
                <td>{pendingUser.name}</td>

                <td>
                  <div className="flex justify-center items-center">
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
                  </div>
                </td>
              </tr>
            ))}
      </table>
    </div>
  );
};

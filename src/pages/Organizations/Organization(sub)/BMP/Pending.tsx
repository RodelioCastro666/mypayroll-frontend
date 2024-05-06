import { useQueryClient } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";

import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
export const Pending = ({ orgAlias }) => {
  const axiosRequest = useAxiosRefreshRequest();

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
  );
};

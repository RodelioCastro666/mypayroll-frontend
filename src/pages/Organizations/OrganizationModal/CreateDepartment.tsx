import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../auth/AuthProvider";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
interface IDepartment {
  isOpen: void;
  closeModal: void;
  orgAlias: string;
}

export default function CreateDepartment(props: IDepartment) {
  const [newDepartment, setNewDeparment] = useState("");
  const axiosRequest = useAxiosRefreshRequest();

  const { setDepartment } = useAuth();
  const queryClient = useQueryClient();

  const [assignBranch, setAssignBranch] = useState("");

  const { data: branches } = useQuery({
    queryKey: ["Branches"],
    queryFn: async () =>
      await axiosRequest.get(`/organizations/${props.orgAlias}/branches`),
  });

  const mutation = useMutation({
    mutationFn: async (credential): Promise<IDepartment> => {
      const response = await axiosRequest.post(
        `organizations/${props.orgAlias}/branches/${assignBranch}/departments`,
        credential
      );

      return response.data;
    },
    onSuccess: () => {
      // setDepartment((prev) => [...prev, data]);
      queryClient.invalidateQueries({ queryKey: ["Departments"] });
      toast.success("Deparment has been created");
    },
    onError: (error) => {
      if (error.response.status === 409) {
        toast.error("The Department has already been created.");
      }
    },
  });

  const handleChangeBranch = (e) => {
    setAssignBranch(e.target.value);
    console.log(e.target.value);
  };

  const onHandleSubmit = () => {
    mutation.mutate({
      name: newDepartment,
    });
    props.closeModal();
  };

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Department
                  </Dialog.Title>

                  <div>
                    <select
                      onChange={handleChangeBranch}
                      className=" px-4 py-2 w-full border rounded "
                    >
                      <option value="">
                        Select a Branch for the deparment{" "}
                      </option>
                      {branches?.data.map((branch) => (
                        <option
                          className="p-2"
                          id={branch.id}
                          value={branch.branch_alias}
                        >
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2  ">
                    <input
                      className="px-4 py-2 w-full border rounded"
                      type="text"
                      placeholder="Enter Organization Name"
                      onChange={(e) => setNewDeparment(e.target.value)}
                    />
                  </div>

                  <div className="mt-4  flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex  rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={props.closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex  rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onHandleSubmit}
                    >
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

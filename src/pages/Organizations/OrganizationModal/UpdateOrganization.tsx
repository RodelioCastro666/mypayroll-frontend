import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../auth/AuthProvider";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";

interface IUpdateOrgModalProps {
  isOpen: boolean;
  closeModal(): void;
  orgAlias: string;
}

interface IOrg {
  id: string;
  name: string;
  alias: string;
  invitation: string;
  created: string;
  modified: string;
  created_at: string;
  modified_at: string;
  created_by: string;
}

export const UpdateOrganization = (props: IUpdateOrgModalProps) => {
  const queryClient = useQueryClient();
  const [updateOrg, setUpdateOrg] = useState("");
  const axiosRequest = useAxiosRefreshRequest();
  const { organization, setOrganization } = useAuth();

  const mutation = useMutation({
    mutationFn: async (credential): Promise<IOrg> => {
      const response = await axiosRequest.patch(
        `/organizations/${props.orgAlias}`,
        credential
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["org", { name: props.orgAlias }], data);
      console.log("OnSuccess");

      const updateData = organization.map((org) => {
        if (org.alias === props.orgAlias) {
          return { ...org, name: updateOrg };
        }
        return org;
      });
      setOrganization([...updateData]);
      toast.success("Organization has been updated");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onHandleSubmit = () => {
    mutation.mutate({
      name: updateOrg,
    });
    console.log("HandleSubmit");
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
                    Update Organization
                  </Dialog.Title>
                  <div className="mt-2  ">
                    <input
                      className="px-4 py-2 w-full border rounded"
                      type="text"
                      placeholder="Enter New Organization Name"
                      onChange={(e) => setUpdateOrg(e.target.value)}
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
};

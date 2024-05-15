import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useQueryClient } from "@tanstack/react-query";
interface IEditDepartmentProps {
  isOpen: void;
  closeModal: void;
  orgAlias: string;
  branchAlias: string;
  deptAlias: string;
  deptName: string;
}

export const EditDepartment = (props: IEditDepartmentProps) => {
  const axiosRequest = useAxiosRefreshRequest();
  const queryClient = useQueryClient();

  const [editBranch, setEditBranch] = useState("");

  const [deptAlias, setDeptAlias] = useState<string>("");

  const { data: branches } = useQuery({
    queryKey: ["Branches"],
    queryFn: async () => {
      return await axiosRequest.get(
        `/organizations/${props.orgAlias}/branches`
      );
    },
  });

  useEffect(() => {
    setEditBranch(props.branchAlias);

    return () => {
      setEditBranch();
    };
  }, []);

  console.log(editBranch);

  const mutation = useMutation({
    mutationFn: async (credential) => {
      return await axiosRequest.patch(
        `/organizations/${props.orgAlias}/branches/${
          editBranch === "" ? props.branchAlias : editBranch
        }/departments/${props.deptAlias}`,
        credential
      );
    },
    onSuccess() {
      console.log("SUCCESS EDIT");
      queryClient.invalidateQueries({ queryKey: ["Departments"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onhandleEditSubmit = () => {
    mutation.mutate({
      name: deptAlias,
    });
    props.closeModal();
    console.log(deptAlias);
    console.log(editBranch);
    setDeptAlias("");
    setEditBranch("");
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
                    Edit Organization
                  </Dialog.Title>

                  <div>
                    <button onClick={() => console.log(editBranch)}>
                      click
                    </button>
                    <select
                      defaultValue={props.branchAlias}
                      onChange={(e) => setEditBranch(e.target.value)}
                      className=" px-4 py-2 w-full border rounded "
                    >
                      {branches?.data.map((branch) =>
                        branch.branch_alias === props.branchAlias ? (
                          <option
                            selected
                            key={branch.id}
                            className="p-2"
                            id={branch.id}
                            value={branch.branch_alias}
                          >
                            {branch.name}
                          </option>
                        ) : (
                          <option
                            key={branch.id}
                            className="p-2"
                            id={branch.id}
                            value={branch.branch_alias}
                          >
                            {branch.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="mt-2  ">
                    <input
                      defaultValue={props.deptName}
                      className="px-4 py-2 w-full border rounded"
                      type="text"
                      placeholder="Enter New  Name"
                      onChange={(e) => setDeptAlias(e.target.value)}
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
                      onClick={onhandleEditSubmit}
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

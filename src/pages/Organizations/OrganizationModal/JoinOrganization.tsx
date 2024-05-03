// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";
// import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";

// export const JoinModal = () => {
//   const [join, setJoin] = useState("");
//   const axiosRequest = useAxiosRefreshRequest();

//   const mutation = useMutation({
//     mutationFn: async (credential) =>
//       await axiosRequest.post("/organizations/join", credential),
//   });

//   const onHandleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({
//       invitationCode: join,
//     });
//   };

//   return (
//     <form onSubmit={onHandleSubmit}>
//       <div className=" text-center ">
//         <input
//           type="text"
//           className="border px-6 py-2 rounded"
//           onChange={(e) => setJoin(e.target.value)}
//           required
//         />
//         <h1 className="text-3xl p-5">Join</h1>
//         <button>Join</button>
//       </div>
//     </form>
//   );
// };

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { toast } from "sonner";

interface ICreateOrgModalProps {
  isOpen: boolean;
  closeModal(): void;
}

export const JoinOrganization = (props: ICreateOrgModalProps) => {
  const [join, setJoin] = useState("");
  const axiosRequest = useAxiosRefreshRequest();

  const mutation = useMutation({
    mutationFn: async (credential) =>
      await axiosRequest.post("/organizations/join", credential),
  });

  const onHandleSubmit = () => {
    mutation.mutate({
      invitationCode: join,
    });
    props.closeModal();
    toast.success("Successfully sent a request.");
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
                    Join Organization
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      className="px-4 py-2 w-full border rounded"
                      type="text"
                      placeholder="Enter invitation code"
                      onChange={(e) => setJoin(e.target.value)}
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
                      Join
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

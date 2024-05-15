import { useState } from "react";
import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import CreateOrganization from "../OrganizationModal/CreateOrganization";
import { JoinOrganization } from "../OrganizationModal/JoinOrganization";
import Kebab from "./kebab";
import { useQuery } from "@tanstack/react-query";
import { PolarBear } from "../../../components/EmptyPages";

export const Organizations = () => {
  const axiosRequest = useAxiosRefreshRequest();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenJoinModal, setIsOpenJoinModal] = useState<boolean>(false);

  const [orgSearch, setOrgSearch] = useState<string>("");

  const {
    data: organization,
    isPending,

    isError,
  } = useQuery({
    queryKey: ["Organizations"],
    queryFn: async () => await axiosRequest.get("/organizations"),
    retry: 3,
  });

  const createModalClose = () => {
    setIsOpenCreateModal(false);
  };

  if (isError) {
    return (
      <div className="h-screen flex justify-center ">
        <PolarBear content="ERROR" />
      </div>
    );
  }
  if (isPending) {
    <div>LOADING</div>;
    console.log("LOADING");
  }

  return (
    <div className="grid grid-rows-[50px_1fr]   ">
      <nav>
        <div className=" flex justify-between border-b-[1px]">
          <div className="flex items-center  justify-center px-4 ">
            <input
              className="w-[300px] border rounded px-4 py-1"
              type="search"
              placeholder="Input Org to search"
              onChange={(e) => setOrgSearch(e.target.value)}
            />
          </div>
          <div className=" px-6 py-1 flex justify-evenly  gap-5">
            <button
              onClick={() => setIsOpenCreateModal(true)}
              className="my-custom-style px-10 "
            >
              Create
            </button>
            <button
              onClick={() => setIsOpenJoinModal(true)}
              className="my-custom-style px-10 "
            >
              Join
            </button>
          </div>
        </div>
      </nav>
      <CreateOrganization
        isOpen={isOpenCreateModal}
        closeModal={createModalClose}
      />

      <JoinOrganization
        isOpen={isOpenJoinModal}
        closeModal={() => setIsOpenJoinModal(false)}
      />

      <section className=" h-full grid grid-cols-4 grid-rows-2 p-10 gap-10  relative ">
        {organization &&
          organization.data
            ?.filter((org) => {
              if (orgSearch === "") {
                return org;
              } else if (
                org.name.toLowerCase().includes(orgSearch.toLowerCase())
              ) {
                return org;
              }
            })
            .map((org) => (
              <div key={org.id} className="border rounded-md p-4 ">
                <div className="flex flex-col gap-10 px-4 py-4  text-wrap relative">
                  <div className="flex justify-between items-center h-[70px]  relative">
                    <h1 className="text-xl font-medium hover:underline">
                      <Link to={`${org.alias}`}>{org.name}</Link>
                    </h1>
                    <Kebab
                      invitationCode={org.invitation}
                      orgAlias={org.alias}
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <p>
                      Creator: <span>{org.created_by}</span>
                    </p>

                    <p>
                      CREATED DATE: <span>{org.created_at}</span>
                    </p>
                    <p>
                      Member Count: <span>{org.membersCount}</span>
                    </p>
                  </div>
                  <div className="flex justify-end items-center border-t  p-2">
                    <Link to={`${org.alias}`}>
                      <button className="my-custom-style mt-2">View</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </section>
    </div>
  );
};

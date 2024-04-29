import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import CreateOrganization from "../OrganizationModal/CreateOrganization";
import { JoinOrganization } from "../OrganizationModal/JoinOrganization";

import { useAuth } from "../../../auth/AuthProvider";

import Kebab from "./kebab";
export const Organizations = () => {
  const axiosRequest = useAxiosRefreshRequest();

  const { organization, setOrganization } = useAuth();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenJoinModal, setIsOpenJoinModal] = useState<boolean>(false);

  const [orgSearch, setOrgSearch] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getOrganization = async () => {
      try {
        const response = await axiosRequest.get("/organizations", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setOrganization(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrganization();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const createModalClose = () => {
    setIsOpenCreateModal(false);
  };

  return (
    <div className="grid grid-rows-[50px_1fr]   ">
      <nav>
        <div className=" flex justify-between border-b-[1px]">
          <div className="flex items-center  justify-center px-4 py-1">
            <input
              className="w-[300px] border rounded px-4 py-1"
              type="search"
              placeholder="Input Org to search"
              onChange={(e) => setOrgSearch(e.target.value)}
            />
          </div>
          <div className=" px-4 py-1  flex justify-end gap-3">
            <button
              onClick={() => setIsOpenCreateModal(true)}
              className=" border-[1px] rounded px-10 py-1 hover:shadow-md"
            >
              Create
            </button>
            <button
              onClick={() => setIsOpenJoinModal(true)}
              className=" border-[1px] rounded px-10  hover:shadow-md"
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
          organization
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
                      {org.name}
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
                    <button className="hover:underline">
                      <Link to={`${org.alias}`}>View</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </section>
    </div>
  );
};

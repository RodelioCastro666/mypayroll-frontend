import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { CreateOrganization } from "../OrganizationModal/CreateOrganization";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { JoinModal } from "../OrganizationModal/JoinModal";
import { useAuth } from "../../../auth/AuthProvider";
import kebabIcon from "../../../Assets/icons8-menu-vertical-64.png";
import { useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Kebab from "./kebab";
export const Organizations = () => {
  const [organization, setOrganization] = useState([]);
  const axiosRequest = useAxiosRefreshRequest();
  const [newOrg, setNewORg] = useState("");

  const [createOrgModal, setCreateOrgModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);

  const { access_token, refresh_token } = useAuth();

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

  // const getOrganizations = async () => {
  //   return await axiosRequest.get("/organizations");
  // };

  // const { data } = useQuery({
  //   queryKey: ["organizations"],
  //   queryFn: getOrganizations,
  // });

  // useEffect(() => {
  //   setOrganization(data?.data);
  //   console.log(organization);
  // }, [data?.data, organization, setOrganization]);

  // modal

  const mutation = useMutation({
    mutationFn: async (credential) => {
      const response = await axiosRequest.post("/organizations", credential);
      return response;
    },
    onSuccess: (data) => {
      setOrganization((prev) => [...prev, data.data]);
    },
  });

  console.log(access_token);
  console.log(refresh_token);

  return (
    <div className="grid grid-rows-[50px_1fr]   ">
      <nav>
        <div className=" px-4 py-1 border-b-[1px] flex justify-end gap-3">
          <button
            onClick={() => setCreateOrgModal((prev) => !prev)}
            className=" border-[1px] rounded px-10 py-1 hover:shadow-md"
          >
            Create
          </button>
          <button
            onClick={() => setJoinModal((prev) => !prev)}
            className=" border-[1px] rounded px-10  hover:shadow-md"
          >
            Join
          </button>
        </div>
      </nav>

      <section className=" h-full grid grid-cols-4 grid-rows-2 p-10 gap-10   ">
        {createOrgModal && <CreateOrganization />}
        {joinModal && <JoinModal />}

        {organization
          ? organization.map((org) => (
              <div key={org.id} className="border rounded-md p-4 ">
                <div className="flex flex-col gap-10 px-4 py-4  text-wrap relative">
                  <div className="flex justify-between items-center h-[70px]  ">
                    <h1 className="text-xl font-medium hover:underline">
                      {org.name}
                    </h1>
                    <Kebab />
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <p>
                      Creator: <span>{org.created_by}</span>
                    </p>

                    <p>
                      CREATED DATE: <span>{org.modified_at}</span>
                    </p>
                    <p>
                      Member Count: <span>{org.membersCount}</span>
                    </p>
                  </div>
                  <div className="flex justify-end items-center border-t  p-2">
                    <button className="hover:underline">
                      <Link to={`${org.organizationUniqueName}`}>View</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </section>
    </div>
  );
};

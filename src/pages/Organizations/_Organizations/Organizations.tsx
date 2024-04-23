import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { CreateOrganization } from "../OrganizationModal/CreateOrganization";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { JoinModal } from "../OrganizationModal/JoinModal";

export const Organizations = () => {
  const [organization, setOrganization] = useState([]);
  const axiosRequest = useAxiosRefreshRequest();
  const [newOrg, setNewORg] = useState("");

  const [createOrgModal, setCreateOrgModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);

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
  }, [axiosRequest]);

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

  const onHandleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      organization: newOrg,
    });
    console.log();

    setCreateOrgModal(false);

    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // }
  };

  return (
    <div className="grid grid-rows-[50px_1fr] h-full">
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
      <section className=" h-full grid grid-cols-4 grid-rows-3 p-10 gap-10 ">
        {organization
          ? organization.map((org) => (
              <div key={org.id} className="border rounded-md p-4 ">
                <div className="flex flex-col gap-10 px-4 py-4">
                  <div className=" h-[70px] text-wrap">
                    <h1 className="text-xl font-medium ">{org.organization}</h1>
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <p>
                      Creator: <span>{org.created_by}</span>
                    </p>
                    <p>
                      CREATED DATE: <span>{org.modified_at}</span>
                    </p>
                    <p>
                      Member Count: <span>0</span>
                    </p>
                  </div>
                  <div className="flex justify-end items-center border-t">
                    <button>
                      <Link to={`${org.id}`}>VIEW</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}

        {/* // <div key={org.id} className="bg-red-100">
              //   {console.log(org.id)}
              //   <Link to={`${org.id}`}>{org.organization}kkkk</Link>
              // </div> */}
      </section>

      <>
        {createOrgModal && (
          <form
            onSubmit={onHandleSubmit}
            className=" border-2 shadow-lg  absolute rounded right-[35%] top-[40%]"
          >
            <div className=" text-center p-10">
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
        )}
        {joinModal && <JoinModal />}
      </>
    </div>
  );
};

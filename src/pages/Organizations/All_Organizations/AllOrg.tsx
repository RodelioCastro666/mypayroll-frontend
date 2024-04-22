import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { CreateOrganization } from "../OrganizationModal/CreateOrganization";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
export const AllORg = () => {
  const [organization, setOrganization] = useState([]);
  const axiosRequest = useAxiosRefreshRequest();
  const [newOrg, setNewORg] = useState("");

  const [createOrgModal, setCreateOrgModal] = useState(false);

  useEffect(() => {
    // let isMounted = true;
    // const controller = new AbortController();

    getOrganization();
  }, []);

  const getOrganization = async () => {
    try {
      const response = await axiosRequest.get("/organizations", {
        // signal: controller.signal,
      });
      console.log(response.data);
      //isMounted &&
      setOrganization(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(data);
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
    <>
      <nav>
        <div className=" px-4 py-1 border-b-[1px] flex justify-end gap-3">
          <button
            onClick={() => setCreateOrgModal((prev) => !prev)}
            className=" border-[1px] rounded px-10 py-1 hover:shadow-md"
          >
            Create
          </button>
          <button className=" border-[1px] rounded px-10  hover:shadow-md">
            Join
          </button>
        </div>
      </nav>
      <section className=" h-full grid grid-cols-12 grid-rows-12 p-10 gap-10 ">
        {organization
          ? organization.map((org) => (
              <div key={org.id} className="bg-red-100">
                <Link to={`${org.id}`}>{org.organization}</Link>
              </div>
            ))
          : null}
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
      </>
    </>
  );
};

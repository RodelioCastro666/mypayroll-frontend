import { RxHamburgerMenu } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useAxiosRefreshRequest } from "../auth/useAxiosRefreshRequest";

export const Header = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState({});
  const axiosRequest = useAxiosRefreshRequest();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProfile = async () => {
      try {
        const response = await axiosRequest.get("/profiles/me", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setName(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <nav className="px-10 py-4 flex flex-row gap-4 justify-between border-b-[1px]">
      <div className="flex flex-row gap-3">
        <RxHamburgerMenu className="h-6 w-6 " />
        <p>Payroll</p>
      </div>
      <div className="flex flex-row gap-3">
        <p>
          <span>{name.fullName}</span>
        </p>
        <HiUserCircle className="h-6 w-6" />
      </div>
    </nav>
  );
};

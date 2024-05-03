import { RxHamburgerMenu } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi";
import { useState } from "react";
import { useAxiosRefreshRequest } from "../auth/useAxiosRefreshRequest";
import { useQuery } from "@tanstack/react-query";

export const Header = () => {
  const axiosRequest = useAxiosRefreshRequest();

  const { data } = useQuery({
    queryKey: ["Profile"],
    queryFn: async () => await axiosRequest.get("/profiles/me"),
  });

  console.log(data);

  return (
    <nav className="px-10 py-4 flex flex-row gap-4 justify-between border-b-[1px]">
      <div className="flex flex-row gap-3">
        <RxHamburgerMenu className="h-6 w-6 " />
        <p className="font-bold">StreamlineOps</p>
      </div>
      <div className="flex flex-row gap-3">
        <p>
          <span>{data?.data.fullName}</span>
        </p>
        <HiUserCircle className="h-6 w-6" />
      </div>
    </nav>
  );
};

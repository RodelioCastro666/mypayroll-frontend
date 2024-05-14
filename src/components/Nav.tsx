import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

import { useMutation } from "@tanstack/react-query";
import { useAxiosRefreshRequest } from "../auth/useAxiosRefreshRequest";

export const Nav = () => {
  const axiosRequest = useAxiosRefreshRequest();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosRequest.post("/auth/signout");
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      console.log("JKJK");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { setAccessToken, setRefreshToken } = useAuth();
  return (
    <nav className=" h-full  p-4 border-r-[1px] flex flex-col justify-between">
      <ul className="">
        <Link to="/">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">Home</li>
        </Link>

        <Link to="/dashboard">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r inline-block">
            Dashboard
          </li>
        </Link>
        <Link to="/employees">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">Employees</li>
        </Link>
        <Link to="/organizations">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
            Organizations
          </li>
        </Link>
        <Link to="/branches">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">Branches</li>
        </Link>
        <Link to="/departments">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">Departmens</li>
        </Link>
      </ul>

      <ul>
        <Link>
          <li
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              setAccessToken("");
              setRefreshToken("");
              localStorage.removeItem("token");

              mutation.mutate();
            }}
            className="px-5 py-3 hover:bg-gray-100 rounded-r"
          >
            LogOut
          </li>
        </Link>
      </ul>
    </nav>
  );
};

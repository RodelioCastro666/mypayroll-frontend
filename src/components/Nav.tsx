import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
export const Nav = () => {
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

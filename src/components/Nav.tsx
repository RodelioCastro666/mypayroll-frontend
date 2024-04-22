import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

export const Nav = () => {
  return (
    <nav className=" h-full  p-4 border-r-[1px]">
      <ul className="">
        <Link to="/">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">Home</li>
        </Link>
        <Link to="/login">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">Login</li>
        </Link>

        <Link to="/dashboard">
          <div className="inline-block">
            <RxDashboard className="" />
          </div>
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
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
            Branches
          </li>
        </Link>
        <Link to="/departments">
          <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
            Departmens
          </li>
        </Link>
      </ul>
    </nav>
  );
};

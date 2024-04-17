import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="">
      <ul className="">
        <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
          <Link to="/">Home</Link>
        </li>
        <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
          <Link to="/login">Login</Link>
        </li>
        <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
          <Link to="/employees">Employees</Link>
        </li>
        <li className="px-5 py-3 hover:bg-gray-100 rounded-r">
          <Link to="/organization">Organizations</Link>
        </li>
      </ul>
    </nav>
  );
};

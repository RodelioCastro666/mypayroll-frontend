import { RxHamburgerMenu } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi";

export const Header = () => {
  return (
    <nav className="px-10 py-4 flex flex-row gap-4 justify-between border-b-[1px]">
      <div className="flex flex-row gap-3">
        <RxHamburgerMenu className="h-6 w-6 " />
        <p>Payroll</p>
      </div>
      <div className="flex flex-row gap-3">
        <p>JOEY DELEON</p>
        <HiUserCircle className="h-6 w-6" />
      </div>
    </nav>
  );
};

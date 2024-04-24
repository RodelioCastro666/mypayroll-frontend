import { useState } from "react";
import kebab from "../../../Assets/icons8-menu-vertical-64.png";

const Kebab = () => {
  const [kebabIsOpen, setKebabIsopen] = useState(false);
  return (
    <>
      <img
        onClick={() => {
          setKebabIsopen((prev) => !prev);
        }}
        className="w-[20px] cursor-pointer"
        src={kebab}
        alt=""
      />
      {kebabIsOpen && (
        <div className="bg-white border absolute top-20 right-6 w-[150px] h-[200px] p-2 shadow-md ">
          <button className="px-2 py-2 border text-xs">
            Copy Invitation Code
          </button>
        </div>
      )}
    </>
  );
};

export default Kebab;

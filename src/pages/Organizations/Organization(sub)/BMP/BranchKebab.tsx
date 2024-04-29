import { useState } from "react";
import kebab from "../../../../Assets/icons8-menu-vertical-64.png";
export const Kebab = () => {
  const [kebabIsOpen, setKebabIsopen] = useState(false);

  return (
    <>
      <img
        onClick={() => {
          setKebabIsopen((prev) => !prev);
        }}
        className="w-[20px] cursor-pointer absolute top-9 right-0"
        src={kebab}
        alt=""
      />
      {kebabIsOpen && (
        <div className="absolute flex flex-col gap-3 rounded bg-white  px-4 py-4  top-14 right-2 border  h-auto  ">
          <button
            onClick={() => setIsOpenUpdateModal(true)}
            className="px-6 border py-2  text-xs rounded"
          >
            Update
          </button>
        </div>
      )}
    </>
  );
};

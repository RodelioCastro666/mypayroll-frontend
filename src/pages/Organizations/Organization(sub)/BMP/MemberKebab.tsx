import { useState } from "react";
import kebab from "../../../../Assets/icons8-menu-vertical-64.png";
import { useAuth } from "../../../../auth/AuthProvider";
import { useAxiosRefreshRequest } from "../../../../auth/useAxiosRefreshRequest";
import { useEffect } from "react";
interface MemberKebabProps {
  userEmail: string;
  orgAlias: string;
}
export const MemberKebab = (props: MemberKebabProps) => {
  const [kebabIsOpen, setKebabIsopen] = useState(false);
  const { branches, setBranch } = useAuth();
  const axiosRequest = useAxiosRefreshRequest();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBranches = async () => {
      try {
        const response = await axiosRequest.get(
          `/organizations/${props.orgAlias}/branches`,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);

        isMounted && setBranch(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBranches();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  console.log(branches);
  return (
    <>
      <img
        onClick={() => {
          setKebabIsopen((prev) => !prev);
        }}
        className="w-[20px] cursor-pointer absolute top-[10] right-1"
        src={kebab}
        alt=""
      />

      {kebabIsOpen && (
        <div className="absolute flex flex-col gap-3 rounded bg-white  px-4 py-4  top-14 right-2 border  h-auto  ">
          <button
            onClick={() => setKebabIsopen(true)}
            className="px-2 border py-2  text-xs rounded"
          >
            Manage Member
          </button>
        </div>
      )}
      <select name="branches" id="">
        <option value="select">Select a Branch</option>
        {branches &&
          branches.map((branch) => (
            <option value={branch.name} key="">
              {branch.name}
            </option>
          ))}
      </select>
    </>
  );
};

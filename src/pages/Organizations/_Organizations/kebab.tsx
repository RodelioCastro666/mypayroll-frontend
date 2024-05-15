import { useState } from "react";
import kebab from "../../../Assets/icons8-menu-vertical-64.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UpdateOrganization } from "../OrganizationModal/UpdateOrganization";
import { DeleteOrganizations } from "../OrganizationModal/DeleteOrganizations";
import { toast } from "sonner";
interface IKebabProps {
  invitationCode: string;
  orgAlias: string;
}

const Kebab = (props: IKebabProps) => {
  const [kebabIsOpen, setKebabIsopen] = useState(false);
  const [setIsCopied] = useState(false);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <>
      <img
        onClick={() => {
          setKebabIsopen((prev) => !prev);
        }}
        className="w-[20px] cursor-pointer absolute top-[10] right-0"
        src={kebab}
        alt=""
      />
      {kebabIsOpen && (
        <div className="absolute flex flex-col gap-3 rounded bg-white  px-4 py-4  top-14 right-2 border  h-auto  ">
          <CopyToClipboard text={props.invitationCode} onCopyText={onCopyText}>
            <button
              onClick={() =>
                toast.info(`Copied Invitation Code (${props.invitationCode})`)
              }
              className="my-custom-style text-xs"
            >
              Copy Invitation Code
            </button>
          </CopyToClipboard>
          <button
            onClick={() => setIsOpenUpdateModal(true)}
            className="my-custom-style text-xs "
          >
            Edit
          </button>
        </div>
      )}
      <UpdateOrganization
        isOpen={isOpenUpdateModal}
        closeModal={() => setIsOpenUpdateModal(false)}
        orgAlias={props.orgAlias}
      />
    </>
  );
};

export default Kebab;

import { useState } from "react";
import kebab from "../../../Assets/icons8-menu-vertical-64.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Kebab = ({ invitationCode }) => {
  const [kebabIsOpen, setKebabIsopen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [invCode] = useState(invitationCode);

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
        className="w-[20px] cursor-pointer"
        src={kebab}
        alt=""
      />
      {kebabIsOpen && (
        <CopyToClipboard text={invitationCode} onCopyText={onCopyText}>
          <div className="bg-white border absolute top-20 right-6 w-[150px] h-[200px] p-2 shadow-md ">
            <button className="px-2 py-2 border text-xs">
              Copy Invitation Code
            </button>
          </div>
        </CopyToClipboard>
      )}
    </>
  );
};

export default Kebab;

import emptyImage from "../Assets/no-results (1).png";

export const PolarBear = (props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center  items-center">
      <img className="w-[700px] h-[500px]" src={emptyImage} alt="" />
      <p className="text-gray-400 text-2xl">{props.content}</p>
    </div>
  );
};

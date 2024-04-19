import { useParams } from "react-router-dom";

export const SpecificORg = () => {
  const { id } = useParams();

  console.log(id);
  return <div>SINGLE ORGS</div>;
};

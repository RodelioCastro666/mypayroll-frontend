import axios from "../../../api/axios";
import { useAuth } from "../../../auth/AuthProvider";
import { Nav } from "../../../components/Nav";

export const Organizations = () => {
  const { access_token } = useAuth();

  const getOrg = async () => {
    const response = await axios.get("/organizations/");

    console.log(access_token);
    console.log(response);
  };

  console.log("Organizations");

  return (
    <div>
      {/* //header */}
      <div className="w-screen bg-red-100 h-[70px]"></div>
      <Nav />

      {/* //main content */}
      <div className="h-screen flex justify-center items-center">
        ORG SCREEEEN
        <button
          onClick={() => {
            getOrg();
          }}
        >
          TESTING
        </button>
      </div>
    </div>
  );
};

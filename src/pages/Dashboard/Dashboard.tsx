import { useAuth } from "../../auth/AuthProvider";
import { PolarBear } from "../../components/EmptyPages";
import { useQueryClient } from "@tanstack/react-query";
export const Dashboard = () => {
  const queryClient = useQueryClient();

  const { access_token } = useAuth();
  const { refresh_token } = useAuth();

  console.log("ACCESS" + refresh_token);

  console.log("REFRESH" + access_token);

  queryClient.invalidateQueries({ queryKey: ["Profile"] });
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* Dashboard Screenddd
      <button onClick={() => setAccessToken()}>RESET</button>
      <button onClick={() => refresh()}>Refresh</button>
      ddd
      <button
        onClick={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setAccessToken();
        }}
      >
        LOGOUT
      </button> */}
      <PolarBear content="Nothing to see here yet" />
    </div>
  );
};

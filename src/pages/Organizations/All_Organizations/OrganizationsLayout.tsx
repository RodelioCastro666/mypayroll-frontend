// import axios from "../../../api/axios";

import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const OrganizationsLayout = () => {
  return (
    <div className="h-ful">
      <Toaster richColors />

      <Outlet />
    </div>
  );
};

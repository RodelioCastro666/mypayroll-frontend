import "./style.css";

import { useState, useEffect } from "react";

import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../requestCalls/requestUser";
import { useQueryClient } from "@tanstack/react-query";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export const Login = () => {
  const { setAccessToken } = useAuth();
  const { setRefreshToken } = useAuth();

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const [login] = useSearchParams();

  console.log(login.get("at"));
  console.log(login.get("rf"));

  const loginDelay = (data) => {
    setTimeout(() => {
      setAccessToken(data.headers["access-token"]);
      setRefreshToken(data.headers["refresh-token"]);

      localStorage.setItem("access_token", data.headers["access-token"]);
      localStorage.setItem("refresh_token", data.headers["refresh-token"]);
      navigate("/dashboard", { replace: true });
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
      window.location.reload(false);
    }, 1000);
  };

  const mutation = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      console.log("refresh", data.headers["refresh-token"]);
      console.log("accesss", data.headers["access-token"]);
      toast.success("Successfully Login");

      loginDelay(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (login.get("at") && login.get("rf")) {
      toast.success("GOOGLE AUTH SUCCESS");
      setAccessToken(login.get("at"));
      setRefreshToken(login.get("rf"));

      localStorage.setItem("access_token", login.get("at"));
      localStorage.setItem("refresh_token", login.get("rf"));
      navigate("/dashboard", { replace: true });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("LOG IN");
    console.log(user, password);
    mutation.mutate({
      email: user,
      password: password,
    });
  };

  return (
    <div>
      <Toaster richColors />
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-[480px] flex-col gap-4 px-16 py-8"
        >
          <div>
            <h1 className="mb-2 text-start text-3xl font-bold">
              Hey there, Welcome!
            </h1>
            <h2 className="text-gray-500">Sign in to continue</h2>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-500">
              Email
            </label>
            <input
              type="email"
              name=""
              id="email"
              placeholder="e.g. example@company.org"
              className="rounded border-[1px] border-gray-500 px-4 py-1"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-500">
              Password
            </label>
            <div className="relative">
              <input
                type={hiddenPassword ? "password" : "text"}
                name=""
                id="password"
                className="w-full rounded border-[1px] border-gray-500 px-4 py-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                className="absolute right-2 top-1/4"
                onClick={() => setHiddenPassword((prev) => !prev)}
              >
                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="rounded bg-[#0C0C0C] px-4 py-1.5 text-white"
          >
            Sign in
          </button>
          <span className="text-center text-sm text-gray-500">or</span>
          <button className="flex flex-row items-center justify-center gap-2 rounded border-[1px] border-black px-4 py-1.5">
            <FcGoogle />
            <a href="http://abc.com:3000/api/auth/google">
              {" "}
              Continue with Google
            </a>
          </button>
          <button className="flex flex-row items-center justify-center gap-2 rounded border-[1px] border-black px-4 py-1.5">
            <FaFacebook color="#1877F2" />
            Continue with Facebook
          </button>
          <div className="flex flex-row items-center justify-center gap-1 text-sm text-gray-500">
            <span>No account?</span>
            <Link to="/register" className="text-blue-500">
              Create One
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

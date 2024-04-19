import googleLogo from "../../Assets/flat-color-icons_google.png";
import fbLogo from "../../Assets/devicon_facebook.png";
import "./style.css";
import { useEffect, useRef, useState } from "react";

import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../requestCalls/requestUser";

import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export const Login = () => {
  const { setAccessToken } = useAuth();
  const { setRefreshToken } = useAuth();

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      // console.log("refresh", data.headers["refresh-token"]);
      // console.log("accesss", data.headers["access-token"]);
      // setAccessToken(data.headers["access-token"]);
      // setRefreshToken(data.headers["refresh-token"]);
      // navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccessToken("KKKK");
    setRefreshToken("KKKK");
    navigate("/dashboard", { replace: true });
    console.log(user, password);
    // mutation.mutate({
    //   email: user,
    //   password: password,
    // });

    console.log("KKK");
  };

  return (
    <div>
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
          <button className="rounded bg-[#0C0C0C] px-4 py-1.5 text-white">
            Sign in
          </button>
          <span className="text-center text-sm text-gray-500">or</span>
          <button className="flex flex-row items-center justify-center gap-2 rounded border-[1px] border-black px-4 py-1.5">
            <FcGoogle />
            Continue with Google
          </button>
          <button className="flex flex-row items-center justify-center gap-2 rounded border-[1px] border-black px-4 py-1.5">
            <FaFacebook color="#1877F2" />
            Continue with Facebook
          </button>
          <div className="flex flex-row items-center justify-center gap-1 text-sm text-gray-500">
            <span>No account?</span>
            <Link to="/registration" className="text-blue-500">
              Create One
            </Link>
          </div>
        </form>
      </div>
    </div>
  );

  {
    /* <div className="h-screen g-screen bg-[#F5F7F8] flex justify-center items-center text-center ">
        <form className="containerSignUp" onSubmit={handleSubmit}>
          <h1 className=" text-[2rem] tracking-wider ">Sign in to Payroll</h1>

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="inputSignUP"
            type="email"
            placeholder="Username"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="inputSignUP"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button className="btnLogin">Login</button>
        </form>

        <div className="mt-3">Create Account</div>
        <div className="grid grid-cols-[1fr_30px_1fr] justify-center items-center">
          <hr className="border-[1px] border-black" />
          <span>or</span>
          <hr className="border-[1px] border-black" />
        </div>
        <button className="btnLink">
          <img className="inline-block mr-2 " src={googleLogo} alt="" />
          Continue with Google
        </button>
        <button className="btnLink">
          <img className="inline-block mr-2 " src={fbLogo} alt="" />
          Continue with Facebook
        </button>
      </div> */
  }
};

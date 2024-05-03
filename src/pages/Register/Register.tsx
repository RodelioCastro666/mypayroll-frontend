import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../requestCalls/requestUser";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAxiosRefreshRequest } from "../../auth/useAxiosRefreshRequest";
import { useQueryClient } from "@tanstack/react-query";

// const USER_VALIDATION = /^[A-z][A-z0-9-_]{3,23}$/;
// const PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = () => {
  const { setAccessToken } = useAuth();
  const { setRefreshToken } = useAuth();
  // User Credentials
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPass, setMatchPass] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // crete NewUser
  const mutation = useMutation({
    mutationFn: async (userCredentials) => registerUser(userCredentials),
    onSuccesss: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click");

    console.log(firstname, lastname, email, password);
    if (matchPass === password) {
      console.log("matched");

      mutation.mutate({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      });
    }
  };

  if (mutation.isSuccess) {
    // console.log("KKK");
    // console.log("success");
    console.log(mutation.data);
    // console.log("refresh", mutation.data.headers["refresh-token"]);
    // console.log("accesss", mutation.data.headers["access-token"]);
    setAccessToken(mutation.data.headers["access-token"]);
    setRefreshToken(mutation.data.headers["refresh-token"]);
    localStorage.setItem("access_token", mutation.data.headers["access-token"]);
    localStorage.setItem(
      "refresh_token",
      mutation.data.headers["refresh-token"]
    );

    navigate("/dashboard", { replace: true });
    queryClient.invalidateQueries({ queryKey: ["Profile"] });
  }

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="flex w-[480px] flex-col gap-4 px-16">
        <div>
          <h1 className="mb-2 text-start text-3xl font-bold">
            Create your account
          </h1>
          <h2 className="text-gray-500">Sign up to continue.</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-2 flex flex-col md:col-span-1">
            <label htmlFor="firstName" className="mb-1 text-gray-500">
              First Name
            </label>
            <input
              type="text"
              name=""
              id="firstName"
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="e.g. john"
              className="rounded border-[1px] border-gray-500 px-4 py-1"
            />
          </div>
          <div className="col-span-2 flex flex-col md:col-span-1">
            <label htmlFor="lastName" className="mb-1 text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              name=""
              id="lastName"
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="e.g. doe"
              className="rounded border-[1px] border-gray-500 px-4 py-1"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-500">
              Email
            </label>
            <input
              type="email"
              name=""
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. example@company.org"
              className="w-full rounded border-[1px] border-gray-500 px-4 py-1"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-500">
              Password
            </label>
            <div className="relative">
              <input
                type={hiddenPassword ? "password" : "text"}
                name=""
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border-[1px] border-gray-500 px-4 py-1"
              />
              <button
                className="absolute right-2 top-1/4"
                onClick={() => setHiddenPassword((prev) => !prev)}
              >
                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="col-span-2 flex flex-col">
            <label
              htmlFor="passwordConfirmation"
              className="mb-1 text-gray-500"
            >
              Password Confirmationsss
            </label>
            <div className="relative">
              <input
                type={hiddenPassword ? "password" : "text"}
                name=""
                id="passwordConfirmation"
                required
                onChange={(e) => setMatchPass(e.target.value)}
                className="w-full rounded border-[1px] border-gray-500 px-4 py-1"
              />
              <button
                className="absolute right-2 top-1/4"
                onClick={() => setHiddenPassword((prev) => !prev)}
              >
                {hiddenPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="col-span-2 flex flex-wrap gap-1 text-sm text-gray-500">
            <p>By signing up, you agree to our</p>
            <Link to="" className="text-blue-500">
              Terms of Use
            </Link>
            <p>and</p>
            <Link to="" className="text-blue-500">
              Privacy Policy.
            </Link>
          </div>
          <div className="col-span-2">
            <button
              className="w-full rounded bg-black px-4 py-1.5 text-white"
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </div>
          <div className="col-span-2 flex flex-wrap items-center justify-center gap-1 text-sm text-gray-500">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

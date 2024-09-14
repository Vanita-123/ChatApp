import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

import { UseAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";

function SignIn() {
  const [setAuthUser] = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    // axios.post("http://localhost:8002/user/login", userInfo)   //before check to api testing purpose
    axios
      .post("/api/user/login", userInfo) // //purpose of in this api using front end and backend connected same port
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("Login Successfully");
          localStorage.setItem("chat", JSON.stringify(response.data));
          setAuthUser(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-black p-9 space-y-4"
        >
          <h1 className="font-semibold text-2xl text-blue-500">Chat-App</h1>
          <h2 className="text-xl items-center">Sign in to your account</h2>

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>
          {errors.email && (
            <span className="text-red-600 text-sm font-serif">
              {errors.email.message}
            </span>
          )}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>
          {errors.password && (
            <span className="text-red-600 text-sm font-serif">
              {errors.password.message}
            </span>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              className="font-sans text-xl bg-blue-800 w-full p-1 border rounded-xl text-white hover:bg-slate-600"
              value="Login"
            />
          </div>

          <p>
            Do not have an account?{" "}
            <Link
              to={"/SignUp"}
              className="font-sans cursor-pointer text-blue-500 underline m-3"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;

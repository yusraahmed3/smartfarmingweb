import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import FormErrors from "./FormErrors";
import { Button } from "./Button";
import { Loadingpage } from "./Loadingpage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/authSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

function LoginForm() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { loading, success, user, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log(message);
    toast.configure();
    message &&
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
  }, [message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    dispatch(login({ formData: data, navigate }));
    // dispatch(signIn(data, navigate));
  };

  // check if user logged in. if so, redirect to home page
  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate, user, success]);

  return (
    <>
      {loading && <Loadingpage />}
      <div className="">
        <Navbar />
        <div className="flex my-14  justify-center ">
          <div className="w-full flex flex-col gap-y-6">
            <h1 className="text-xl md:text-2xl font-bold flex flex-col gap-3 items-center">
              <AiOutlineLock />
              Login
            </h1>
            <div className="w-full px-4 md:px-0 md:w-1/2 lg:w-1/3 flex flex-col gap-4 mx-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-3"
              >
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Field required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className="border border-gray-700 p-4 rounded-lg outline-none focus:border-2 focus:border-buttonColor"
                />
                <FormErrors errors={errors.email?.message} />
                <div className="w-full relative ">
                  <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Field required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className="w-full p-4 rounded-lg border border-gray-700  outline-none focus:border-2 focus:border-buttonColor"
                  />
                  <i
                    onClick={toggleVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </i>
                </div>
                <FormErrors errors={errors.password?.message} />

                <Button
                  type="submit"
                  text="Log in"
                  size="w-full"
                  color="bg-buttonColor"
                  textColor="text-white"
                />
              </form>
              <ul className="flex flex-col md:flex-row justify-between items-center md:items-start gap-y-10">
                <Link to="#">
                  <li className="text-primaryColor font-bold">
                    Forgot password?
                  </li>
                </Link>
                <Link to="/request" className="">
                  <li className="text-primaryColor font-bold">
                    Request for an account?
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

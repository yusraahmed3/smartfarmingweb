import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import FormErrors from "./FormErrors";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../redux/features/requestSlice";
import { Loadingpage } from "./Loadingpage";
import { toast } from "react-toastify";

function Request() {
  const { loading, message } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    // empty default values
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneno: "",
      company: "",
      password: "",
      confirmpwd: "",
      message: "",
      photo: "",
    },
  });
  const password = useRef({});
  password.current = watch("password", "");

  // field validations
  const registerErrors = {
    firstName: { required: "Field required" },
    lastName: { required: "Field required" },
    email: {
      required: "Field required",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter a valid email",
      },
    },
    phoneno: {
      required: "Field required",
      minLength: {
        value: 4,
        message: "minimum of 4 digits",
      },
      maxLength: {
        value: 15,
        message: "maximum of 15 digits",
      },
    },
    company: { required: "Field required" },
    password: {
      required: "Field required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    },
    confirmpwd: {
      required: "Field required",
      validate: (value) =>
        value === password.current || "Passwords do not match",
    },
    message: { required: "Field required" },
  };

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

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneno", data.phoneno);
    formData.append("company", data.company);
    formData.append("message", data.message);
    formData.append("password", data.password);
    formData.append("confirmpwd", data.confirmpwd);
    formData.append("photo", data.photo[0]);
    dispatch(sendRequest({ formData }));
    reset();
  };
  return (
    <>
      {loading && <Loadingpage />}
      <Navbar />
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="font-bold text-2xl text-center text-black mt-5">
          Send us a request
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-x-10 w-full md:w-3/4  p-5"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-y-2 w-full ">
            <label htmlFor="firstName">First Name</label>
            <input
              {...register("firstName", registerErrors.firstName)}
              name="firstName"
              placeholder="John"
              className="border border-black rounded-md p-3 outline-none focus:border-primaryColor focus:border-2"
            />
            <FormErrors errors={errors.firstName?.message} />
            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName", registerErrors.lastName)}
              placeholder="Doe"
              name="lastName"
              className="border border-black rounded-md  p-3 outline-none focus:border-primaryColor focus:border-2"
            />
            <FormErrors errors={errors.lastName?.message} />
            <label htmlFor="email">Email</label>
            <input
              {...register("email", registerErrors.email)}
              placeholder="johndoe@example.com"
              type="email"
              name="email"
              className="border border-black rounded-md  p-3 outline-none focus:border-primaryColor focus:border-2"
            />
            <FormErrors errors={errors.email?.message} />
            <label htmlFor="phoneno">Phone number</label>
            <input
              {...register("phoneno", registerErrors.phoneno)}
              placeholder="+966-4521486"
              name="phoneno"
              className="border border-black rounded-md  p-3 outline-none focus:border-primaryColor focus:border-2"
            />
            <FormErrors errors={errors.phoneno?.message} />

            <label htmlFor="photo">Upload a clear photo of your ID</label>
            <input name="photo" type="file" {...register("photo")} />
          </div>

          <div className="flex flex-col gap-y-2 w-full ">
            <label htmlFor="company">Company</label>
            <input
              {...register("company", registerErrors.company)}
              placeholder="MOFED"
              name="company"
              className="border border-black rounded-md  p-3 outline-none focus:border-primaryColor focus:border-2"
            />
            <FormErrors errors={errors.company?.message} />
            <label htmlFor="password">Password</label>
            <input
              {...register("password", registerErrors.password)}
              name="password"
              type="password"
              className="border border-black rounded-md  p-3 outline-none focus:border-primaryColor focus:border-2"
            />
            <FormErrors errors={errors.password?.message} />
            <label htmlFor="confirmpwd">Confirm Password</label>
            <input
              {...register("confirmpwd", registerErrors.confirmpwd)}
              name="confirmpwd"
              type="password"
              className="border border-black rounded-md  p-3 outline-none focus:border-primaryColor focus:border-2"
            />
            <FormErrors errors={errors.confirmpwd?.message} />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              type="text"
              rows="5"
              {...register("message", registerErrors.message)}
              placeholder="Describe your purpose"
              className="border border-black rounded-md p-3 outline-none focus:border-primaryColor   focus:border-2"
            />
            <FormErrors errors={errors.message?.message} />
            <button
              type="submit"
              className="bg-buttonColor text-textColor  w-32 rounded-md p-2 self-end "
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Request;

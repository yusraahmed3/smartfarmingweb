
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { isDemoMode } from "../demoMode";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Navbar from "./Navbar";
import FormErrors from "./FormErrors";
import { Loadingpage } from "./Loadingpage";
import { login } from "../redux/features/authSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message && !isDemoMode) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
    }
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

  const onSubmit = (data) => {
    if (isDemoMode) {
      toast.info(
        "Account sign-in is unavailable in this demo. Please use Explore Demo.",
        {
          position: "top-center",
          autoClose: 4000,
        }
      );
      return;
    }

    dispatch(login({ formData: data, navigate }));
  };

  const handleExploreDemo = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2]">
      {!isDemoMode && loading && <Loadingpage />}

      <Navbar />

      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-stretch gap-8 px-5 py-8 md:px-10 lg:grid-cols-2 lg:gap-12 lg:py-12">

        {/* Left: Brand introduction */}
        <section className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl bg-[#244D3A] p-8 text-white md:p-12 lg:min-h-[600px]">

          <div className="relative z-10">
            <p className="mb-8 text-xs uppercase tracking-[0.3em] text-[#C6D9C8]">
              Smart Agriculture Platform
            </p>

            <h1 className="max-w-lg font-serif text-4xl leading-tight md:text-5xl xl:text-6xl">
              Grow smarter.
              <span className="mt-2 block italic text-[#C9D9B3]">
                Farm better.
              </span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-8 text-[#D5E2D8]">
              Bringing technology and agriculture together
              in one connected experience.
            </p>
          </div>

          {/* Decorative agricultural landscape */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden"
          >
            <div className="absolute bottom-[-160px] left-[-25%] h-[320px] w-[110%] rotate-[-12deg] rounded-[50%] bg-[#386C4D]" />

            <div className="absolute bottom-[-180px] right-[-35%] h-[320px] w-[110%] rotate-[12deg] rounded-[50%] bg-[#4D8055]" />

            <div className="absolute bottom-[-215px] left-[-10%] h-[320px] w-[110%] rounded-[50%] bg-[#193F30]" />
          </div>

          <p className="relative z-10 mt-32 text-xs uppercase tracking-[0.2em] text-[#D5E2D8]">
            Technology for a greener future
          </p>
        </section>

        {/* Right: Login and Demo Access */}
        <section className="flex items-center justify-center py-8 lg:py-12">
          <div className="w-full max-w-md">

            {/* Welcome */}
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#548164]">
              Welcome to Smart Farming
            </p>

            <h2 className="font-serif text-4xl text-[#233A2D] md:text-5xl">
              Welcome back.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77847A]">
              Sign in to your account or explore the platform.
            </p>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 space-y-6"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#334D3D]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Field required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className="w-full rounded-lg border border-[#D9E1D7] bg-white px-4 py-4 text-[#233A2D] outline-none transition-colors focus:border-[#548164] focus:ring-2 focus:ring-[#548164]/20"
                />

                <FormErrors errors={errors.email?.message} />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#334D3D]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Field required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must be at least 8 characters",
                      },
                    })}
                    className="w-full rounded-lg border border-[#D9E1D7] bg-white px-4 py-4 pr-12 text-[#233A2D] outline-none transition-colors focus:border-[#548164] focus:ring-2 focus:ring-[#548164]/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-[#748678] hover:text-[#244D3A]"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                </div>

                <FormErrors errors={errors.password?.message} />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={!isDemoMode && loading}
                className="w-full rounded-lg bg-[#244D3A] px-6 py-4 font-medium text-white transition-colors hover:bg-[#356B4D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {!isDemoMode && loading
                  ? "Signing in..."
                  : "Sign in →"}
              </button>
            </form>

            {/* Demo Access */}
            {isDemoMode && (
              <div className="mt-7">

                {/* Divider */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#D9E1D7]" />

                  <span className="text-xs uppercase tracking-widest text-[#8A958C]">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#D9E1D7]" />
                </div>

                {/* Explore Demo Button */}
                <button
                  type="button"
                  onClick={handleExploreDemo}
                  className="w-full rounded-lg border border-[#244D3A] bg-transparent px-6 py-4 font-medium text-[#244D3A] transition-colors hover:bg-[#EAF0E7]"
                >
                  Explore Demo →
                </button>

                <p className="mt-4 text-center text-xs leading-6 text-[#8A958C]">
                  No account required.
                  <br />
                  All sensor readings are simulated.
                </p>
              </div>
            )}

            {/* Account Links */}
            <div className="mt-7 flex flex-wrap justify-end gap-4 text-sm">

              {!isDemoMode && (
                <Link
                  to="#"
                  className="font-medium text-[#548164] hover:underline"
                >
                  Forgot password?
                </Link>
              )}

              <Link
                to="/request"
                className="font-medium text-[#548164] hover:underline"
              >
                Request an account ↗
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-12 border-t border-[#D9E1D7] pt-6">
              <p className="text-xs leading-6 text-[#8A958C]">
                Smart Farming · Agricultural Technology
              </p>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default LoginForm;

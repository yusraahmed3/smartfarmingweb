import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit, MdOutlinePerson } from "react-icons/md";

import Sidebar from "./Sidebar";
import { updateUserAction } from "../redux/features/authSlice";
import { isDemoMode } from "../demoMode";

const STORAGE_KEY = "smartfarming-demo-profile";
const isDevelopment = isDemoMode;
const emptyProfile = {
  name: "",
  email: "",
  company: "",
  phoneno: "",
  photo: "",
};

function getSavedProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    return {
      ...emptyProfile,
      ...saved,
    };
  } catch {
    return emptyProfile;
  }
}

function ManageAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { user, loading } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(() =>
    isDevelopment ? getSavedProfile() : { ...emptyProfile, ...user },
  );

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
  });

  useEffect(() => {
    if (!isDevelopment && user) {
      const nextProfile = {
        ...emptyProfile,
        ...user,
      };

      setProfile(nextProfile);
      reset(nextProfile);
    }
  }, [user, reset]);

  const startEditing = () => {
    reset(profile);
    setMessage("");
    setEditing(true);
  };

  const discardChanges = () => {
    reset(profile);
    setPhotoFile(null);
    setMessage("");
    setEditing(false);
  };

  const onSubmit = (data) => {
    const updatedProfile = {
      name: data.name || "",
      email: data.email || "",
      company: data.company || "",
      phoneno: data.phoneno || "",
      photo: profile.photo || "",
    };

    if (isDevelopment) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));

      setProfile(updatedProfile);
      setMessage("Your demo profile has been saved.");
      setEditing(false);
      return;
    }

    const formData = new FormData();

    formData.append("name", updatedProfile.name);
    formData.append("email", updatedProfile.email);
    formData.append("company", updatedProfile.company);
    formData.append("phoneno", updatedProfile.phoneno);

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    dispatch(updateUserAction({ formData }));
    setEditing(false);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Please select an image smaller than 2 MB.");
      return;
    }

    setPhotoFile(file);

    if (isDevelopment) {
      const reader = new FileReader();

      reader.onload = () => {
        const updatedProfile = {
          ...profile,
          photo: reader.result,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));

        setProfile(updatedProfile);
        setMessage("Profile picture updated.");
      };

      reader.readAsDataURL(file);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#DCE5DA] bg-[#FAFBF8] px-4 py-3 text-sm text-[#244D3A] outline-none transition focus:border-[#548164] disabled:cursor-default disabled:opacity-80";

  const fields = [
    {
      name: "name",
      label: "Display name",
      placeholder: "Enter your name",
      type: "text",
    },
    {
      name: "company",
      label: "Company",
      placeholder: "Enter your company",
      type: "text",
    },
    {
      name: "email",
      label: "Email address",
      placeholder: "Enter your email",
      type: "email",
    },
    {
      name: "phoneno",
      label: "Contact number",
      placeholder: "Enter your phone number",
      type: "tel",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F6F2]">
      <Sidebar />

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-7 text-sm font-medium text-[#548164] hover:text-[#244D3A]"
          >
            ← Back to dashboard
          </button>

          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#548164]">
              Account management
            </p>

            <h1 className="font-serif text-4xl text-[#244D3A]">
              Your account.
            </h1>

            <p className="mt-3 text-sm text-[#718375]">
              Manage your personal information and profile preferences.
            </p>
          </div>

          {/* Profile header */}
          <section className="mb-6 rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center gap-5">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#E3F0E2]">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <MdOutlinePerson size={48} color="#244D3A" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-[#244D3A] p-2 text-white shadow-sm"
                  title="Change profile picture"
                >
                  <MdOutlineEdit size={16} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-2xl text-[#244D3A]">
                  {profile.name || "Your profile"}
                </h2>

                <p className="mt-1 text-sm text-[#718375]">
                  {profile.email || "No email address provided"}
                </p>

                <span className="mt-3 inline-block rounded-full bg-[#E3F0E2] px-3 py-1 text-xs font-medium text-[#326547]">
                  {isDevelopment ? "Demo account" : "Smart Farming account"}
                </span>
              </div>
            </div>
          </section>

          {/* Personal information */}
          <section className="mb-6 rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#244D3A]">
                  Personal information
                </h2>

                <p className="mt-2 text-sm text-[#718375]">
                  Keep your account details up to date.
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={startEditing}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D8E3D6] px-4 py-2 text-sm font-medium text-[#244D3A] hover:bg-[#F5F6F2]"
                >
                  <MdOutlineEdit size={17} />
                  Edit profile
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-5 md:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-medium text-[#52665A]"
                    >
                      {field.label}
                    </label>

                    <input
                      id={field.name}
                      type={field.type}
                      placeholder={editing ? field.placeholder : "Not provided"}
                      disabled={!editing}
                      {...register(field.name, {
                        required:
                          field.name === "name"
                            ? "Display name is required."
                            : false,
                      })}
                      className={inputClass}
                    />

                    {errors[field.name] && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {editing && (
                <div className="mt-8 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={discardChanges}
                    className="rounded-xl border border-[#D8E3D6] px-6 py-3 text-sm font-medium text-[#244D3A]"
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    disabled={!isDevelopment && loading}
                    className="rounded-xl bg-[#244D3A] px-6 py-3 text-sm font-medium text-white hover:bg-[#326547] disabled:opacity-50"
                  >
                    {loading && !isDevelopment ? "Saving..." : "Save changes"}
                  </button>
                </div>
              )}
            </form>

            {message && (
              <p
                role="status"
                className="mt-5 rounded-xl bg-[#E3F0E2] p-4 text-sm text-[#326547]"
              >
                {message}
              </p>
            )}
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-2xl text-[#244D3A]">
              Account security
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#718375]">
              Password management is unavailable in this interactive demo. No
              real user account is created.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed rounded-xl border border-[#D8E3D6] px-5 py-3 text-sm text-[#718375] opacity-60"
            >
              Change password
            </button>
          </section>

          {isDevelopment && (
            <p className="mt-5 text-xs leading-5 text-[#8A988C]">
              Demo mode: profile information is stored locally in your browser.
              It is not connected to a real account or database.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ManageAccount;

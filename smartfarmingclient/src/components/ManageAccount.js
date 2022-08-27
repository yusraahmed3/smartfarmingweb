import Sidebar from "./Sidebar";
import Avatar from "./Avatar";
import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../redux/features/authSlice";
import { useForm } from "react-hook-form";
import { Loadingpage } from "./Loadingpage";
import { AiFillEdit } from "react-icons/ai";
import ScreenTitles from "./ScreenTitles";

function ManageAccount() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => ({
    ...state.auth,
  }));
  // const { loading } = useSelector((state) => state.userUpdate);

  // open dialog box on click
  const handlePictureChange = () => {
    inputRef.current?.click();
  };

  const { register, handleSubmit, reset } = useForm({
    // populate the form
    defaultValues: useMemo(() => user, [user]),
  });

  const { ref, ...rest } = register("photo");
  const inputRef = useRef(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneno", data.phoneno);
    formData.append("company", data.company);
    formData.append("message", data.message);
    formData.append("password", data.password);
    formData.append("confirmpwd", data.confirmpwd);
    formData.append("photo", data.photo[0]);
    dispatch(updateUserAction({ formData }));
  };

  // reset fields
  const discardChanges = () => {
    reset();
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="p-2 flex-1 h-screen overflow-y-auto">
        <ScreenTitles title="Manage Account" />
        <div className="flex flex-col w-full md:w-3/4 lg:w-1/2   bg-primaryColor rounded-md p-5 mx-auto mt-8">
          {loading && <Loadingpage />}

          <div className="flex flex-col items-center gap-y-3 p-5">
            <span className="flex items-end gap-x-3">
              <Avatar image={user?.photo} size="w-24 h-24" />
              <span
                onClick={handlePictureChange}
                className="text-gray-300 text-lg cursor-pointer"
              >
                <AiFillEdit />
              </span>
            </span>
            <h2 className="text-lg text-gray-200 font-bold">
              Personal Information
            </h2>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="file"
              name="photo"
              {...rest}
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
              className="hidden"
            />
            <div className="flex flex-col lg:flex-row justify-around mt-8">
              <div className="">
                <div className="flex flex-col py-3">
                  <span className="text-gray-600">Display name</span>

                  <input
                    {...register("name")}
                    name="name"
                    className="text-textColor bg-transparent"
                  />
                </div>
                <div className="flex flex-col py-3">
                  <span className="text-gray-600">Email address</span>
                  <input
                    {...register("email")}
                    className="text-textColor  bg-transparent"
                  />
                </div>
                <div className="flex flex-col py-3">
                  <span className="text-gray-600">Password</span>
                  <input
                    type="password"
                    {...register("password")}
                    className="text-textColor bg-transparent"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col py-3">
                  <span className="text-gray-600">Company</span>
                  <input
                    {...register("company")}
                    className="text-textColor  bg-transparent"
                  />
                </div>
                <div className="flex flex-col py-3">
                  <span className="text-gray-600">Contact number</span>
                  <input
                    {...register("phoneno")}
                    className="text-textColor  bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-x-5 self-end ">
              <button
                onClick={discardChanges}
                className="text-white hover:underline underline-offset-8 "
              >
                Discard
              </button>
              <input
                type="submit"
                defaultValue="Save"
                className="text-white border border-buttonColor px-5 py-2 rounded-md self-end cursor-pointer hover:bg-buttonColor "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ManageAccount;

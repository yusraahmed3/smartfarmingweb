import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./Button";

const ModalNewChannel = ({ showModal, setShowModal }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      channelName: "",
      field1: "",
      field2: "",
      field3: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    showModal && (
      <div className="w-full bh-full w-full  flex fixed inset-0 backdrop-blur-sm justify-center items-center ">
        <div className="bg-gray-900 w-1/2 h-5/12 rounded-lg px-5 py-2 overflow-auto flex flex-col">
          <div className="flex pt-3">
            <span className="flex-1 ">
              <h1 className="text-xl text-gray-300">Add new channel</h1>
              <small className="text-gray-300">
                You can add up to 3 fields
              </small>
            </span>

            <span
              onClick={() => setShowModal(false)}
              className="text-white text-xl cursor-pointer"
            >
              <AiOutlineClose />
            </span>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-3 p-2 w-3/4">
              <label htmlFor="channelName" className="text-gray-300">
                Channel name
              </label>
              <input
                name="channelName"
                {...register("channelName")}
                className="border border-gray-300 bg-transparent text-gray-300 rounded-md p-2 outline-none focus:border-2 focus:border-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-y-3 p-2 w-3/4">
              <label htmlFor="field1" className="text-gray-300">
                Field 1
              </label>
              <input
                name="field1"
                {...register("field1")}
                className="border border-gray-300 bg-transparent text-gray-300 rounded-md p-2 outline-none focus:border-2 focus:border-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-y-3 p-2 w-3/4">
              <label htmlFor="field2" className="text-gray-300">
                Field 2
              </label>
              <input
                name="field2"
                {...register("field2")}
                className="border border-gray-300 bg-transparent text-gray-300 rounded-md p-2 outline-none focus:border-2 focus:border-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-y-3 p-2 w-3/4">
              <label htmlFor="field3" className="text-gray-300">
                Field 3
              </label>
              <input
                name="field3"
                {...register("field3")}
                className="border border-gray-300 bg-transparent text-gray-300 rounded-md p-2 outline-none focus:border-2 focus:border-yellow-400"
              />
            </div>
            <span className="self-end">
              <Button
                type="submit"
                color="bg-yellow-400"
                text="Save"
                size="w-24"
              />
            </span>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalNewChannel;

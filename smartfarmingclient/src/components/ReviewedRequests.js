import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Button } from "./Button";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequests,
  deleteRequest,
  reset,
} from "../redux/features/requestSlice";
import { AiFillDelete } from "react-icons/ai";
import { Loadingpage } from "./Loadingpage";
import ScreenTitles from "./ScreenTitles";
import { toast } from "react-toastify";

function ReviewedRequests() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prevPath = location.pathname;

  const { loading, requests, success, message, isDeleted } = useSelector(
    (state) => state.request
  );

  const deleteR = (id) => {
    dispatch(deleteRequest({ id }));
    dispatch(reset());
  };

  useEffect(() => {
    message &&
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
  }, [message]);

  //fetch all requests
  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch, success, isDeleted]);

  const toRequestDetail = (e, request) => {
    e.preventDefault();
    navigate("/requestdetail", { state: { request, prevPath } });
  };
  return (
    <div className="flex bg-gray-100 ">
      <Sidebar />
      <div className="p-2 flex-1  h-screen overflow-hidden">
        <ScreenTitles title="Reviewed Requests" />
        {loading && <Loadingpage />}
        <div className="bg-white rounded-md p-5 mt-2 h-full">
          {requests.length === 0 && (
            <p className="text-center text-xl">No requests</p>
          )}
          <div className="rounded-lg h-auto md:w-3/4 m-auto overflow-auto  shadow-md">
            <table className="w-full  h-full overflow-auto">
              <thead
                className={`text-left text-textColor text-base bg-buttonColor uppercase tracking-wider ${
                  requests.length !== 0 ? "sticky top-0" : "hidden"
                }`}
              >
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lighterColor  ">
                {requests?.map((request, i) => {
                  return (
                    request.status !== "pending" && (
                      <tr key={i} className="">
                        <td className="px-6 py-3 whitespace-nowrap">
                          {request.firstName + " " + request.lastName}
                        </td>
                        <td className="px-6 py-3  whitespace-nowrap">
                          {request.company}
                        </td>
                        <td className="px-6 py-3  whitespace-nowrap ">
                          <p
                            className={`${
                              request.status === "approved"
                                ? "bg-green-200 text-green-900"
                                : "bg-red-200 text-red-900"
                            } bg-opacity-50 rounded-full w-fit p-2 uppercase font-bold text-sm`}
                          >
                            {" "}
                            {request.status}
                          </p>
                        </td>
                        <td className="px-6 py-3  flex justify-center items-center h-full whitespace-nowrap">
                          <Button
                            icon={<AiFillDelete />}
                            textColor="text-darkerColor"
                            textSize="text-lg"
                            onClick={() => deleteR(request._id)}
                          />
                          <Button
                            icon={<FiMoreVertical />}
                            color="bg-transparent"
                            textColor="text-secondaryColor"
                            textSize="text-lg"
                            onClick={(e) => toRequestDetail(e, request)}
                          />
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewedRequests;

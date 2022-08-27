import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { Button } from "./Button";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequests,
  approveRequest,
  reset,
  declineRequest,
} from "../redux/features/requestSlice";
import { Loadingpage } from "./Loadingpage";
import ScreenTitles from "./ScreenTitles";
import { toast } from "react-toastify";

function ActiveRequests() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPath = location.pathname;
  const dispatch = useDispatch();
  const { loading, requests, message, success, isApproved, isDeclined } =
    useSelector((state) => state.request);

  useEffect(() => {
    if (message) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
    }
  }, [message]);

  const approveRequestHandler = (id) => {
    dispatch(approveRequest({ id }));
    dispatch(reset());
  };

  const declineRequestHandler = (id) => {
    dispatch(declineRequest({ id }));
    dispatch(reset());
  };

  // fetch all requests
  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch, success, isApproved, isDeclined]);

  // navigate to request details page
  const toRequestDetail = (e, request) => {
    e.preventDefault();
    navigate("/requestdetail", { state: { request, prevPath } });
  };
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="p-2 flex-1  h-screen overflow-hidden">
        <ScreenTitles title="Pending Requests" />
        {loading && <Loadingpage />}
        <div className="bg-white rounded-md w-full p-5 mt-2 h-full">
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
              <tbody className="divide-y divide-lighterColor ">
                {requests &&
                  requests?.map((request, i) => {
                    return (
                      request.status === "pending" && (
                        <tr key={i} className="">
                          <td className="px-6 py-3 whitespace-nowrap">
                            {request.firstName + " " + request.lastName}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            {request.company}
                          </td>
                          <td className="px-6 py-3">
                            <p className="bg-yellow-200 text-yellow-900 bg-opacity-50 rounded-full w-fit p-2 uppercase font-bold text-sm">
                              {request.status}
                            </p>
                          </td>
                          <td className="px-6 py-3 flex justify-center items-center h-full">
                            <Button
                              icon={<BsFillHandThumbsUpFill />}
                              color="bg-transparent"
                              textColor="text-green-300"
                              textSize="text-lg"
                              onClick={() => approveRequestHandler(request._id)}
                            />
                            <Button
                              icon={<BsFillHandThumbsDownFill />}
                              color="bg-transparent"
                              textColor="text-red-400"
                              textSize="text-lg"
                              onClick={() => declineRequestHandler(request._id)}
                            />
                            <Button
                              icon={<FiMoreVertical />}
                              color="bg-transparent"
                              textColor="text-gray-900"
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

export default ActiveRequests;

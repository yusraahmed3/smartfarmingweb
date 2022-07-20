import React, { useEffect, useState } from "react";
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
  approveRequest,
  fetchRequests,
  rejectRequest,
} from "../actions/request";
import { Loadingpage } from "./Loadingpage";
import ScreenTitles from "./ScreenTitles";

function ActiveRequests() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPath = location.pathname;
  const dispatch = useDispatch();
  const { loading, requests } = useSelector((state) => state.requestReducer);
  const { success: approveSuccess } = useSelector(
    (state) => state.approveRequest
  );
  const { success: declineSuccess } = useSelector(
    (state) => state.rejectRequest
  );

  // fetch all requests
  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch, approveSuccess, declineSuccess]);

  // navigate to request details page
  const toRequestDetail = (e, request) => {
    e.preventDefault();
    navigate("/requestdetail", { state: { request, prevPath } });
  };
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="p-2 flex-1  h-screen overflow-y-auto">
        <ScreenTitles title="Pending Requests" />
        {loading && <Loadingpage />}
        <div className="bg-white rounded-md w-full p-5 mt-2">
          <div className="rounded-lg md:w-3/4 m-auto overflow-auto shadow-md">
            <table className="w-full ">
              <thead className="text-left text-textColor text-base bg-buttonColor uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lighterColor">
                {requests?.reverse().map((request, i) => {
                  return (
                    request.status === "pending" && (
                      <tr key={i} className=" ">
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
                        <td className="px-6 py-3 whitespace-nowrap text-right flex">
                          <Button
                            icon={<BsFillHandThumbsUpFill />}
                            color="bg-transparent"
                            textColor="text-green-300"
                            textSize="text-lg"
                            onClick={() =>
                              dispatch(approveRequest(request._id))
                            }
                          />
                          <Button
                            icon={<BsFillHandThumbsDownFill />}
                            color="bg-transparent"
                            textColor="text-red-400"
                            textSize="text-lg"
                            onClick={() => dispatch(rejectRequest(request._id))}
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

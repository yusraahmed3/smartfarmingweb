import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Button } from "./Button";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../actions/request";
import { AiFillDelete } from "react-icons/ai";
import { deleteRequest } from "../actions/request";
import { Loadingpage } from "./Loadingpage";
import ScreenTitles from "./ScreenTitles";
function ReviewedRequests() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prevPath = location.pathname;

  const { loading, requests } = useSelector((state) => state.requestReducer);

  const { success } = useSelector((state) => state.deleteRequest);

  const deleteR = (id) => {
    dispatch(deleteRequest(id));
  };

  //fetch all requests
  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch, success]);

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
          <div className="rounded-lg h-3/4 md:w-3/4 m-auto overflow-y-scroll  shadow-md">
            <table className="w-full  h-full">
              <thead className="text-left text-textColor text-base bg-buttonColor uppercase tracking-wider sticky top-0">
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
                {requests?.reverse().map((request, i) => {
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
                        <td className="px-6 py-3  text-right flex whitespace-nowrap">
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

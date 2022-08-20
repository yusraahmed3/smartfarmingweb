import React from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { Button } from "./Button";
import { approveRequest, rejectRequest } from "../actions/request";
import { useDispatch } from "react-redux";
import ScreenTitles from "./ScreenTitles";

function RequestDetail() {
  const location = useLocation();
  const dispatch = useDispatch();
  // get data and pathname from prev location
  const { request, prevPath } = location.state;

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="p-2 flex-1 h-screen overflow-y-auto">
        <ScreenTitles title="Details" />
        <div className=" bg-white mt-2 p-5 rounded-md  w-full ">
          <div className="flex flex-col items-start gap-y-6 w-full md:w-1/2 mx-auto">
            <img
              src={request.photo}
              alt="profile"
              className="w-32 h-32 object-cover rounded-full self-center"
            />
            <h1 className="font-bold text-lg self-center">
              {request.firstName + " " + request.lastName}
            </h1>
            <div className="flex flex-col items-start gap-y-4">
              <div className="flex">
                <b>Email:&nbsp;&nbsp; </b>
                <p>{request.email}</p>
              </div>
              <div className="flex">
                <b>Company: &nbsp;&nbsp;</b>
                <p>{request.company}</p>
              </div>
              <div className="flex">
                <b>Phone number:&nbsp;</b>
                <p>{request.phoneno}</p>
              </div>
              <div className="flex">
                <b>Message:&nbsp;&nbsp;</b>
                <p>{request.message}</p>
              </div>
            </div>
            <div className="self-end">
              {
                {
                  "/active": (
                    <div className="flex gap-x-5 ">
                      <Button
                        text="Approve"
                        size="w-28"
                        textColor="text-white"
                        color="bg-green-600"
                        onClick={() => dispatch(approveRequest(request._id))}
                      />
                      <Button
                        text="Reject"
                        size="w-28"
                        textColor="text-white"
                        color="bg-red-600"
                        onClick={() => dispatch(rejectRequest(request._id))}
                      />
                    </div>
                  ),
                  "/reviewed": (
                    <div>
                      {request.status === "approved" && (
                        <Button
                          onClick={() => dispatch(rejectRequest(request._id))}
                          text="Revoke Access"
                          textColor="text-white"
                          size="w-32"
                          color="bg-red-600"
                        />
                      )}
                    </div>
                  ),
                }[prevPath]
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetail;

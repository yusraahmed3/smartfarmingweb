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
      <div className="p-2 flex-1  h-screen overflow-hidden">
        <ScreenTitles title="Pending Requests" />
        {loading && <Loadingpage />}
        <div className="bg-white rounded-md w-full p-5 mt-2 h-full">
          <div className="rounded-lg h-3/4 md:w-3/4 m-auto overflow-y-scroll shadow-md">
            <table className="w-full ">
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

// <tr className="border-b">
//                 <td className="px-6 py-4">John Doe</td>
//                 <td className="px-6 py-4">Google</td>
//                 <td className="px-6 py-4">pending</td>
//                 <td class="px-6 py-4 text-right flex">
//                   <Button
//                     icon={<BsFillHandThumbsUpFill />}
//                     color="bg-transparent"
//                     textColor="text-green-300"
//                     textSize="text-lg"
//                   />
//                   <Button
//                     icon={<BsFillHandThumbsDownFill />}
//                     color="bg-transparent"
//                     textColor="text-red-400"
//                     textSize="text-lg"
//                   />
//                   <Button
//                     icon={<FiMoreVertical />}
//                     color="bg-transparent"
//                     textColor="text-gray-900"
//                     textSize="text-lg"
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="px-6 py-4"> Alex</td>
//                 <td className="px-6 py-4">Microsoft</td>
//                 <td className="px-6 py-4">pending</td>
//                 <td class="px-6 py-4 text-right flex">
//                   <Button
//                     icon={<BsFillHandThumbsUpFill />}
//                     color="bg-transparent"
//                     textColor="text-green-300"
//                     textSize="text-lg"
//                   />
//                   <Button
//                     icon={<BsFillHandThumbsDownFill />}
//                     color="bg-transparent"
//                     textColor="text-red-400"
//                     textSize="text-lg"
//                   />
//                   <Button
//                     icon={<FiMoreVertical />}
//                     color="bg-transparent"
//                     textColor="text-gray-900"
//                     textSize="text-lg"
//                   />
//                 </td>
//               </tr>

// import React, {  Component } from "react";
// import Sidebar from "./Sidebar";
// import axios from "axios";
// import "./ActiveRequests.css";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import ThumbDownIcon from "@material-ui/icons/ThumbDown";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Requests({
//   request,
//   index,
//   approveRequest,
//   rejectRequest,
//   reqDetails,
// }) {
//   return (<div></div>)}
// //     <tr className="hoverablerow">
// //       <td>
// //         {request.firstname} {request.lastname}
// //       </td>
// //       <td>{request.instname}</td>
// //       <td>{request.status}</td>
// //       <td>
// //         <button id="icon1" onClick={() => approveRequest(request)}>
// //           <ThumbUpIcon />
// //         </button>
// //         <button id="icons2" onClick={() => rejectRequest(request)}>
// //           <ThumbDownIcon />
// //         </button>
// //         <button id="icon3" onClick={() => reqDetails(request)}>
// //           <MoreVertIcon />
// //         </button>
// //       </td>
// //     </tr>
// //   );
// // }

// // class ActiveRequests extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       requests: [],
// //       image: "",
// //       loading: true,
// //     };
// //   }

// //   handleApproveButton = (req) => {
// //     console.log("Inside approve method");
// //     axios
// //       .patch(`http://localhost:4000/requests/status/${req._id}`, {
// //         status: "approved",
// //       })
// //       .then((res) =>
// //         axios({
// //           method: "post",
// //           url: "http://localhost:4000/approved",
// //           data: {
// //             firstname: res.data.firstname,
// //             lastname: res.data.lastname,
// //             phoneno: res.data.phoneno,
// //             instname: res.data.instname,
// //             email: res.data.email,
// //             password: res.data.password,
// //             message: res.data.message,
// //             status: res.data.status,
// //           },
// //         })
// //       )
// //       .then(
// //         (response) => {
// //           toast.configure();
// //           toast.success("Request Approved!", {
// //             position: "top-center",
// //             autoClose: 5000,
// //             pauseOnHover: true,
// //             hideProgressBar: true,
// //           });
// //           console.log("Request approved!");
// //           console.log(response);
// //         },
// //         (error) => {
// //           toast.configure();
// //           toast.error("Request approval failed!", {
// //             position: "top-center",
// //             autoClose: 5000,
// //             pauseOnHover: true,
// //             hideProgressBar: true,
// //           });
// //           console.log(error);
// //         }
// //       )
// //       .then(
// //         axios({
// //           method: "post",
// //           url: "http://localhost:4000/requests/register",
// //           data: {
// //             name: req.firstname + " " + req.lastname,
// //             phoneno: req.phoneno,
// //             email: req.email,
// //             password: req.password,
// //           },
// //         })
// //       ).then(axios({url:"http://localhost:4000/requests/send-approval-mail", method: "post",  data:{
// //         name: req.firstname,
// //         recipient: req.email
// //       }}))
// //       .then(
// //         this.setState(axios.delete(`http://localhost:4000/requests/${req._id}`))
// //       );
// //   };

// //   handleRejectButton = (req) => {
// //     console.log("Inside reject method");
// //     axios
// //       .patch(`http://localhost:4000/requests/status/${req._id}`, {
// //         status: "rejected",
// //       })
// //       .then((res) =>
// //         axios({
// //           method: "post",
// //           url: "http://localhost:4000/rejected",
// //           data: {
// //             firstname: res.data.firstname,
// //             lastname: res.data.lastname,
// //             phoneno: res.data.phoneno,
// //             instname: res.data.instname,
// //             email: res.data.email,
// //             password: res.data.password,
// //             message: res.data.message,
// //             status: res.data.status,
// //           },
// //         })
// //       )
// //       .then(
// //         (response) => {
// //           toast.configure();
// //           toast.success("Request Rejected!", {
// //             position: "top-center",
// //             autoClose: 5000,
// //             pauseOnHover: true,
// //             hideProgressBar: true,
// //           });
// //           console.log("Request rejected!");
// //           console.log(response);
// //         },
// //         (error) => {
// //           toast.configure();
// //           toast.error("Request rejection failed!", {
// //             position: "top-center",
// //             autoClose: 5000,
// //             pauseOnHover: true,
// //             hideProgressBar: true,
// //           });
// //           console.log(error);
// //         }
// //       ).then(axios({url:"http://localhost:4000/requests/send-rejection-mail", method: "post",  data:{
// //         name: req.firstname,
// //         recipient: req.email
// //       }}))
// //       .then(
// //         this.setState(axios.delete(`http://localhost:4000/requests/${req._id}`))
// //       );
// //   };

// //   handleMoreButton = (req) => {
// //     this.props.history.push({
// //       pathname: "/requestpage",
// //       state: { request: req },
// //     });
// //   };

// //   async componentDidMount() {
// //     const url = "http://localhost:4000/requests";
// //     const response = await axios.get(url);
// //     this.setState({
// //       requests: response.data,
// //       loading: false,
// //     });
// //     console.log(response);
// //     axios({
// //       url: "http://localhost:4000/requests/request",
// //       method: "get",
// //       headers: {
// //         "x-access-token": localStorage.getItem("token"),
// //       },
// //     })
// //       .then((res) => {
// //         console.log(res.data.request.idimg);
// //         this.setState({
// //           image: res.data.request.idimg})
// //       })
// //       .catch((err) => console.log(err));
// //   }

// //   render() {
// //     if (this.state.loading || !this.state.requests) {
// //       return (
// //         <>
// //           <Sidebar image={this.state.image}/>
// //           <CircularProgress className="progresscircular" />
// //         </>
// //       );
// //     } else {
// //       return (
// //         <>
// //           <Sidebar>

// //           <div className="position">
// //             <div className="pagetitle">
// //               <h3>Active Requests</h3>
// //             </div>
// //             <div className="scrollablecontent">
// //               <table>
// //                 <tbody>
// //                   <tr>
// //                     <th>Requester Name</th>
// //                     <th>Institution Name</th>
// //                     <th>Status </th>
// //                     <th>Actions</th>
// //                   </tr>
// //                   {this.state.requests.map((req, index) => (
// //                     <Requests
// //                       key={index}
// //                       index={index}
// //                       request={req}
// //                       approveRequest={this.handleApproveButton}
// //                       rejectRequest={this.handleRejectButton}
// //                       reqDetails={this.handleMoreButton}
// //                     />
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //           </Sidebar>
// //         </>

// export default withRouter(ActiveRequests);

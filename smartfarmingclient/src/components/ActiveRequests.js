import React, { Component } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./ActiveRequests.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ActiveRequestPage from "./ActiveRequestPage";
import { Redirect } from "react-router";

function Requests({
  request,
  index,
  approveRequest,
  rejectRequest,
  reqDetails,
}) {
  return (
    <tr className="hoverablerow">
      <td>
        {request.firstname} {request.lastname}
      </td>
      <td>{request.instname}</td>
      <td>{request.status}</td>
      <td>
        <button id="icon1" onClick={() => approveRequest(request)}>
          <ThumbUpIcon />
        </button>
        <button id="icons2" onClick={() => rejectRequest(request)}>
          <ThumbDownIcon />
        </button>
        <button id="icon3" onClick={() => reqDetails(request)}>
          <MoreVertIcon />
        </button>
      </td>
    </tr>
    // <ul className="activelist">
    //   <li className="listitems" key={index}>
    //     <div className="title">
    //       {request.firstname} {request.lastname}
    //     </div>
    //     <div className="title">{request.instname}</div>
    //     <div className="icon1">
    //       <button onClick={() => approveRequest(request)}>
    //         <ThumbUpIcon />
    //       </button>
    //     </div>
    //     <div className="icon2">
    //       <button onClick={() => rejectRequest(request)}>
    //         <ThumbDownIcon />
    //       </button>
    //     </div>
    //   </li>
    // </ul>
  );
}
// function ActiveRequestDetail({ request }) {
//   return (
//     <div>
//       {request.firstname} {request.lastname}
//       {request.instname}
//       {request.phoneno}
//       {request.email}
//       {request.message}
//       {request.idimg}
//     </div>
//   );
// }

class ActiveRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      request: [],
      loading: true,
    };
  }

  handleApproveButton = (req) => {
    console.log("Inside approve method");
    // axios.patch
    // axios({
    //   method: "patch",
    //   url: `http://localhost:4000/requests/status/${req._id}`,
    //   data: {
    //     status: "approved"
    //   }
    // })
    const url = "http://localhost:4000/approved";
    axios({
      method: "post",
      url: url,
      data: {
        firstname: req.firstname,
        lastname: req.lastname,
        phoneno: req.phoneno,
        instname: req.instname,
        email: req.email,
        password: req.password,
        message: req.message,
      },
    })
      .then(
        axios.patch(
          `http://localhost:4000/requests/status/${req._id}`,
          "approved"
        )
      )
      .then(
        (response) => {
          console.log("Request approved!");
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
      .then(
        this.setState(axios.delete(`http://localhost:4000/requests/${req._id}`))
      )
      .then(
        axios({
          method: "post",
          url: "http://localhost:4000/users/register",
          data: {
            name: req.firstname + " " + req.lastname,
            phoneno: req.phoneno,
            email: req.email,
            password: req.password,
            idimg: req.idimg,
          },
        })
      );
  };

  handleRejectButton = (req) => {
    console.log("Inside reject method");
    const url = "http://localhost:4000/rejected";
    axios({
      method: "post",
      url: url,
      data: {
        status: "rejected",
        firstname: req.firstname,
        lastname: req.lastname,
        phoneno: req.phoneno,
        instname: req.instname,
        email: req.email,
        password: req.password,
        message: req.message,
      },
    })
      .then(
        (response) => {
          console.log("Request rejected!");
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
      .then(axios.delete(`http://localhost:4000/requests/${req._id}`));
  };

  handleMoreButton = (req) => {
    <Redirect
      to={{
        pathname: "/requestpage",
        state: { req: req },
      }}
    />;

    //  { console.log("Inside more button")}
    //   <ActiveRequestPage request={req} />;
  };

  async componentDidMount() {
    const url = "http://localhost:4000/requests";
    const response = await axios.get(url);
    this.setState({
      requests: response.data,
      loading: false,
    });
    console.log(response);
  }

  render() {
    if (this.state.loading || !this.state.requests) {
      return (
        <>
          <Sidebar />
          <CircularProgress className="progresscircular" />
        </>
      );
    } else {
      const json = localStorage.getItem("admin");
      const userID = JSON.parse(json);
      return (
        <>
          <Sidebar image={userID.idimg} />

          <div className="position">
            <div className="pagetitle">
              <h3>Active Requests</h3>
            </div>
            <div className="scrollablecontent">
              <table>
                <tr>
                  <th>Requester Name</th>
                  <th>Institution Name</th>
                  <th>Status </th>
                  <th>Actions</th>
                </tr>
                {this.state.requests.map((req, index) => (
                  <Requests
                    key={index}
                    index={index}
                    request={req}
                    approveRequest={this.handleApproveButton}
                    rejectRequest={this.handleRejectButton}
                    reqDetails={this.handleMoreButton}
                  />
                ))}
              </table>
            </div>
          </div>
        </>
      );
    }
  }
}

export default ActiveRequests;

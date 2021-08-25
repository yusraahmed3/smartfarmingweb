import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ActiveRequests.css";
import ApprovedRequests from './ApprovedRequests'
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CircularProgress from "@material-ui/core/CircularProgress";

function Requests({ request, index, approveRequest, rejectRequest }) {
  return (
    <ul className="activelist">
      <li className="listitems" key={index} >
        <div className="title">{request.firstname} {request.lastname}</div>
        <div className="title">{request.instname}</div>
         <div className="icon1">
          <button onClick={() => approveRequest(request)}>
            <ThumbUpIcon />
          </button>
        </div>
        <div className="icon2">
          <button onClick={() => rejectRequest(request) } >
            <ThumbDownIcon />
          </button>
        </div> 
      </li>
    </ul>
  );
}

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
    const url = "http://localhost:4000/approved";
    axios({
      method: "post",
      url: url,
      data: {
        status: "approved",
        firstname: req.firstname,
        lastname: req.lastname,
        phoneno: req.phoneno,
        instname: req.instname,
        email: req.email,
        password: req.password,
        message: req.message,
      },
    }).then(
      (response) => {
        console.log("Request approved!");
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    ).then(
      this.setState(axios.delete(`http://localhost:4000/requests/${req._id}`))
      
    ).then(
      axios({
        method: "post",
        url: "http://localhost:4000/user/register",
        data: {
          email: req.email,
          password: req.password
        }

      }));
  };

  // detailPage(){
  //   return(
  //     <ApprovedRequests />
  //     // <div>
      //   <Sidebar />
      //   <ul>
      //     <li>
      //       {req.firstname}
      //     </li>
      //     <li>
      //       {req.lastname}
      //     </li>
      //     <li>
      //       {req.instname}
      //     </li>
      //   </ul>
      // </div>
  //   )
  // }
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
    }).then(
      (response) => {
        console.log("Request rejected!");
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    ).then(
      axios.delete(`http://localhost:4000/requests/${req._id}`)
    );
    
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
      return (
        <>
          <Sidebar />

          <div className="position">
            <div className="pagetitle">
              <h3>Active Requests</h3>
            </div>
            {this.state.requests.map((req, index) => (
              <Requests key={index} index={index} request={req} approveRequest={this.handleApproveButton} rejectRequest={this.handleRejectButton}/>
            ))}
          </div>
        </>
      );
    }
  }
}

export default ActiveRequests;

import React, { Component } from "react";
import Sidebar from "./Sidebar";
import {Link} from 'react-router-dom'
import axios from 'axios';
import "./ActiveRequests.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CircularProgress from "@material-ui/core/CircularProgress";

class ActiveRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      loading: true,
    };
  }

  handleApproveButton = () => {
    const url = 'http://localhost:4000/approved';
    this.state.requests.map((req) => (
    axios({
      method: 'post',
      url: url,
      data: {
        status: 'approved',
        firstname: req.firstname,
        lastname: req.lastname,
        phoneno: req.phoneno,
        instname: req.instname,
        email: req.email,
        password: req.password,
        message: req.message
      }
  })
  .then((response) => {
      alert("Request approved!")
      console.log(response);
    }, (error) => {
      console.log(error);
    })
    ))
  }

  handleRejectButton = () => {
    const url = 'http://localhost:4000/rejected';
    this.state.requests.map((req) => (
    axios({
      method: 'post',
      url: url,
      data: {
        status: 'rejected',
        firstname: req.firstname,
        lastname: req.lastname,
        phoneno: req.phoneno,
        instname: req.instname,
        email: req.email,
        password: req.password,
        message: req.message
      }
  })
  .then((response) => {
      alert("Request rejected!")
      console.log(response);
    }, (error) => {
      console.log(error);
    })
    ))

  }

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
            <div>
              <ul className="activelist">
                {this.state.requests.map((req) => (
                  <li className="listitems" key={req._id}>
                   <div className="title">{req.instname}</div>
                    <div className="icon1">
                    <button onClick={this.handleApproveButton}><ThumbUpIcon /></button>  
                    </div>
                    <div className="icon2">
                     <button onClick={this.handleRejectButton}><ThumbDownIcon /></button> 
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      );
    }
  }
}

export default ActiveRequests;
